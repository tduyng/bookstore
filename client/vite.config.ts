import eslint from '@rollup/plugin-eslint';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { UserConfig } from 'vite';
import { resolve } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const serverUrl: string =
  (process.env.VITE_SERVER_BASE_URL as string) || 'http://localhost:5025';

console.log('serverUrl: --------------> ', serverUrl);

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
