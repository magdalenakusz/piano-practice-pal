import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    __GIT_COMMIT__: JSON.stringify(process.env.VITE_GIT_COMMIT || 'dev'),
    __GIT_BRANCH__: JSON.stringify(process.env.VITE_GIT_BRANCH || 'local'),
  },
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
          },
          {
            src: '/piano-practice-pal/icon-512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'maskable'
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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: [
        'services/**/*.ts',
        'constants/**/*.ts',
        'hooks/**/*.ts',
        'components/**/*.tsx',
        'App.tsx'
      ],
      exclude: [
        'node_modules/',
        'tests/',
        'dist/',
        '**/*.test.ts',
        '**/*.test.tsx'
      ]
    }
  },
});
