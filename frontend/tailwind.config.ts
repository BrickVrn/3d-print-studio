import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Light Theme
        background: '#f5f5f4',
        foreground: '#1a1a1a',
        accent: '#0f766e',
        success: '#16a34a',
        error: '#dc2626',
        // Dark Theme
        'background-dark': '#1f2122',
        'foreground-dark': '#f5f5f5',
        'accent-dark': '#2eb8c6',
        'success-dark': '#32b8c6',
        'error-dark': '#ff5459',
      },
    },
  },
  plugins: [],
};

export default config;
