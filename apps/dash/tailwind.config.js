/** @type {import('tailwindcss').Config} */

import uiConfig from '@hodler/ui/config';

module.exports = {
  ...uiConfig,
  content: [
    ...uiConfig.content, 
    './src/**/*.{js,jsx,ts,tsx}', 
  ],
  theme: {
    ...uiConfig.theme,
    extend: {
      ...uiConfig.theme.extend,
      colors: {
        customColor: "#ff5733",
        ...uiConfig.theme.extend.colors,
      },
    },
  },
  plugins: [
    ...uiConfig.plugins, 
  ],
};
