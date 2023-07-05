import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config();

const target = process.env.REACT_APP_API_URL;

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: target,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api/users.php"),
      },
    },
  },
  plugins: [react()],
});
