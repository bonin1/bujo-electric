# ⚡ Performance Best Practices - Quick Reference

## 🎯 Three Golden Rules

### 1. Target Modern Browsers (ES6+)
```typescript
// next.config.ts
experimental: {
  swcMinify: true,
}
```
**Why?** 95% of users have ES6+ browsers - don't punish them with ES5 code!

---

### 2. Always Add `sizes` to Images with `fill`
```tsx
// ❌ BAD
<Image fill />

// ✅ GOOD
<Image fill sizes="100vw" />
<Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
```

**Common Patterns:**
- Full-width hero: `sizes="100vw"`
- 3-column grid: `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"`
- Avatar: `sizes="48px"`

---

### 3. Lazy Load Below-the-Fold
```tsx
// ✅ Above fold → Static (render immediately)
import Hero from "@/components/Hero";
import Services from "@/components/Services";

// ✅ Below fold → Dynamic import (lazy load)
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <div className="h-96 animate-pulse bg-muted" />
});
```

**Rule of Thumb:**
- Hero: Static ✅
- Services: Static ✅
- Testimonials: Dynamic 🚀
- Portfolio: Dynamic 🚀
- Blog: Dynamic 🚀
- CTA: Dynamic 🚀

---

## 📊 Expected Results

**Before:**
- Initial JS: ~450 KB
- FCP: ~2.1s
- LCP: ~3.8s

**After:**
- Initial JS: ~280 KB (38% ⬇️)
- FCP: ~1.3s (38% faster ⚡)
- LCP: ~2.4s (37% faster ⚡)

---

## ✅ Checklist for New Pages

- [ ] Uses modern browser config
- [ ] All `<Image fill />` have `sizes` attribute
- [ ] Above-fold content is static
- [ ] Below-fold content is lazy loaded
- [ ] Loading states are implemented

---

**Full Documentation:** See `docs/MODERN-BROWSER-OPTIMIZATION.md`



