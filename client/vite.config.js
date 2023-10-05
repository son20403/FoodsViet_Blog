import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], optimizeDeps: {
    include: ['@ckeditor/ckeditor5-react', '@ckeditor/ckeditor5-build-classic', "ckeditor5-custom-build"]
  }
})
