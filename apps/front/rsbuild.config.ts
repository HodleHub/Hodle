import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  tools: {
    swc: {
      jsc: {
        experimental: {
          plugins: [['@swc/plugin-relay', {
            rootDir: '.',
            artifactDirectory: "__generated__",
            language: "typescript",
            eagerEsModules: true,
          }]]
        }
      }
    }
  }
});