# Luxury Backgrounds

This folder contains ultra-premium SVG backgrounds and a lightweight `BackgroundEffects` component for cinematic particle and smoke overlays.

Files added:
- `public/backgrounds/home-hero.svg` - high-contrast black→gold hero background (4K vector SVG)
- `public/backgrounds/product-detail.svg` - product page background
- `public/backgrounds/collections-bg.svg` - collections page background
- `public/backgrounds/auth-bg.svg` - auth/login/register background
- `public/backgrounds/checkout-bg.svg` - checkout page background
- `src/components/BackgroundEffects.jsx` - canvas-based golden particles & smoke overlay

Usage

Page backgrounds (simple CSS):

Add one of the utility classes to your page wrapper, for example in `Home.jsx` or any page:

```jsx
<div className="bg-hero bg-overlay bg-animated">
  <BackgroundEffects type="hero" />
  <main className="container"> ... </main>
</div>
```

- `bg-hero`, `bg-product`, `bg-collections`, `bg-auth`, `bg-checkout` - apply the corresponding SVG background.
- `bg-overlay` - adds a subtle dark overlay for readable text.
- `bg-animated` - slow continuous motion for subtle parallax.
- `BackgroundEffects` - optional canvas overlay that renders slow-moving gold particles and smoky sweep; pass `type` to vary density.

Tips

- SVGs are vector and scale to 4K/8K in browsers; they are lightweight and editable.
- If you need static PNG/JPEG exports for CDN use, you can export SVG to 4K raster images using any vector editor or an automated build script.
- Tweak particle density by changing `type` or editing `BackgroundEffects.jsx`.

Accessibility

- The `BackgroundEffects` canvas is `aria-hidden` and pointer-events are disabled so it won't interfere with interactions.

