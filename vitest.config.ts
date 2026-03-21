import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/tests/**/*.test.ts", "src/tests/**/*.test.tsx"],
    setupFiles: ["src/tests/setup.ts"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/tests/**",
        "src/types/**",
        "src/**/*.d.ts",
      ],
      reporter: ["text", "lcov", "html"],
      reportsDirectory: "coverage",
      thresholds: {
        lines: 18,
        functions: 14,
        branches: 18,
        statements: 18,
      },
    },
  },
});
