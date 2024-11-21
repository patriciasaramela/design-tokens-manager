import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import useConfigStore from './src/config/stores/useConfigStore';
const baseUrl = useConfigStore.getState().baseUrl;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: baseUrl,
})
