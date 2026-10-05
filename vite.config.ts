import { cloudflare } from "@cloudflare/vite-plugin";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import vinext from "vinext";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    vinext(),
    cloudflare({
      viteEnvironment: {
        name: "rsc",
        childEnvironments: ["ssr"],
      },
    }),
  ],
  resolve: {
    alias: {
      sharp: path.resolve(rootDir, "empty-stub.js"),
    },
  },
});
