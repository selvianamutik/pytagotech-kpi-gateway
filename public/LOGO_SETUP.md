# Logo Setup Instructions

## Current Status
The original logo has been saved to `public/logo-original.png`.

## Required Actions

### 1. Create PWA Icon Sizes
You need to create the following icon sizes from `public/logo-original.png`:

**Using Online Tool (Recommended):**
1. Go to https://www.favicon-generator.org/ or https://realfavicongenerator.net/
2. Upload `public/logo-original.png`
3. Download the generated files

**Or manually using image editor:**
- `public/logo-192.png` - 192x192 pixels
- `public/logo-512.png` - 512x512 pixels
- `public/favicon.ico` - 32x32 pixels

**Tips:**
- Maintain square aspect ratio (1:1)
- Use transparent background if possible
- Ensure logo is centered and visible at small sizes

### 2. After Creating Icons
Once you have the icon files, place them in the `public/` folder:
```
public/
├── logo-192.png
├── logo-512.png
├── favicon.ico
└── logo-original.png (source)
```

### 3. Verify PWA Manifest
The icons are already configured in `vite.config.js`:
```javascript
icons: [
  {
    src: 'logo-192.png',
    sizes: '192x192',
    type: 'image/png'
  },
  {
    src: 'logo-512.png',
    sizes: '512x512',
    type: 'image/png'
  }
]
```

### 4. Test
After adding the files:
```bash
npm run dev
```

Visit http://localhost:5173 and check:
- Favicon appears in browser tab
- PWA manifest is valid (DevTools → Application → Manifest)
- Install prompt works correctly

## Quick Online Tool Option

**Favicon Generator:**
1. https://favicon.io/favicon-converter/
2. Upload logo-original.png
3. Download zip
4. Extract to `public/` folder

**Or use:**
- https://www.favicon-generator.org/
- https://realfavicongenerator.net/
