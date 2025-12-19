# Section Optimization Pattern Guide

Best practices for creating optimized section components for your Next.js application.

---

## 🎯 Core Principle

**Server Components by Default, Client Components by Exception**

Ask yourself: "Does this component need client-side JavaScript to function?"
- ❌ **NO** → Server Component
- ✅ **YES** → Client Component (with minimal scope)

---

## Pattern 1: Pure Server Component (Best Performance)

### When to Use
- Purely presentational content
- No user interaction beyond links
- No state management needed
- Animation not critical

### Example: Blog Section (✅ OPTIMIZED)

```typescript
// ✅ Server Component - No 'use client'!
import React from 'react';
import Link from 'next/link';
import Image from '@/components/ui/image';
import blogData from '@/data/blog-posts.json';

export default function RecentBlogsSection({ city }: Props) {
  // Data preparation happens on server - FREE!
  const recentPosts = blogData.blogPosts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  return (
    <section>
      {/* All content server-rendered */}
      {recentPosts.map((post) => (
        <Link key={post.id} href={`/${post.slug}/`}>
          <article>
            <Image src={post.image.url} alt={post.title} />
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
          </article>
        </Link>
      ))}
    </section>
  );
}
```

### Benefits
- ✅ Zero client JavaScript for content
- ✅ Faster initial page load
- ✅ Better SEO (content in HTML)
- ✅ Works without JavaScript
- ✅ No hydration cost

---

## Pattern 2: Server Component with CSS Animations (Good Performance)

### When to Use
- Need visual polish (animations)
- Don't want Framer Motion overhead
- Simple scroll-based animations

### Example: Process Steps Section

```typescript
// ✅ Server Component with CSS
import React from 'react';
import './process-steps.css'; // CSS animations

export default function ProcessStepsSection() {
  return (
    <section>
      {steps.map((step, index) => (
        <div 
          key={step.id}
          className="fade-in-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {step.content}
        </div>
      ))}
    </section>
  );
}
```

```css
/* CSS file - NO JavaScript needed! */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}
```

### Benefits
- ✅ Server-rendered content
- ✅ Smooth animations (GPU accelerated)
- ✅ No JavaScript library needed
- ✅ ~50KB smaller bundle

---

## Pattern 3: Server Wrapper with Client Island (Balanced)

### When to Use
- Most content is static
- Small interactive elements
- Complex UI component (carousel, tabs)

### Example: Services Section with Interactive Grid

```typescript
// ✅ Server Component Wrapper
import { BentoGridClient } from './bento-grid-client';

export default function ServicesSection({ city }: Props) {
  // Prepare data on server
  const services = CORE_SERVICES.map(service => ({
    title: service.name,
    url: service.url,
    description: service.description,
  }));

  return (
    <section>
      {/* Server-rendered header */}
      <h2>Our Services{city ? ` in ${city}` : ''}</h2>
      <p>Expert solutions for all your needs</p>
      
      {/* Client island for interactivity */}
      <BentoGridClient services={services} />
    </section>
  );
}
```

```typescript
// components/ui/bento-grid-client.tsx
'use client';

import { useState } from 'react';

export function BentoGridClient({ services }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  return (
    <div className="grid">
      {services.map((service, index) => (
        <div 
          key={service.url}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Interactive card */}
        </div>
      ))}
    </div>
  );
}
```

### Benefits
- ✅ Content in initial HTML
- ✅ SEO optimized
- ✅ Interactive where needed
- ✅ Smaller client bundle

---

## Pattern 4: Full Client Component (When Necessary)

### When to Use
- Complex state management
- Real-time interactions
- Modals, forms, carousels
- **Legitimate client-side needs**

### Example: Portfolio Section with Lightbox

```typescript
'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function PortfolioSection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section>
      {/* Grid with click handlers */}
      {items.map((item, index) => (
        <button onClick={() => setSelectedImage(index)}>
          {/* Clickable card */}
        </button>
      ))}

      {/* Modal with complex interactions */}
      <AnimatePresence>
        {selectedImage !== null && (
          <Modal onClose={() => setSelectedImage(null)}>
            {/* Lightbox content */}
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
}
```

### When It's Justified
- ✅ Has interactive state (useState, useReducer)
- ✅ Event handlers beyond basic links
- ✅ Needs animations for UX (modals, transitions)
- ✅ Form inputs and validation

---

## 🚫 Anti-Patterns to Avoid

### ❌ Pattern A: Client Component for Static Content

```typescript
// ❌ BAD - Unnecessary client component
'use client';
import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2>About Us</h2>
      <p>We are a company...</p>
    </motion.section>
  );
}
```

**Problem:** 50KB of Framer Motion for a fade-in animation
**Fix:** Use server component with CSS animation

---

### ❌ Pattern B: Loading All Data Client-Side

```typescript
// ❌ BAD - Loading full dataset client-side
'use client';
import allData from '@/data/large-file.json';

export default function Section() {
  const filtered = allData.items.slice(0, 3);
  // Only showing 3 items but loaded 1000+!
}
```

**Problem:** Loads entire dataset when only need 3 items
**Fix:** Filter/slice on server, pass only what's needed

---

### ❌ Pattern C: Using Framer Motion Everywhere

```typescript
// ❌ BAD - Every section using motion
'use client';
import { motion } from 'framer-motion';

export default function SimpleSection() {
  return (
    <motion.div initial={{ y: 20 }} animate={{ y: 0 }}>
      <h2>Title</h2>
    </motion.div>
  );
}
```

**Problem:** 50KB library for simple slide-up animation
**Fix:** CSS animation or Intersection Observer

---

## 🎨 Animation Alternatives

### Option 1: CSS Animations (Recommended)

```css
/* Free, fast, GPU-accelerated */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slideUp 0.6s ease-out;
}
```

### Option 2: Intersection Observer (Native API)

```typescript
// components/animated-section.tsx
'use client';

import { useEffect, useRef } from 'react';

export function AnimatedSection({ children }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="opacity-0 translate-y-4 transition-all duration-600">
      {children}
    </div>
  );
}
```

### Option 3: Dynamic Import Framer Motion

```typescript
// Only when animation is critical for UX
import dynamic from 'next/dynamic';

const MotionDiv = dynamic(
  () => import('framer-motion').then(mod => mod.motion.div),
  { ssr: false }
);

// Framer Motion only loaded when component mounts
export function ComplexAnimation() {
  return (
    <MotionDiv animate={{ scale: [1, 1.2, 1] }}>
      {/* Complex animation */}
    </MotionDiv>
  );
}
```

---

## 📊 Decision Tree

```
Need client JavaScript?
├─ NO
│  └─ Need animations?
│     ├─ NO → Pattern 1: Pure Server Component
│     └─ YES → Pattern 2: Server + CSS Animations
│
└─ YES
   └─ All content needs interactivity?
      ├─ NO → Pattern 3: Server Wrapper + Client Island
      └─ YES → Pattern 4: Full Client Component
```

---

## ✅ Checklist for New Sections

Before creating a section component, ask:

1. **Does it need client JavaScript?**
   - [ ] Has useState, useReducer, or other hooks?
   - [ ] Has event handlers (onClick, onChange)?
   - [ ] Fetches data client-side?
   
2. **Can animations be CSS instead?**
   - [ ] Simple fade-in/out?
   - [ ] Slide animations?
   - [ ] Scale/rotate effects?

3. **Can data preparation happen server-side?**
   - [ ] Sorting/filtering data?
   - [ ] Slicing arrays?
   - [ ] Formatting dates/numbers?

4. **Is Framer Motion really needed?**
   - [ ] Complex spring physics?
   - [ ] Sequential animations?
   - [ ] Gesture interactions?

**If you answered NO to most questions above: Use Server Component!**

---

## 🎯 Target Results

### Good Section Characteristics
- ✅ <5KB client JavaScript (or zero)
- ✅ Content visible without JavaScript
- ✅ SEO optimized
- ✅ Fast Time to Interactive

### Bad Section Characteristics
- ❌ >50KB client JavaScript
- ❌ Blank until JavaScript loads
- ❌ Content not crawlable
- ❌ Slow hydration

---

## 📚 References

- [Next.js Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [CSS Animations MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

---

Last Updated: November 3, 2025

