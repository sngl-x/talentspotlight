/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#007BFF', // Ny primärfärg
        secondary: '#E6F7FF', // Ny sekundärfärg
        accent: '#007BFF', // Valfritt, samma som primär för konsekvens
        background: '#FFFFFF', // Behåll standard bakgrundsfärg
        dark: '#1A202C', // För mörkt tema
        gray: {
          100: '#E6F7FF', // Ljusa gråtoner kan matchas med sekundärfärgen
          200: '#E6F7FF',
          300: '#E6F7FF',
          400: '#E6F7FF',
          500: '#007BFF', // Medium gråtoner kan matchas med primärfärgen
        },
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'], // Ny font
      },
      boxShadow: {
        card: '0 4px 6px rgba(0, 0, 0, 0.1)', // Behåll skuggor som de är
        header: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      transitionDuration: {
        150: '150ms',
        300: '300ms',
      },
      transitionTimingFunction: {
        easeInOut: 'ease-in-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
