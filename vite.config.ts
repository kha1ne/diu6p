import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const port = Number.parseInt(env.PORT || '5173', 10);

  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'favicon.svg'],
        manifest: {
          name: 'Dune Imperium: Uprising 6P Table Creator',
          short_name: 'DIU6P',
          description: 'Dune Imperium: Uprising 6P Table Creator',
          start_url: '/',
          scope: '/',
          display: 'standalone',
          background_color: '#ffffff',
          theme_color: '#000000',
          icons: [
            { src: '/favicon-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
            { src: '/favicon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
            { src: '/favicon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,avif,mp3}'],
        },
      }),
    ],
    resolve: {
      alias: {
        '@components': resolve(__dirname, 'src/components'),
        '@context': resolve(__dirname, 'src/context'),
        '@hooks': resolve(__dirname, 'src/hooks'),
        '@layouts': resolve(__dirname, 'src/layouts'),
        '@pages': resolve(__dirname, 'src/pages'),
        '@services': resolve(__dirname, 'src/services'),
        '@styles': resolve(__dirname, 'src/styles'),
        '@types': resolve(__dirname, 'src/types'),
        '@utils': resolve(__dirname, 'src/utils'),
      },
    },
    server: {
      port,
      strictPort: false,
    },
    preview: {
      port: port + 1,
      strictPort: false,
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('@mui') || id.includes('@emotion')) return 'vendor-mui';
            if (id.includes('react-router')) return 'vendor-router';
            if (id.includes('react-dom') || id.includes('react/')) return 'vendor-react';
            if (id.includes('workbox')) return 'vendor-workbox';
            return undefined;
          },
        },
      },
    },
    test: {
      environment: 'jsdom',
      setupFiles: './tests/setupTests.ts',
      globals: true,
      css: true,
      include: ['src/**/*.{test,spec}.{ts,tsx}', 'tests/**/*.{test,spec}.{ts,tsx}', 'src/**/__tests__/**/*.{ts,tsx}'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'lcov', 'html', 'json-summary'],
        include: ['src/**/*.{ts,tsx}'],
        exclude: [
          'src/main.tsx',
          'src/pwa.ts',
          'src/env.d.ts',
          'src/vite-env.d.ts',
          'src/**/*.{test,spec}.{ts,tsx}',
          'tests/**',
          'src/**/*.d.ts',
          'src/types/**',
          'src/**/index.{ts,tsx}',
        ],
      },
    },
  };
});
