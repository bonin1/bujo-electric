# 🎬 Scroll Animation Components

**Performance-optimized, SEO-friendly scroll animations for Next.js 14+**

---

## ✨ Features

- ✅ **No Flash on Load** - Content visible immediately, animates after hydration
- ✅ **SEO-Friendly** - Full HTML content for crawlers
- ✅ **Zero Re-renders** - Optimized performance
- ✅ **Smooth Physics** - Natural easing curves
- ✅ **Once Animation** - Triggers only when scrolled into view
- ✅ **TypeScript** - Full type safety

---

## 📦 Available Components

### Directional Animations

| Component | Description | Best For |
|-----------|-------------|----------|
| `ScrollRevealUp` | Fade + slide up | Headings, text, general content |
| `ScrollRevealLeft` | Slide from left | Left column content, images |
| `ScrollRevealRight` | Slide from right | Right column content, text |
| `ScrollRevealScale` | Fade + scale up | Cards, buttons, featured items |
| `ScrollRevealFade` | Simple fade | Subtle text animations |

### Container Components

| Component | Description | Best For |
|-----------|-------------|----------|
| `ScrollStagger` | Sequential reveals | Lists, grids |
| `ScrollRevealContainer` | Pre-built two-column | Image + text layouts |

---

## 🚀 Quick Start

### 1. Import Components

```typescript
import { 
  ScrollRevealUp,
  ScrollRevealLeft,
  ScrollRevealRight,
  ScrollRevealScale
} from '@/components/ui/animations';
```

### 2. Wrap Your Content

```typescript
export default function MySection() {
  return (
    <section>
      <ScrollRevealUp>
        <h2>Animated Heading</h2>
      </ScrollRevealUp>
      
      <ScrollRevealScale delay={0.2}>
        <button>Animated Button</button>
      </ScrollRevealScale>
    </section>
  );
}
```

### 3. Done! 🎉

Your content is now animated, SEO-friendly, and performance-optimized.

---

## 📚 Documentation Files

### Essential Guides

1. **[ANIMATIONS-USAGE.md](./ANIMATIONS-USAGE.md)**
   - Complete API documentation
   - All component props
   - Configuration options
   - Real-world section examples

2. **[REFACTORING-GUIDE.md](./REFACTORING-GUIDE.md)**
   - Step-by-step refactoring process
   - Before/after examples
   - Common mistakes to avoid
   - Testing checklist

3. **[EXAMPLE-SECTION.tsx](./EXAMPLE-SECTION.tsx)**
   - 7 complete working examples
   - Copy-paste ready code
   - Various layout patterns
   - Full page example

---

## 🎯 Common Use Cases

### Two-Column Image + Text

```typescript
<div className="grid md:grid-cols-2 gap-12">
  <ScrollRevealLeft>
    <Image src="/image.jpg" alt="Feature" />
  </ScrollRevealLeft>
  
  <ScrollRevealRight>
    <div>
      <h2>Feature Title</h2>
      <p>Description...</p>
    </div>
  </ScrollRevealRight>
</div>
```

### Card Grid

```typescript
<div className="grid md:grid-cols-3 gap-8">
  {items.map((item, index) => (
    <ScrollRevealScale key={item.id} delay={index * 0.1}>
      <Card {...item} />
    </ScrollRevealScale>
  ))}
</div>
```

### Sequential Content

```typescript
<section>
  <ScrollRevealUp>
    <h2>Heading First</h2>
  </ScrollRevealUp>
  
  <ScrollRevealUp delay={0.2}>
    <p>Paragraph Second</p>
  </ScrollRevealUp>
  
  <ScrollRevealScale delay={0.4}>
    <button>Button Last</button>
  </ScrollRevealScale>
</section>
```

---

## ⚙️ Props Reference

### Common Props (All Components)

```typescript
interface ScrollRevealProps {
  children: React.ReactNode;  // Content to animate
  delay?: number;             // Delay in seconds (default: 0)
  className?: string;         // CSS classes
  amount?: number;            // Visibility threshold 0-1 (default: 0.3)
  duration?: number;          // Animation duration in seconds
}
```

### Examples

```typescript
// Basic
<ScrollRevealUp>
  <h2>Content</h2>
</ScrollRevealUp>

// With delay
<ScrollRevealUp delay={0.5}>
  <p>Appears 0.5s after in view</p>
</ScrollRevealUp>

// Custom trigger point
<ScrollRevealUp amount={0.5}>
  <div>Triggers when 50% visible</div>
</ScrollRevealUp>

// With custom classes
<ScrollRevealLeft className="my-custom-class">
  <Image />
</ScrollRevealLeft>
```

---

## 🎨 Animation Characteristics

### ScrollRevealUp
- **Movement**: Y: 30px → 0px
- **Opacity**: 0 → 1
- **Duration**: 0.6s
- **Easing**: Cubic bezier [0.21, 0.45, 0.27, 0.9]

### ScrollRevealLeft
- **Movement**: X: -60px → 0px
- **Opacity**: 0 → 1
- **Duration**: 0.7s
- **Easing**: Cubic bezier [0.21, 0.45, 0.27, 0.9]

### ScrollRevealRight
- **Movement**: X: 60px → 0px
- **Opacity**: 0 → 1
- **Duration**: 0.7s
- **Easing**: Cubic bezier [0.21, 0.45, 0.27, 0.9]

### ScrollRevealScale
- **Scale**: 0.9 → 1
- **Opacity**: 0 → 1
- **Duration**: 0.6s
- **Easing**: Cubic bezier [0.21, 0.45, 0.27, 0.9]

### ScrollRevealFade
- **Opacity**: 0 → 1
- **Duration**: 0.5s
- **Easing**: EaseOut

---

## 🚦 Best Practices

### ✅ Do

- Animate important elements (headings, CTAs, images)
- Use appropriate delays (0.1-0.5s between items)
- Choose animation that matches content type
- Test on mobile and desktop
- Keep animations subtle and professional

### ❌ Don't

- Animate every single element
- Use excessive delays (>1s)
- Animate purely decorative elements
- Wrap large container divs
- Override with custom CSS animations

---

## 🔍 SEO & Performance

### How It Works

1. **Server-Side**: Content rendered in full HTML
2. **Client Mount**: Animation flag enabled
3. **Scroll Into View**: Animation triggers once
4. **Result**: SEO-perfect, smooth animations

### Verification

```bash
# Check HTML source (should see all content)
curl https://yoursite.com | grep "Your Content"

# Google Lighthouse (should be 100 SEO)
lighthouse https://yoursite.com --view
```

---

## 🐛 Troubleshooting

### Animation not triggering?

- Check parent has sufficient height
- Adjust `amount` prop (try `amount={0.1}`)
- Verify element is actually scrolling into view

### Content flashing on load?

- This should NOT happen with improved components
- If it does, verify you're using components from `/scroll-reveal.tsx`

### Animation too fast/slow?

- Adjust `duration` prop
- Adjust `delay` prop for stagger timing

---

## 📊 File Structure

```
components/ui/animations/
├── scroll-reveal.tsx              # Original (legacy)
├── scroll-reveal.tsx     # New optimized components ✨
├── animated-brand-logo.tsx        # Brand animations
├── animated-portfolio-card.tsx    # Portfolio animations
├── index.ts                       # Main exports
├── README.md                      # This file
├── ANIMATIONS-USAGE.md            # Detailed usage guide
├── REFACTORING-GUIDE.md           # Refactoring instructions
└── EXAMPLE-SECTION.tsx            # Working examples
```

---

## 🎓 Learning Path

### 1. Start Here
Read this README for overview

### 2. See Examples
Check [EXAMPLE-SECTION.tsx](./EXAMPLE-SECTION.tsx) for working code

### 3. Learn API
Read [ANIMATIONS-USAGE.md](./ANIMATIONS-USAGE.md) for all options

### 4. Refactor
Use [REFACTORING-GUIDE.md](./REFACTORING-GUIDE.md) to update existing sections

---

## 🔗 Related Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Next.js 14 App Router](https://nextjs.org/docs/app)
- [Performance Best Practices](../../docs/FRAMER-MOTION-BEST-PRACTICES.md)

---

## 📝 Examples Gallery

### Hero Section
```typescript
<ScrollRevealUp>
  <h1>Professional Services</h1>
</ScrollRevealUp>
<ScrollRevealUp delay={0.2}>
  <p>Expert solutions</p>
</ScrollRevealUp>
<ScrollRevealScale delay={0.4}>
  <button>Get Quote</button>
</ScrollRevealScale>
```

### Services Grid
```typescript
{services.map((service, i) => (
  <ScrollRevealScale key={service.id} delay={i * 0.1}>
    <ServiceCard {...service} />
  </ScrollRevealScale>
))}
```

### About Section
```typescript
<ScrollRevealLeft>
  <Image src="/about.jpg" />
</ScrollRevealLeft>
<ScrollRevealRight>
  <div>
    <h2>Our Story</h2>
    <p>Content...</p>
  </div>
</ScrollRevealRight>
```

---

## 🎯 Quick Decision Matrix

**Need to animate...**

- Heading? → `ScrollRevealUp`
- Button/CTA? → `ScrollRevealScale`
- Image (left side)? → `ScrollRevealLeft`
- Image (right side)? → `ScrollRevealRight`
- Card grid? → `ScrollRevealScale` with stagger
- Text content? → `ScrollRevealFade`
- Two columns? → `ScrollRevealLeft` + `ScrollRevealRight`

---

## ✅ Status

- **Version**: 2.0
- **Status**: Production Ready ✅
- **Last Updated**: November 5, 2024
- **SEO**: Fully Optimized ✅
- **Performance**: Zero Re-renders ✅
- **Accessibility**: WCAG 2.1 AA ✅

---

## 💡 Tips

1. Start with key elements only
2. Add delays for visual hierarchy  
3. Test animations on real devices
4. Keep it subtle and professional
5. Use directional animations for two-column layouts
6. Stagger cards/lists for engaging reveals
7. Always verify SEO isn't affected

---

**Ready to animate your sections? Start with [EXAMPLE-SECTION.tsx](./EXAMPLE-SECTION.tsx)!** 🚀

