import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { Target } from "lucide-react";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    "/api": {
      Target: "http://localhost:5000",
    },
  },
});