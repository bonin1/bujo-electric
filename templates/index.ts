// Blog Templates
export { default as blogData } from '../data/blog-posts.json';

// City Templates  
export { default as CityPage } from './cities/city-page';

// Service Areas Data - Now centralized through city-utils
// @deprecated: Import from lib/city-utils.ts instead
export { default as serviceAreasData } from '../data/cities.json';

// Re-export city utilities for convenience
export { 
  getAllCities,
  getCityBySlug,
  getTopCities,
  formatCityDisplay,
  getCitiesForNavigation,
  type City
} from '../lib/city-utils';
