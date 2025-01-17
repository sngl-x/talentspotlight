/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#007a78', // Main teal from the logo
        secondary: '#29AFCA', // Complementary color
        accent: '#E3FF00', // Optional highlight color
        background: '#FFFFFF', // Default background color
        dark: '#1A202C', // Dark mode base
        gray: {
          100: '#F7FAFC', // Light gray for backgrounds
          200: '#EDF2F7',
          300: '#E2E8F0',
          400: '#CBD5E0',
          500: '#A0AEC0', // Medium gray for text
        },
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'], // Default font
        quicksand: ['Quicksand', 'sans-serif'], // Optional secondary font
      },
      boxShadow: {
        card: '0 4px 6px rgba(0, 0, 0, 0.1)', // Soft shadow for cards
        header: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for headers
      },
      transitionDuration: {
        150: '150ms', // Transition timing for hover effects
        300: '300ms',
      },
      transitionTimingFunction: {
        easeInOut: 'ease-in-out', // Smooth transition for hover effects
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Adds typography styles
    require('@tailwindcss/forms'), // Enhances form elements
    require('@tailwindcss/aspect-ratio'), // Adds aspect-ratio utilities
  ],
};
