# 🚀 Piano Practice Pal - Deployment Guide for iPhone

This guide explains **FREE** options to get Piano Practice Pal on your iPhone without paid services.

---

## 🎯 Recommended Solution: GitHub Pages + PWA

**Best option for you:** Free, simple, works on iPhone, no cloud services needed!

### ✅ Why This Works
- ✅ **100% Free** - GitHub Pages is free for public repos
- ✅ **No backend needed** - Your app is static (HTML/CSS/JS)
- ✅ **Works on iPhone** - Access via Safari, add to home screen
- ✅ **PWA Ready** - Can be installed like a native app (after we add PWA support)
- ✅ **Easy updates** - Just push to GitHub
- ✅ **HTTPS included** - Required for PWA features

### 📋 Step-by-Step Setup

#### 1. Prepare Your Repository

First, make sure your code is pushed to GitHub:

```bash
cd /Users/kzm2hi/Documents/work/projects/piano-practice-pal/piano-practice-pal

# Initialize git if not already done
git init
git add .
git commit -m "Initial commit - v2.1.0"

# Create GitHub repo (if not exists) and push
# Go to https://github.com/new
# Create repo named: piano-practice-pal
# Then:
git remote add origin https://github.com/magdalenakusz/piano-practice-pal.git
git branch -M main
git push -u origin main
```

#### 2. Configure Vite for GitHub Pages

Update `vite.config.ts` to set the base path:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/piano-practice-pal/', // Add this line - matches your repo name
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    include: ['tests/**/*.test.ts'],
  },
})
```

#### 3. Add Deployment Script to package.json

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
    "deploy": "npm run build && npx gh-pages -d dist"
  }
}
```

#### 4. Install gh-pages

```bash
npm install --save-dev gh-pages
```

#### 5. Deploy to GitHub Pages

```bash
# Build and deploy in one command
npm run deploy
```

This will:
- Build your app
- Create a `gh-pages` branch
- Push the `dist/` folder to that branch
- Make your app available at: `https://magdalenakusz.github.io/piano-practice-pal/`

#### 6. Enable GitHub Pages

1. Go to your GitHub repo
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
