# Dynamic Header Component

A simple, flexible header component where you only pass what you need. Each element is optional and only renders if provided.

## Features

- **Simple Props**: Just pass the props you want, everything else is optional
- **Conditional Rendering**: Elements only appear if you provide data for them
- **Global Design System**: Uses your project's CSS variables and design tokens
- **Responsive Design**: Mobile-first approach with proper breakpoints

## Usage

### 1. Just Title (Minimal)

```tsx
import { DynamicHeader } from '@/components/global/dynamic-header';

export default function Page() {
  return (
    <div>
      <DynamicHeader title="My Page Title" />
      {/* Your page content */}
    </div>
  );
}
```

### 2. Title + Subtitle

```tsx
import { DynamicHeader } from '@/components/global/dynamic-header';

export default function Page() {
  return (
    <div>
      <DynamicHeader 
        title="My Page Title"
        subtitle="This is my subtitle"
      />
      {/* Your page content */}
    </div>
  );
}
```

### 3. Title + CTA

```tsx
import { DynamicHeader } from '@/components/global/dynamic-header';

export default function Page() {
  return (
    <div>
      <DynamicHeader 
        title="Get Started Today"
        cta={{
          primary: {
            text: "Get Free Quote",
            link: "/contact",
            variant: "default"
          }
        }}
      />
      {/* Your page content */}
    </div>
  );
}
```

### 4. Full Featured Header

```tsx
import { DynamicHeader } from '@/components/global/dynamic-header';

export default function Page() {
  return (
    <div>
      <DynamicHeader 
        title="Complete Professional Solutions"
        subtitle="Quality installation and maintenance services"
        description="Transform your property with our expert professional services."
        image="/path/to/hero-image.jpg"
        badges={["Licensed & Insured", "5+ Years Experience", "Free Consultation"]}
        cta={{
          primary: {
            text: "Get Free Quote",
            link: "/contact",
            variant: "default"
          },
          secondary: {
            text: "View Our Work",
            link: "/portfolio",
            variant: "outline"
          }
        }}
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: "Current Page", href: "/current" }
        ]}
      />
      {/* Your page content */}
    </div>
  );
}
```

## Data Structure

### HeaderData Interface

```typescript
interface HeaderData {
  id: string;
  url: string;
  title: string;
  subtitle?: string;           // Optional
  description?: string;        // Optional
  image?: string;             // Optional
  badges?: string[];          // Optional
  cta?: {                     // Optional
    primary?: CTAButton;
    secondary?: CTAButton;
  };
  breadcrumbs?: BreadcrumbItem[]; // Optional
}
```

### CTAButton Interface

```typescript
interface CTAButton {
  text: string;
  link: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}
```

### BreadcrumbItem Interface

```typescript
interface BreadcrumbItem {
  label: string;
  href: string;
}
```

## Utility Functions

The component includes utility functions for generating headers:

- `generateServiceHeader(service)` - For service pages
- `generateCityHeader(city)` - For city pages  
- `generateBlogHeader(post)` - For blog posts
- `generateAboutSubPageHeader(page)` - For about sub-pages
- `generateMinimalHeader(page)` - For simple pages

## Button Integration

The component uses your existing Button component with the following features:

- **asChild prop**: Uses Next.js Link for navigation
- **Custom styling**: Overrides default button styles for the header context
- **Size variants**: Supports `sm`, `default`, `lg`, and `icon` sizes
- **Style variants**: Supports all your button variants (`default`, `outline`, `secondary`, etc.)

### Button Styling

- **Primary buttons**: White background with primary text color
- **Secondary buttons**: Outline style with light text
- **Hover effects**: Scale transform and color transitions
- **Responsive**: Stack vertically on mobile, horizontal on desktop

## Examples

### Minimal Header (Title Only)
```json
{
  "id": "minimal",
  "url": "/minimal",
  "title": "Minimal Page"
}
```

### Full Header with All Elements
```json
{
  "id": "full",
  "url": "/full",
  "title": "Full Featured Page",
  "subtitle": "This page has everything",
  "description": "A comprehensive description of what this page offers.",
  "image": "/path/to/hero-image.jpg",
  "badges": ["Feature 1", "Feature 2", "Feature 3"],
  "cta": {
    "primary": {
      "text": "Get Started",
      "link": "/start",
      "style": "primary"
    },
    "secondary": {
      "text": "Learn More",
      "link": "/learn",
      "style": "outline"
    }
  },
  "breadcrumbs": [
    { "label": "Home", "href": "/" },
    { "label": "Section", "href": "/section" },
    { "label": "Current Page", "href": "/current" }
  ]
}
```

## Integration with Your Page Structure

For your project, you can use this component in:

1. **Static Pages**: Add entries to `dynamic-header-data.json`
2. **Dynamic Pages**: Use the utility functions or pass data props
3. **Service Pages**: Pass `serviceData` prop
4. **City Pages**: Pass `cityData` prop
5. **Blog Posts**: Pass `blogData` prop
6. **About Sub-pages**: Pass `aboutPageData` prop

This gives you maximum flexibility while maintaining consistency across your site.
