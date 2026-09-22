import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],

    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
        },
      },
    },

    server: {
      host: '0.0.0.0',
      port: 5173,
      allowedHosts: ['2oq0mxnw84.preview.c37.airoapp.ai'],
      // Proxy /api calls to the Express backend in development
      proxy: {
        '/api': {
          target: env.VITE_API_PROXY_TARGET || 'https://amatir-website.onrender.com',
          changeOrigin: true,
          secure: true,
        },
      },
    },

    preview: {
      port: 4173,
      host: true,
      historyApiFallback: true,
    },
  };
});
