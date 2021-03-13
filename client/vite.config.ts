import eslint from '@rollup/plugin-eslint';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { UserConfig } from 'vite';
import { resolve } from 'path';

const serverUrl: string =
  (import.meta.env.VITE_SERVER_BASE_URL as string) || 'http://localhost:5025';

const config: UserConfig = {
  plugins: [
    { ...eslint({ include: 'src/**/*.+(js|jsx|ts|tsx)' }), enforce: 'pre' },
    reactRefresh(),
  ],
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: serverUrl,
        changeOrigin: true,
        secure: false,
      },
    },
  },
};

export default config;
