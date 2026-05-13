# Explore Destinations Page - Features Implementation

## Overview
Comprehensive Explore page with advanced filtering, searching, sorting, and pagination capabilities.

## Components Created

### 1. **Main Page** - `/app/explore/page.tsx`
- **Debounced Search** (500ms delay)
  - Prevents excessive API calls while typing
  - Search term persisted in URL params
  
- **Filters**
  - Country: Multi-country selector
  - Budget: Value/Balanced/Premium options
  - Both filters update URL params instantly
  
- **Sorting**
  - Rating (default)
  - Popularity
  - Instantly sorts results without page reset
  
- **Pagination**
  - Configurable items per page (12 by default)
  - Previous/Next buttons
  - Page number buttons with smart pagination
  - Smooth scroll to top on page change
  - Shows page X of Y indicator
  
- **URL Query Parameters**
  - `?search=paris`
  - `?country=France`
  - `?budget=premium`
  - `?sortBy=popularity`
  - `?page=2`
  - All params shareable and bookmarkable

### 2. **Loading Skeleton** - `components/explore-skeleton.tsx`
- `DestinationSkeletonCard` - Individual card skeleton
- `ExplorePageSkeleton` - Full page skeleton
- Smooth pulsing animation
- Matches destination card layout

### 3. **Empty State** - `components/explore-empty-state.tsx`
- Icon + Message display
- Different messages for:
  - No results when searching
  - Initial state
- Reset filters button
- Styled consistently with app theme

## Features

### ✅ Search & Filters
- [x] Debounced search input
- [x] Country dropdown filter
- [x] Budget level filter
- [x] Sort by Rating or Popularity
- [x] Reset Filters button
- [x] URL query parameter persistence

### ✅ Display & Layout
- [x] Responsive grid (1, 2, 3, 4 columns)
- [x] Results counter with pagination info
- [x] Loading skeletons during fetch
- [x] Empty state with guidance

### ✅ Pagination
- [x] Previous/Next navigation
- [x] Page number buttons
- [x] Smart pagination (shows 5 pages max)
- [x] Current page highlight
- [x] Total pages display
- [x] Smooth scroll on page change

### ✅ API Integration
- [x] Axios client for HTTP requests
- [x] Proper error handling
- [x] Loading states
- [x] Query parameter filtering

## Technical Details

### State Management
```typescript
- search: string (debounced)
- country: string
- budget: string
- sortBy: "rating" | "popularity"
- page: number
- destinations: Destination[]
- loading: boolean
- error: string
- totalCount: number
```

### Constants
- `ITEMS_PER_PAGE = 12`
- `DEBOUNCE_DELAY = 500ms`

### Callbacks
- `updateUrlParams()` - Syncs state with URL
- `fetchDestinations()` - API call handler
- `handleSearchChange()` - Debounced search
- `handleFilterChange()` - Filter updates
- `handlePageChange()` - Pagination
- `handleReset()` - Clear all filters

### API Endpoint
```
GET /api/destinations?search=X&country=Y&budget=Z&sortBy=W&page=N&limit=12
```

Response:
```typescript
{
  destinations: Destination[],
  total: number,
  page: number
}
```

## Usage

### Navigate to Explore
```
http://localhost:3000/explore
```

### With Filters (Shareable URLs)
```
http://localhost:3000/explore?search=paris&country=France&sortBy=rating&page=1
http://localhost:3000/explore?budget=premium&sortBy=popularity
```

### Features in Action
1. Type in search → 500ms debounce → API call
2. Change country filter → API call with all params
3. Sort by popularity → Re-sorts results
4. Click page 2 → Smooth scroll + new results
5. Reset → Clears all filters and URL params

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive on mobile, tablet, desktop
- URL query params work in all browsers

## Accessibility
- Semantic HTML with proper labels
- Keyboard navigation support
- Screen reader friendly
- Loading states announced
