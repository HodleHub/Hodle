/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@hodler/eslint-config/vite.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
