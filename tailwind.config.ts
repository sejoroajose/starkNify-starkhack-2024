import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Enable dark mode using a class
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      // Add custom styles for dark mode
      colors: {
        'light-background': '#f9fafb', // Light mode background
        'dark-background': '#1a202c', // Dark mode background
        'light-text': '#111827', // Light mode text color
        'dark-text': '#f7fafc', // Dark mode text color
      },
    },
  },
  plugins: [],
}

export default config
