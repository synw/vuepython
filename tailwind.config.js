module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/forms'),
    require('@snowind/plugin'),
    require('tailwindcss-semantic-colors'),
    require('@tailwindcss/typography')
  ],
  theme: {
    extend: {
      maxWidth: {
        'prose': '100ch',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            'code::before': {
              content: 'normal',
            },
            'code::after': {
              content: 'normal',
            },
          },
        },
      }),
    }
  }
}