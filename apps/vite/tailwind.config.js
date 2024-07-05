import config from '@hodler/ui/config';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [config],
  content: ['./src/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}', '../../packages/ui/tailwind.config.js'],
};
