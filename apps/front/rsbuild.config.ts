import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  tools: {
    swc: {
      jsc: {
        experimental: {
          plugins: [['@swc/plugin-relay', {
            rootDir: '_dirname',
            artifactDirectory: "src/__generated__",
            language: "typescript",
            eagerEsModules: true,
          }]]
        }
      }
    }
  }
});