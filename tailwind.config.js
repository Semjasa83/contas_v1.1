/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      backgroundImage: {
        'diagonal-stripes': 'repeating-linear-gradient(45deg, #ffffff 0%, #ffffff 8px, #eef2ff 8px, #eef2ff 14px)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}


