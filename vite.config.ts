import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { copyFileSync, mkdirSync, writeFileSync } from "fs";
import { componentTagger } from "lovable-tagger";

/** Routes that must exist as real files so GitHub Pages returns 200 on reload. */
const SPA_ROUTES = ["crear", "agreement", "success", "terms", "privacy", "tech-guide"];

function githubPagesSpa(): Plugin {
  return {
    name: "github-pages-spa",
    apply: "build",
    closeBundle() {
      const dist = path.resolve(__dirname, "dist");
      const index = path.join(dist, "index.html");
      copyFileSync(index, path.join(dist, "404.html"));
      writeFileSync(path.join(dist, ".nojekyll"), "");
      for (const route of SPA_ROUTES) {
        const dir = path.join(dist, route);
        mkdirSync(dir, { recursive: true });
        copyFileSync(index, path.join(dir, "index.html"));
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/piopacto/",
  server: {
    host: "::",
    port: 8080,
    allowedHosts: true,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), githubPagesSpa(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
