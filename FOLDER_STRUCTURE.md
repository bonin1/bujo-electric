# 📁 Starter Template - Folder Structure

> **Clean, organized, and easy to understand**

## 🎯 Quick Overview

```
Starter-Template/
├── 📱 app/                    # Next.js App Router (pages & routing)
├── 🎨 components/             # React components (UI building blocks)
├── 📊 data/                   # JSON data files (content storage)
├── 🔧 lib/                    # Utilities & configurations
├── 🖼️ public/                 # Static assets (images, fonts, etc.)
├── 📝 .cursor/                # Cursor AI rules & templates
├── ⚙️ Config Files            # Project configuration
└── 🔨 Build Scripts           # Automation & generation
```

---

## 📱 **app/** - Next.js App Router

**Purpose**: All pages, layouts, and route handlers

```
app/
├── layout.tsx                 # Root layout (wraps all pages)
├── page.tsx                   # Homepage (/)
├── globals.css                # Global styles
│
├── robots.ts                  # Dynamic robots.txt generator
├── sitemap.ts                 # Dynamic sitemap.xml generator
│
├── [slug]/                    # Dynamic routes
│   ├── page.tsx               # Handles: /services/, /cities/, /blog-categories/
│   └── [blog-slug]/
│       └── page.tsx           # Blog posts: /category/post-title/
│
├── about/                     # Static pages
│   └── page.tsx               # /about/
├── blog/
│   ├── page.tsx               # /blog/ (blog index)
│   └── layout.tsx             # Blog-specific layout
├── contact/
│   └── page.tsx               # /contact/
├── portfolio/
│   └── page.tsx               # /portfolio/
├── service-areas/
│   └── page.tsx               # /service-areas/
└── services/
    └── page.tsx               # /services/ (all services)
```

### 🔑 Key Concepts

- **`[slug]`** = Dynamic route (handles multiple pages with one file)
- **`page.tsx`** = The actual page content
- **`layout.tsx`** = Wrapper that stays consistent across pages
- **Automatic routing**: Folder structure = URL structure

---

## 🎨 **components/** - React Components

**Purpose**: Reusable UI building blocks

```
components/
│
├── global/                    # Site-wide components
│   ├── header/                # Navigation bar
│   ├── footer/                # Site footer
│   ├── cta/                   # Call-to-action sections
│   └── dynamic-header/        # Context-aware headers
│
├── ui/                        # Base UI components (atoms)
│   ├── button.tsx             # Reusable button
│   ├── card.tsx               # Card component
│   ├── image.tsx              # Next.js Image wrapper
│   ├── badge.tsx              # Labels/tags
│   ├── breadcrumbs.tsx        # Navigation breadcrumbs
│   └── ...                    # Other UI primitives
│
├── home/                      # Homepage-specific
│   ├── hero-template.tsx      # Hero section
│   └── ...
│
├── sections/                  # Page sections (molecules)
│   ├── brands-carousel-section.tsx
│   ├── services-section.tsx
│   ├── testimonials-section.tsx
│   └── ...
│
├── blog/                      # Blog components
│   ├── blog-card.tsx
│   ├── blog-post.tsx
│   └── ...
│
├── contact/                   # Contact page components
│   ├── contact-form.tsx
│   └── map-section.tsx
│
├── portfolio/                 # Portfolio components
│   └── project-card.tsx
│
└── things-to-do/              # Location-specific content
    └── ThingsToDoPage.tsx
```

### 🔑 Component Hierarchy

```
Page (app/page.tsx)
  └── Layout (app/layout.tsx)
      ├── Header (components/global/header/)
      ├── Sections (components/sections/)
      │   └── UI Components (components/ui/)
      └── Footer (components/global/footer/)
```

---

## 📊 **data/** - JSON Data Files

**Purpose**: All content data (auto-generated + manual)

```
data/
├── 🤖 AUTO-GENERATED (from business.yaml):
│   ├── services.json          # All services & sub-services
│   ├── cities.json            # All location/city pages
│   ├── faq.json               # Frequently asked questions
│   └── portfolio.json         # Portfolio/project data
│
├── ✋ MANUALLY MAINTAINED:
│   ├── blog-posts.json        # Blog content (customize!)
│   ├── testimonials.json      # Customer reviews
│   ├── things-to-do.json      # Local attractions per city
│   └── service-in-city.json   # Service + city combinations
│
└── dynamic-header-data.json   # Header variations per route
```

### 🔑 Data Flow

```
business.yaml (source of truth)
    ↓
generate_rules.py runs
    ↓
data/*.json files updated
    ↓
Components import data
    ↓
Pages display content
```

---

## 🔧 **lib/** - Utilities & Configuration

**Purpose**: Shared logic, utilities, and configuration

```
lib/
├── 🤖 AUTO-GENERATED:
│   ├── business-config.ts     # Business info (from business.yaml)
│   └── seo-config.ts          # SEO metadata (from business.yaml)
│
├── ✋ MANUALLY MAINTAINED:
│   ├── seo-metadata.ts        # SEO helper functions
│   ├── breadcrumb-utils.ts    # Breadcrumb generation
│   ├── structured-data.ts     # Schema.org JSON-LD
│   └── utils.ts               # General utilities (cn, etc.)
```

### 🔑 What Goes Here?

- **Utilities**: Helper functions used across components
- **Configuration**: Centralized settings
- **Business logic**: Non-UI code
- **Type definitions**: Shared TypeScript interfaces

---

## 🖼️ **public/** - Static Assets

**Purpose**: Files served directly (images, fonts, icons)

```
public/
├── assets/
│   ├── config/                # Configuration assets
│   │   ├── logo.png           # Business logo
│   │   ├── favicon.ico        # Browser tab icon
│   │   └── placeholder-image.webp
│   │
│   └── images/                # Website images
│       ├── brands/            # Brand logos (social, partners)
│       ├── services/          # Service images
│       ├── portfolio/         # Portfolio photos
│       └── blog/              # Blog post images
│
├── manifest.json              # 🤖 PWA manifest (auto-generated)
├── browserconfig.xml          # Windows tile config
├── sitemap.xml                # ⚡ Generated at build time
└── robots.txt                 # ⚡ Generated dynamically (app/robots.ts)
```

### 🔑 Asset Organization

- **config/**: Template/brand assets
- **images/**: Organize by content type
- Use **Next.js Image** component for optimization
- Access via `/assets/images/...` in code

---

## 📝 **.cursor/** - AI Rules & Templates

**Purpose**: Cursor AI automation rules

```
.cursor/
├── rules/                     # 🤖 Generated rules (.mdc)
│   ├── global-seo.mdc         # SEO rules
│   ├── coding-rules.mdc       # General coding standards
│   ├── header-tags.mdc        # HTML heading rules
│   ├── internal-linking.mdc   # Link structure rules
│   └── meta-description.mdc   # Meta description format
│
└── templates/                 # ✋ Rule templates (.template)
    ├── global-seo.mdc.template
    ├── coding-rules.mdc.template
    └── ...
```

### 🔑 How It Works

```
.cursor/templates/*.template   # Edit these
    ↓
business.yaml updated
    ↓
generate_rules.py runs
    ↓
.cursor/rules/*.mdc generated  # Cursor uses these
```

---

## 🔨 **templates/** - Page Templates

**Purpose**: Reusable page layouts

```
templates/
├── cities/
│   └── city-page.tsx          # Template for city pages
└── services/
    └── service-page.tsx       # Template for service pages
```

### 🔑 Templates vs Components

- **Templates**: Full page layouts with data fetching
- **Components**: Smaller, reusable UI pieces

---

## ⚙️ **Configuration Files** (Root)

```
📄 business.yaml               # ✋ SINGLE SOURCE OF TRUTH
📄 generate_rules.py           # 🤖 Generates all config from business.yaml
│
📄 next.config.ts              # Next.js configuration
📄 tailwind.config.ts          # Tailwind CSS configuration
📄 tsconfig.json               # TypeScript configuration
📄 package.json                # Dependencies & scripts
│
📄 .gitignore                  # Git ignore patterns
📄 .eslintrc.json              # Linting rules
📄 postcss.config.mjs          # PostCSS configuration
```

---

## 🔄 **How Everything Connects**

### 1️⃣ **Content Updates**

```
Edit business.yaml
    ↓
Run: python generate_rules.py
    ↓
Updates:
  • lib/business-config.ts
  • lib/seo-config.ts
  • data/services.json
  • data/cities.json
  • data/faq.json
  • data/portfolio.json
  • public/manifest.json
  • .cursor/rules/*.mdc
```

### 2️⃣ **Page Rendering**

```
User visits URL
    ↓
Next.js matches route (app/)
    ↓
Page imports data (data/*.json)
    ↓
Page uses components (components/)
    ↓
Components use utilities (lib/)
    ↓
HTML + SEO metadata generated
```

### 3️⃣ **Development Workflow**

```
1. Edit business.yaml for content/config changes
2. Run python generate_rules.py
3. npm run dev (start dev server)
4. Edit components/pages as needed
5. Test in browser
6. npm run build (production build)
```

---

## 🎯 **Best Practices**

### ✅ DO:

- Keep **business.yaml** as single source of truth
- Use **components/** for reusable UI
- Store content in **data/** JSON files
- Use **Next.js Image** for all images
- Follow existing folder structure

### ❌ DON'T:

- Edit auto-generated files directly
- Put business logic in components
- Hardcode content (use business.yaml)
- Mix static assets in wrong folders

---

## 📚 **Key Files to Know**

| File | Purpose | Edit? |
|------|---------|-------|
| `business.yaml` | All business info | ✅ YES |
| `generate_rules.py` | Auto-generation script | ⚠️ Rarely |
| `lib/business-config.ts` | Business data | 🤖 Auto |
| `lib/seo-config.ts` | SEO settings | 🤖 Auto |
| `data/blog-posts.json` | Blog content | ✅ YES |
| `components/ui/*.tsx` | UI components | ✅ YES |
| `app/layout.tsx` | Root layout | ✅ YES |
| `app/page.tsx` | Homepage | ✅ YES |

---

## 🚀 **Quick Start**

```bash
# 1. Update business info
nano business.yaml

# 2. Generate config files
python generate_rules.py

# 3. Install dependencies
npm install

# 4. Start development
npm run dev

# 5. Open browser
http://localhost:3000
```

---

## 🆘 **Common Questions**

### Q: Where do I add a new service?
**A:** Add to `SERVICES` in `business.yaml`, run `generate_rules.py`

### Q: Where do I add a new page?
**A:** Create folder in `app/` with `page.tsx`

### Q: Where do I add images?
**A:** `public/assets/images/` with appropriate subfolder

### Q: How do I change SEO settings?
**A:** Update `business.yaml`, run `generate_rules.py`

### Q: Where are blog posts?
**A:** Content in `data/blog-posts.json`, page at `app/[slug]/[blog-slug]/page.tsx`

---

## 📖 **Further Reading**

- [SEO_SETUP.md](./SEO_SETUP.md) - Detailed SEO documentation
- [Next.js Docs](https://nextjs.org/docs) - Framework reference
- [Tailwind CSS](https://tailwindcss.com/docs) - Styling guide

---

**🎯 Remember**: `business.yaml` is your single source of truth. Everything else flows from there!

