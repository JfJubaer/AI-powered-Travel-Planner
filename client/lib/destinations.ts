import type { Destination } from "./types";

export function getDestinationSlug(name: string) {
  return name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function getDestinationHref(destination: Pick<Destination, "name">) {
  return `/explore/${getDestinationSlug(destination.name)}`;
}
