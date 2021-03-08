import eslint from '@rollup/plugin-eslint';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { UserConfig } from 'vite';
import { resolve } from 'path';

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
        target: 'http://localhost:5025',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
};

export default config;
