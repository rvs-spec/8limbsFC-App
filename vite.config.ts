import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Served from GitHub Pages at https://<owner>.github.io/8limbsFC-App/.
// Native builds (Capacitor) load from the device filesystem, so they need a
// relative base — set VITE_BASE_PATH=./ when building for Android/iOS.
const base = process.env.VITE_BASE_PATH ?? '/8limbsFC-App/'

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon-16.png', 'favicon-32.png', 'apple-touch-icon.png'],
      manifest: {
        id: base,
        name: '8 Limbs FC',
        short_name: '8 Limbs FC',
        description: 'Run, train and eat — one coach for all of it.',
        start_url: base,
        scope: base,
        display: 'standalone',
        background_color: '#0a0a0a',
        theme_color: '#0a0a0a',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico,webmanifest}'],
      },
    }),
  ],
})
