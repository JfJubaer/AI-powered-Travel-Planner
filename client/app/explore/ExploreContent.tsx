"use client";

import axios from "axios";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DestinationCard } from "@/components/destination-card";
import { ExploreEmptyState } from "@/components/explore-empty-state";
import { DestinationSkeletonCard } from "@/components/explore-skeleton";
import { StatusPill } from "@/components/status-pill";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { getDestinations } from "@/lib/api";
import type { Destination } from "@/lib/types";
import { ChevronLeft, ChevronRight, Loader2, Search } from "lucide-react";

interface ExploreFilters {
  search: string;
  country: string;
  budget: string;
  sortBy: "rating" | "popularity";
  page: number;
}

const ITEMS_PER_PAGE = 12;
const DEBOUNCE_DELAY = 400;
const DEFAULT_SORT: ExploreFilters["sortBy"] = "rating";

export default function ExploreContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isRouting, startTransition] = useTransition();

  const filters = readFilters(searchParams);
  const latestRequest = useRef(0);
  const hasFetchedOnce = useRef(false);

  const [searchInput, setSearchInput] = useState(filters.search);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [availableCountries, setAvailableCountries] = useState<string[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const hasFilters = Boolean(
    filters.search ||
    filters.country ||
    filters.budget ||
    filters.sortBy !== DEFAULT_SORT,
  );

  const replaceUrlWithFilters = useCallback(
    (nextFilters: ExploreFilters) => {
      const params = new URLSearchParams();

      if (nextFilters.search) {
        params.set("search", nextFilters.search);
      }
      if (nextFilters.country) {
        params.set("country", nextFilters.country);
      }
      if (nextFilters.budget) {
        params.set("budget", nextFilters.budget);
      }
      if (nextFilters.sortBy !== DEFAULT_SORT) {
        params.set("sortBy", nextFilters.sortBy);
      }
      if (nextFilters.page > 1) {
        params.set("page", nextFilters.page.toString());
      }

      const nextUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;

      startTransition(() => {
        router.replace(nextUrl, { scroll: false });
      });
    },
    [pathname, router, startTransition],
  );

  const updateUrlParams = useCallback(
    (updates: Partial<ExploreFilters>) => {
      replaceUrlWithFilters({ ...filters, ...updates });
    },
    [filters, replaceUrlWithFilters],
  );

  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

  useEffect(() => {
    if (searchInput === filters.search) {
      return;
    }

    const timer = window.setTimeout(() => {
      replaceUrlWithFilters({
        search: searchInput.trim(),
        country: filters.country,
        budget: filters.budget,
        sortBy: filters.sortBy,
        page: 1,
      });
    }, DEBOUNCE_DELAY);

    return () => window.clearTimeout(timer);
  }, [
    filters.budget,
    filters.country,
    filters.search,
    filters.sortBy,
    replaceUrlWithFilters,
    searchInput,
  ]);

  useEffect(() => {
    const requestId = latestRequest.current + 1;
    latestRequest.current = requestId;
    let isActive = true;

    const run = async () => {
      setError("");
      setLoading(!hasFetchedOnce.current);
      setRefreshing(hasFetchedOnce.current);

      try {
        const data = await getDestinations({
          search: filters.search || undefined,
          country: filters.country || undefined,
          budget: filters.budget || undefined,
          sortBy: filters.sortBy,
          page: filters.page,
          limit: ITEMS_PER_PAGE,
        });

        if (!isActive || requestId !== latestRequest.current) {
          return;
        }

        setDestinations(data.destinations);
        setAvailableCountries(data.availableCountries);
        setTotalCount(data.total);
        setTotalPages(data.totalPages);

        if (data.page !== filters.page) {
          replaceUrlWithFilters({
            search: filters.search,
            country: filters.country,
            budget: filters.budget,
            sortBy: filters.sortBy,
            page: data.page,
          });
        }
      } catch (err) {
        if (
          !isActive ||
          requestId !== latestRequest.current ||
          axios.isCancel(err)
        ) {
          return;
        }

        setError("Failed to load destinations. Please try again.");
        setDestinations([]);
        setTotalCount(0);
        setTotalPages(0);
      } finally {
        if (!isActive || requestId !== latestRequest.current) {
          return;
        }

        hasFetchedOnce.current = true;
        setLoading(false);
        setRefreshing(false);
      }
    };

    run();

    return () => {
      isActive = false;
    };
  }, [
    filters.budget,
    filters.country,
    filters.page,
    filters.search,
    filters.sortBy,
    replaceUrlWithFilters,
  ]);

  const handlePageChange = useCallback(
    (nextPage: number) => {
      if (nextPage < 1 || nextPage > totalPages || nextPage === filters.page) {
        return;
      }

      updateUrlParams({ page: nextPage });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [filters.page, totalPages, updateUrlParams],
  );

  const handleReset = useCallback(() => {
    setSearchInput("");
    updateUrlParams({
      search: "",
      country: "",
      budget: "",
      sortBy: DEFAULT_SORT,
      page: 1,
    });
  }, [updateUrlParams]);

  const visibleCountries =
    filters.country && !availableCountries.includes(filters.country)
      ? [filters.country, ...availableCountries]
      : availableCountries;
  const currentPage = totalPages === 0 ? 1 : Math.min(filters.page, totalPages);
  const showingFrom =
    totalCount === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const showingTo =
    totalCount === 0 ? 0 : Math.min(currentPage * ITEMS_PER_PAGE, totalCount);
  const pageNumbers = getVisiblePages(currentPage, totalPages);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <StatusPill>Explore destination intelligence</StatusPill>
          <h1 className="mt-4 text-3xl font-black tracking-normal sm:text-4xl">
            Find destinations that fit your trip
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Discover curated places filtered by budget, country, and more. Sort
            by rating or popularity to find your next adventure.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {(refreshing || isRouting) && (
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-3 py-1.5 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Updating results
            </div>
          )}
          {error && (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}
        </div>
      </div>

      <Card className="mb-8">
        <CardContent className="space-y-4 p-5">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))_auto] xl:items-end">
            <div className="grid gap-2 xl:col-span-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="search"
                  className="pl-9"
                  placeholder="Search destinations, countries, or travel styles"
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="country">Country</Label>
              <Select
                id="country"
                value={filters.country}
                onChange={(event) =>
                  updateUrlParams({ country: event.target.value, page: 1 })
                }
              >
                <option value="">All countries</option>
                {visibleCountries?.map((country) => (
                  <option
                    key={country}
                    value={country}
                  >
                    {country}
                  </option>
                ))}
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="budget">Budget</Label>
              <Select
                id="budget"
                value={filters.budget}
                onChange={(event) =>
                  updateUrlParams({ budget: event.target.value, page: 1 })
                }
              >
                <option value="">All budgets</option>
                <option value="value">Budget</option>
                <option value="balanced">Moderate</option>
                <option value="premium">Luxury</option>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="sortBy">Sort by</Label>
              <Select
                id="sortBy"
                value={filters.sortBy}
                onChange={(event) =>
                  updateUrlParams({
                    sortBy: event.target.value as ExploreFilters["sortBy"],
                    page: 1,
                  })
                }
              >
                <option value="rating">Rating</option>
                <option value="popularity">Popularity</option>
              </Select>
            </div>

            <Button
              variant="outline"
              className="w-full xl:w-auto"
              onClick={handleReset}
              disabled={!hasFilters}
            >
              Reset filters
            </Button>
          </div>

          <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p aria-live="polite">
              Showing {showingFrom} to {showingTo} of {totalCount} destinations
            </p>
            <p>Search updates after a short pause to keep browsing smooth.</p>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
            <DestinationSkeletonCard key={index} />
          ))}
        </div>
      ) : destinations.length > 0 ? (
        <>
          <div
            className={`grid grid-cols-1 gap-6 transition-opacity sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${
              refreshing ? "opacity-70" : "opacity-100"
            }`}
          >
            {destinations.map((destination) => (
              <DestinationCard
                key={`${destination.name}-${destination.country}`}
                destination={destination}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || refreshing}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {pageNumbers.map((pageNumber) => (
                  <Button
                    key={pageNumber}
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(pageNumber)}
                    disabled={refreshing}
                  >
                    {pageNumber}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || refreshing}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
            </div>
          )}
        </>
      ) : (
        <ExploreEmptyState
          onReset={handleReset}
          isSearching={hasFilters}
        />
      )}
    </main>
  );
}

function readFilters(
  searchParams: ReturnType<typeof useSearchParams>,
): ExploreFilters {
  const pageParam = Number(searchParams.get("page"));

  return {
    search: searchParams.get("search") || "",
    country: searchParams.get("country") || "",
    budget: searchParams.get("budget") || "",
    sortBy:
      searchParams.get("sortBy") === "popularity" ? "popularity" : DEFAULT_SORT,
    page: Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1,
  };
}

function getVisiblePages(currentPage: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const start = Math.min(Math.max(currentPage - 2, 1), totalPages - 4);

  return Array.from({ length: 5 }, (_, index) => start + index);
}
