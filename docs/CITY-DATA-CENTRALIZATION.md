# City Data Centralization Guide

## Overview

This document explains how city/location data is centralized in the codebase to eliminate duplicity and ensure a single source of truth.

## Problem Statement

Previously, city data was duplicated across multiple files:
- `data/cities.json` - Full city data with SEO, descriptions, section content
- `lib/business-config.ts` - `LOCATIONS` array duplicating city/state/url info
- Components importing from different sources

This created:
- ❌ Maintenance overhead (update in multiple places)
- ❌ Potential inconsistencies
- ❌ Code duplicity
- ❌ Harder to add new cities

## Solution

### Single Source of Truth

**`data/cities.json`** is now the **only** place where city data is defined.

### Utility Layer

**`lib/city-utils.ts`** provides convenient helper functions to access city data:

```typescript
import { 
  getAllCities,
  getCityBySlug,
  getTopCities,
  formatCityDisplay,
  getCitiesForNavigation,
  servesCity
} from '@/lib/city-utils';
```

### Updated Components

All components now use the centralized utilities:

1. ✅ **`app/page.tsx`** - Homepage uses `getTopCities()` and `formatCitiesString()`
2. ✅ **`components/global/footer/footer-locations.tsx`** - Footer uses `getCitiesForNavigation()`
3. ✅ **`app/sitemap.ts`** - Sitemap uses `getCityUrls()`
4. ✅ **`components/sections/service-areas-thin-section.tsx`** - Already using cities.json
5. ✅ **`templates/cities/city-page.tsx`** - Already using cities.json

## Usage Examples

### Get All Cities

```typescript
import { getAllCities } from '@/lib/city-utils';

const cities = getAllCities();
// Returns: City[] with full city data
```

### Get Top N Cities

```typescript
import { getTopCities, formatCitiesString } from '@/lib/city-utils';

const topCities = getTopCities(4); // Get first 4 cities
const displayString = formatCitiesString(topCities);
// Returns: "Example City, ST, North Town, ST, South Town, ST, East Village, ST"
```

### Get City By Slug

```typescript
import { getCityBySlug } from '@/lib/city-utils';

const city = getCityBySlug('example-city-st');
if (city) {
  console.log(city.name); // "Example City"
  console.log(city.seo.metaTitle);
  console.log(city.sectionContent.services);
}
```

### Get Cities for Navigation/Footer

```typescript
import { getCitiesForNavigation } from '@/lib/city-utils';

const cities = getCitiesForNavigation(10); // Limit to 10
// Returns: Array<{ name: string, city: string, state: string, href: string }>

cities.map(city => (
  <Link key={city.href} href={city.href}>
    {city.name}
  </Link>
))
```

### Check if City is Served

```typescript
import { servesCity } from '@/lib/city-utils';

const serves = servesCity('Example City', 'ST');
// Returns: true or false
```

### Get City URLs for Sitemap

```typescript
import { getCityUrls } from '@/lib/city-utils';

const cityUrls = getCityUrls('https://example.com');
// Returns: Array of sitemap entries with url, lastModified, changeFrequency, priority
```

## Available Utility Functions

### Core Functions

- `getAllCities()` - Get all cities as array
- `getCityBySlug(slug)` - Find city by slug
- `getCityByNameAndState(name, state)` - Find city by name and state
- `getTopCities(count)` - Get first N cities (default 4)
- `getPrimaryCity()` - Get the first/main city

### Formatting Functions

- `formatCityDisplay(city)` - Format as "City, ST"
- `formatCitiesString(cities)` - Format multiple cities as string

### Navigation/UI Functions

- `getCitiesForNavigation(limit?)` - Get cities formatted for navigation with name, href
- `getCityUrls(baseUrl)` - Get city URLs formatted for sitemap

### Query Functions

- `servesCity(cityName, state?)` - Check if city is served
- `getCitiesByState(state)` - Get all cities in a state
- `searchCities(query)` - Search cities by name (partial match)

### Content Functions

- `getCitySectionContent(city, section)` - Get specific section content
- `hasCitySectionContent(city, section)` - Check if city has custom content

### Utility Functions

- `getAllCitySlugs()` - Get array of all slugs (useful for generateStaticParams)
- `getUniqueStates()` - Get unique states from all cities
- `getCityCount()` - Get total number of cities

## Migration Guide

### Before (❌ Don't do this)

```typescript
// Importing from multiple sources
import { LOCATIONS } from '@/lib/business-config';
import citiesData from '@/data/cities.json';

// Manually mapping data
const cities = LOCATIONS.map(loc => ({
  name: `${loc.city}, ${loc.state}`,
  href: loc.url
}));
```

### After (✅ Do this)

```typescript
// Import from centralized utilities
import { getCitiesForNavigation } from '@/lib/city-utils';

// Use the utility function
const cities = getCitiesForNavigation();
```

## Benefits

✅ **Single Source of Truth** - All city data in `data/cities.json`
✅ **No Duplicity** - City names, states, slugs defined once
✅ **Type Safety** - TypeScript interfaces for all city data
✅ **Easy Maintenance** - Add/update cities in one place
✅ **Consistent Data** - Same data across all components
✅ **Rich City Data** - Access SEO, descriptions, section content from one place
✅ **Reusable Functions** - Common operations as utility functions

## Backward Compatibility

The `LOCATIONS` array in `lib/business-config.ts` still exists for backward compatibility, but it now **imports from cities.json** instead of being hardcoded. 

### Deprecated Functions

These functions still work but are marked as deprecated:

- `getLocationsForNavigation()` - Use `getCitiesForNavigation()` instead
- `servesLocation()` - Use `servesCity()` instead

## Adding New Cities

To add a new city, simply add it to `data/cities.json`:

```json
{
  "id": "new-city-st",
  "name": "New City",
  "state": "ST",
  "slug": "new-city-st",
  "description": "...",
  "seo": {
    "metaTitle": "...",
    "metaDescription": "...",
    "keywords": "..."
  },
  "services": ["Service One", "Service Two"],
  "featuredImage": "/assets/config/placeholder-image.png",
  "sectionContent": {
    "services": { ... },
    "process": { ... },
    "whySetsApart": { ... },
    "cta": { ... }
  }
}
```

That's it! The new city will automatically appear in:
- Navigation
- Footer
- Service areas sections
- Sitemap
- All other components using city utilities

## Best Practices

1. **Always use city utilities** - Never import `cities.json` directly in components
2. **Use TypeScript types** - Import `City` interface from city-utils
3. **Leverage helper functions** - Don't manually map/transform city data
4. **Check for null/undefined** - Use `getCityBySlug()` and handle missing cities
5. **Use appropriate limits** - Use `getTopCities()` or `getCitiesForNavigation(limit)` for UI

## File Structure

```
├── data/
│   └── cities.json              # ✅ Single source of truth for city data
├── lib/
│   ├── city-utils.ts            # ✅ Centralized utility functions
│   └── business-config.ts       # ℹ️ Imports from city-utils (backward compat)
├── components/
│   ├── global/footer/
│   │   └── footer-locations.tsx # ✅ Uses getCitiesForNavigation()
│   └── sections/
│       └── service-areas-thin-section.tsx # ✅ Uses getAllCities()
├── app/
│   ├── page.tsx                 # ✅ Uses getTopCities()
│   └── sitemap.ts               # ✅ Uses getCityUrls()
└── templates/
    └── cities/
        └── city-page.tsx        # ✅ Uses getCityBySlug()
```

## Questions?

If you need a new utility function for city data:
1. Add it to `lib/city-utils.ts`
2. Export it with proper TypeScript types
3. Document it in this guide
4. Use it consistently across components

## Summary

🎯 **Goal**: Single source of truth for city data
📁 **Source**: `data/cities.json`
🔧 **Utilities**: `lib/city-utils.ts`
✅ **Result**: Zero duplicity, consistent data, easy maintenance







