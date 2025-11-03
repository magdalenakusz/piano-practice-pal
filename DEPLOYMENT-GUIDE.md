# 🚀 Piano Practice Pal - Deployment Guide

**Complete guide for deploying Piano Practice Pal PWA to GitHub Pages**

This guide covers the **FREE, tested, production-ready** deployment process for getting Piano Practice Pal on your iPhone as a Progressive Web App (PWA).

---

## ✅ Current Status: DEPLOYED & WORKING

- **Live URL**: https://magdalenakusz.github.io/piano-practice-pal/
- **Deployment Method**: GitHub Pages + PWA
- **Cost**: 100% FREE forever
- **Works**: ✅ Desktop, ✅ iPhone, ✅ Offline

---

## 🎯 Solution: GitHub Pages + PWA (Tested & Working)

### ✅ Why This Works
- ✅ **100% Free** - GitHub Pages is free for public repos
- ✅ **No backend needed** - Your app is static (HTML/CSS/JS)
- ✅ **Works on iPhone** - Install as PWA via Safari
- ✅ **PWA Support** - Offline capability, service worker, manifest
- ✅ **Easy updates** - One command: `npm run deploy`
- ✅ **HTTPS included** - Required for PWA features
- ✅ **Auto-updates** - App updates automatically when you deploy

---

## � Quick Deploy Guide (For Future Releases)

**Use this when deploying updates or new versions:**

### Prerequisites (One-time setup - already done!)
- ✅ Git repository initialized
- ✅ GitHub repository created: `magdalenakusz/piano-practice-pal`
- ✅ PWA configuration in `vite.config.ts`
- ✅ gh-pages package installed
- ✅ Deploy script in `package.json`
- ✅ GitHub Pages enabled (branch: gh-pages)

### Deploy New Version (3 Simple Steps)

```bash
# 1. Make sure all changes are committed
git add .
git commit -m "Description of your changes"
git push origin main

# 2. Deploy to GitHub Pages (builds + publishes)
npm run deploy

# 3. Done! App updates automatically in 1-2 minutes
```

That's it! Your iPhone app will auto-update next time users open it.

---

## 📋 Initial Setup Guide (Reference)

**Note**: This was already completed, but here's how it was set up for reference:

### 1. PWA Configuration

**File**: `vite.config.ts`

```typescript
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico'],
      manifest: {
        name: 'Piano Practice Pal',
        short_name: 'Piano Pal',
        description: 'Master all 48 piano scales with daily practice and spaced repetition',
        theme_color: '#4f46e5',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/piano-practice-pal/',
        start_url: '/piano-practice-pal/',
        icons: [
          {
            src: '/piano-practice-pal/icon-192.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: '/piano-practice-pal/icon-512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'cdn-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              }
            }
          }
        ]
      }
    })
  ],
  base: '/piano-practice-pal/', // Important: matches your repo name
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
  },
});
```

### 2. Dependencies Installed

```bash
npm install --save-dev gh-pages vite-plugin-pwa
```

**File**: `package.json` (scripts section)

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

### 3. PWA Icons Created

**Location**: `public/icon-192.svg` and `public/icon-512.svg`

Simple SVG icons for PWA installation.

### 4. GitHub Pages Enabled

1. Go to: https://github.com/magdalenakusz/piano-practice-pal/settings/pages
2. Under "Source", select:
   - Branch: **gh-pages**
   - Folder: **/ (root)**
3. Click **Save**

---

## 📱 How to Install on iPhone

### First Time Installation

1. **Open Safari** on your iPhone
2. **Navigate to**: https://magdalenakusz.github.io/piano-practice-pal/
3. **Tap the Share button** (square with arrow pointing up)
4. **Scroll down** and tap **"Add to Home Screen"**
5. **Name it**: "Piano Practice" (or whatever you prefer)
6. **Tap "Add"**
7. **Launch** from your home screen!

### PWA Features You'll Get

✅ **Offline Support** - Works without internet after first load  
✅ **Fullscreen Mode** - No Safari UI, like a native app  
✅ **Fast Loading** - Service worker caching  
✅ **Auto-updates** - Gets new versions automatically  
✅ **Home Screen Icon** - Launch like any other app  
✅ **LocalStorage Persists** - Your practice data stays safe

---

## 🔄 Update Workflow (For New Releases)

### Making Changes & Deploying

```bash
# 1. Make your code changes
# Edit files as needed...

# 2. Test locally
npm run dev          # Test in development
npm run build        # Build production version
npm run preview      # Preview production build

# 3. Run tests
npm test             # Make sure all 388 tests pass

# 4. Commit changes
git add .
git commit -m "v2.2.0: Add metronome feature"  # Descriptive message
git push origin main

# 5. Deploy to GitHub Pages
npm run deploy

# 6. Wait 1-2 minutes
# Your iPhone app will auto-update!
```

### Version Bumping

Before deploying a new release:

```json
// package.json
{
  "version": "2.2.0"  // Update version number
}
```

### Update CHANGELOG.md

Document what changed:

```markdown
## Version 2.2.0 - Metronome Feature (2025-11-10)

### Added
- Metronome with adjustable BPM
- Visual metronome indicator
- Save tempo per scale

### Fixed
- Minor UI improvements
```

---

## 🧪 Testing Before Deploy

### Pre-deployment Checklist

- [ ] All tests pass: `npm test`
- [ ] Production build works: `npm run build`
- [ ] Preview looks good: `npm run preview`
- [ ] No TypeScript errors
- [ ] CHANGELOG.md updated
- [ ] Version bumped in package.json
- [ ] Changes committed to git

### Testing Locally

```bash
# 1. Build production version
npm run build

# 2. Preview (simulates GitHub Pages)
npm run preview

# 3. Open in browser
# http://localhost:4173/piano-practice-pal/

# 4. Test PWA features in Chrome
# DevTools → Application → Service Workers
# DevTools → Application → Manifest
```

---

## 🐛 Troubleshooting

### Issue: "gh-pages not found"
**Solution**:
```bash
npm install --save-dev gh-pages
```

### Issue: "404 Not Found" after deployment
**Solutions**:
1. Check GitHub Pages settings (branch: gh-pages)
2. Verify `base: '/piano-practice-pal/'` in vite.config.ts
3. Wait 2-3 minutes for GitHub to deploy

### Issue: Assets not loading (blank page)
**Solution**:
- Make sure `base` path in vite.config.ts matches your repo name
- Clear browser cache and hard refresh (Cmd+Shift+R)

### Issue: Service Worker not updating
**Solution**:
- PWA auto-updates on next app launch
- Or clear browser cache manually
- Or uninstall and reinstall the PWA

### Issue: Changes not showing on iPhone
**Solutions**:
1. Close and reopen the app (service worker updates)
2. Check if deployment finished on GitHub
3. Clear Safari cache
4. Reinstall the PWA (delete icon, add again)

---

## 💡 Best Practices

### Deployment Frequency
- ✅ Deploy fixes immediately
- ✅ Group small features together
- ✅ Test thoroughly before deploying
- ✅ Use semantic versioning (2.1.0 → 2.2.0)

### Git Commit Messages
- `fix: Correct octave handling in B Major`
- `feat: Add metronome feature`
- `docs: Update deployment guide`
- `test: Add tests for arpeggio patterns`

### Branch Strategy (Optional)
```bash
# Create feature branch
git checkout -b feature/metronome

# Make changes and commit
git add .
git commit -m "feat: Add metronome"

# Merge to main
git checkout main
git merge feature/metronome

# Deploy
npm run deploy
```

---

## 📊 What Gets Deployed

When you run `npm run deploy`, these files are published:

```
dist/
├── index.html                 # Main HTML
├── assets/
│   └── index-[hash].js       # Bundled JS (1.36 MB)
├── registerSW.js             # Service worker registration
├── manifest.webmanifest      # PWA manifest
├── sw.js                     # Service worker (offline support)
├── workbox-[hash].js         # Workbox caching library
└── icon-*.svg                # PWA icons
```

**Build Size**: ~1.36 MB (766 KB gzipped)  
**Load Time**: Fast (service worker caching)  
**Offline**: ✅ Works after first load

---

## 🌟 Advanced: Custom Domain (Optional)

If you want a custom domain later:

### 1. Buy Domain
- Namecheap, Google Domains, etc. (~$10/year)
- Example: `pianopractice.app`

### 2. Add CNAME Record
Point to: `magdalenakusz.github.io`

### 3. Add CNAME File
```bash
# Create file: public/CNAME
echo "pianopractice.app" > public/CNAME

# Commit and deploy
git add public/CNAME
git commit -m "Add custom domain"
npm run deploy
```

### 4. Update GitHub Settings
- Repo Settings → Pages
- Custom domain: `pianopractice.app`
- ✅ Enforce HTTPS

---

## 📈 Monitoring & Analytics (Optional)

### Option 1: GitHub Insights
- Free traffic stats
- Repo → Insights → Traffic

### Option 2: Privacy-Respecting Analytics
- Plausible Analytics (paid)
- Simple Analytics (paid)
- Self-hosted: Umami (free)

**Note**: Current app has no tracking - privacy-focused!

---

## 🎯 Quick Reference

### Essential Commands
```bash
npm run dev          # Local development
npm run build        # Build production
npm run preview      # Preview production
npm test             # Run tests
npm run deploy       # Deploy to GitHub Pages
```

### Key URLs
- **Live App**: https://magdalenakusz.github.io/piano-practice-pal/
- **Repository**: https://github.com/magdalenakusz/piano-practice-pal
- **Settings**: https://github.com/magdalenakusz/piano-practice-pal/settings/pages

### Key Files
- `vite.config.ts` - PWA & build configuration
- `package.json` - Dependencies & scripts
- `public/icon-*.svg` - PWA icons
- `dist/` - Built files (auto-generated)

---

## ✅ Current Setup Summary

**What's Configured**:
- ✅ GitHub Pages deployment
- ✅ PWA with service worker
- ✅ Offline support
- ✅ Auto-updates
- ✅ One-command deploy
- ✅ HTTPS enabled
- ✅ Installable on iPhone

**Deployment Process**:
1. Make changes
2. Commit to git
3. Run `npm run deploy`
4. Done! ✨

**Your App**:
- **Version**: 2.1.0
- **Status**: ✅ Live & Working
- **URL**: https://magdalenakusz.github.io/piano-practice-pal/
- **Features**: 48 scales, PWA, offline, tests

---

**Last Updated**: November 3, 2025  
**Version**: 2.1.0  
**Status**: ✅ Deployed & Tested  
**Guide Version**: 2.0
2. Click **Settings** → **Pages**
3. Under **Source**, select branch: `gh-pages`
4. Click **Save**
5. Wait 1-2 minutes for deployment

Your app will be live at: `https://magdalenakusz.github.io/piano-practice-pal/`

#### 7. Add to iPhone Home Screen

On your iPhone:
1. Open Safari
2. Go to `https://magdalenakusz.github.io/piano-practice-pal/`
3. Tap the **Share** button (square with arrow)
4. Scroll down and tap **"Add to Home Screen"**
5. Choose a name (e.g., "Piano Practice")
6. Tap **Add**

Now you have an app icon on your iPhone! 🎉

---

## 🌟 Option 2: Make It a Full PWA (Progressive Web App)

After deploying to GitHub Pages, enhance it to work offline and feel more like a native app.

### Add PWA Support

#### 1. Install Vite PWA Plugin

```bash
npm install --save-dev vite-plugin-pwa
```

#### 2. Update vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Piano Practice Pal',
        short_name: 'Piano Pal',
        description: 'Master all 48 piano scales with daily practice and spaced repetition',
        theme_color: '#4f46e5',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'cdn-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  base: '/piano-practice-pal/',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    include: ['tests/**/*.test.ts'],
  },
})
```

#### 3. Create PWA Icons

You'll need app icons. Use a tool like:
- https://realfavicongenerator.net/ (free)
- Or create simple ones with any image editor

Required sizes:
- `public/pwa-192x192.png` (192x192)
- `public/pwa-512x512.png` (512x512)
- `public/apple-touch-icon.png` (180x180)

#### 4. Rebuild and Deploy

```bash
npm run deploy
```

Now your app will:
- ✅ Work offline
- ✅ Install like a native app
- ✅ Have a splash screen
- ✅ Run in fullscreen on iPhone

---

## 📱 Option 3: Local Network Access (No Internet Needed)

If you want to use it at home without internet:

### Method A: Simple HTTP Server

```bash
# Build the app
npm run build

# Serve locally (install if needed: npm install -g http-server)
cd dist
npx http-server -p 8080
```

Then on your iPhone (connected to same WiFi):
1. Find your computer's local IP: `ifconfig | grep "inet " | grep -v 127.0.0.1`
2. Open Safari on iPhone
3. Go to `http://YOUR_IP:8080`
4. Add to home screen

### Method B: Python Server (Already Installed)

```bash
npm run build
cd dist
python3 -m http.server 8080
```

Same steps as above to access from iPhone.

**Limitation**: Only works when your computer is on and connected to same network.

---

## 🔧 Option 4: Self-Hosted (Advanced)

If you have a spare computer/Raspberry Pi at home:

### Using Nginx on macOS

```bash
# Install nginx
brew install nginx

# Copy built files
npm run build
sudo cp -r dist/* /usr/local/var/www/

# Start nginx
brew services start nginx
```

Access at `http://YOUR_IP` from iPhone.

---

## 🎯 Comparison Table

| Option | Cost | Offline | Easy Updates | Native Feel | Setup Time |
|--------|------|---------|--------------|-------------|------------|
| **GitHub Pages** | Free | No* | Easy (git push) | Good | 10 min |
| **GitHub Pages + PWA** | Free | Yes | Easy (git push) | Excellent | 20 min |
| **Local Server** | Free | Yes | Manual | Basic | 5 min |
| **Self-Hosted** | Free | Yes | Manual | Good | 30 min |

*GitHub Pages with PWA = Works offline after first load

---

## ✅ Recommended Approach

### For Beta Testing (Right Now)

**Option 1: GitHub Pages** (Simplest)
1. Takes 10 minutes to set up
2. Free forever
3. Easy to share with testers
4. Professional URL
5. Easy updates (just `npm run deploy`)

### For Production (After Beta)

**Option 1b: GitHub Pages + PWA** (Best)
1. Everything from Option 1
2. Plus: Works offline
3. Plus: Feels like native app
4. Plus: Faster loading
5. Only 10 more minutes of setup

---

## 🚀 Quick Start Commands

### Deploy to GitHub Pages (Recommended)

```bash
# 1. Update vite.config.ts base path (see step 2 above)

# 2. Install gh-pages
npm install --save-dev gh-pages

# 3. Add deploy script to package.json (see step 3 above)

# 4. Deploy!
npm run deploy

# 5. Enable GitHub Pages in repo settings

# Done! Access at: https://magdalenakusz.github.io/piano-practice-pal/
```

### For Future Updates

```bash
# Make changes to your code
# Then:
git add .
git commit -m "Update: description of changes"
git push origin main
npm run deploy  # This updates the live app
```

---

## 📝 Post-Deployment Checklist

After deploying:
- [ ] App loads on desktop browser
- [ ] App loads on iPhone Safari
- [ ] All scales work correctly
- [ ] Audio plays on iPhone (may need user interaction first)
- [ ] Staff notation renders properly
- [ ] Add to home screen works
- [ ] All navigation works
- [ ] LocalStorage persists data

---

## 🐛 Common Issues & Fixes

### Issue: "Cannot find module" errors
**Fix**: Make sure all imports use relative paths, not absolute

### Issue: Audio doesn't play on iPhone
**Fix**: iOS requires user interaction before playing audio. Add a "Start" button or tap-to-play.

### Issue: White screen after deployment
**Fix**: Check the base path in `vite.config.ts` matches your repo name

### Issue: Assets not loading (404 errors)
**Fix**: Make sure `base: '/piano-practice-pal/'` is set in vite.config.ts

### Issue: App doesn't update after deploy
**Fix**: Clear browser cache or hard refresh (Cmd+Shift+R)

---

## 🎨 Optional: Custom Domain

If you want a custom domain later (free with GitHub Pages):

1. Buy domain (cheap: ~$10/year from Namecheap, Google Domains, etc.)
2. Add CNAME record pointing to `magdalenakusz.github.io`
3. Add `CNAME` file to your `public/` folder with your domain
4. Update GitHub Pages settings to use custom domain

Example: `pianopractice.app` → your GitHub Pages site

---

## 🆓 Why GitHub Pages is Perfect for You

1. **No backend needed** - Your app is 100% client-side
2. **Free forever** - For public repos (your app should be open source anyway!)
3. **Reliable** - GitHub's infrastructure
4. **Easy updates** - Just push code and run `npm run deploy`
5. **HTTPS included** - Required for modern web features
6. **No maintenance** - No servers to manage
7. **Fast globally** - CDN included
8. **Works on iPhone** - Full iOS support

---

## 🎓 Learning Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)
- [iOS Add to Home Screen](https://support.apple.com/guide/iphone/bookmark-favorite-webpages-iph42ab2f3a7/ios)

---

## 💡 Pro Tips

1. **Test locally first**: Run `npm run preview` to test the production build
2. **Use descriptive commits**: Makes it easy to track changes
3. **Keep main branch clean**: Only merge tested, working code
4. **Tag releases**: `git tag v2.1.0` for version tracking
5. **Monitor usage**: Add privacy-respecting analytics if desired (optional)

---

**Next Steps**: Let me know which option you'd like to implement, and I'll help you set it up! 🚀

**My Recommendation**: Start with **GitHub Pages** (10 min setup), test it, then add **PWA support** when ready (10 more min). This gives you the best of both worlds!

---

**Last Updated**: November 3, 2025  
**Version**: 2.1.0  
**Guide Version**: 1.0
