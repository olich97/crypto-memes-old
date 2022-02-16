const { spacing } = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        128: '32rem',
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.blue.500'),
              '&:hover': {
                color: theme('colors.blue.700'),
              },
              code: { color: theme('colors.blue.400') },
            },
            'h2,h3,h4': {
              'scroll-margin-top': spacing[32],
            },
            code: { color: theme('colors.pink.500') },
            'blockquote p:first-of-type::before': false,
            'blockquote p:last-of-type::after': false,
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.blue.400'),
              '&:hover': {
                color: theme('colors.blue.600'),
              },
              code: { color: theme('colors.blue.400') },
            },
            blockquote: {
              borderLeftColor: theme('colors.gray.700'),
              color: theme('colors.gray.300'),
            },
            'h2,h3,h4': {
              color: theme('colors.gray.100'),
              'scroll-margin-top': spacing[32],
            },
            hr: { borderColor: theme('colors.gray.700') },
            ol: {
              li: {
                '&:before': { color: theme('colors.gray.500') },
              },
            },
            ul: {
              li: {
                '&:before': { backgroundColor: theme('colors.gray.500') },
              },
            },
            strong: { color: theme('colors.gray.300') },
            thead: {
              color: theme('colors.gray.100'),
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.gray.700'),
              },
            },
          },
        },
      }),
      colors: {
        white: colors.white,
        gray: colors.trueGray,
        indigo: colors.indigo,
        green: colors.green,
        red: colors.red,
        rose: colors.rose,
        purple: colors.purple,
        orange: colors.orange,
        'light-blue': colors.lightBlue,
        fuchsia: colors.fuchsia,
        pink: colors.pink,
        cyan: colors.cyan,

        // NEW UI COLORS
        'CD-blue': '#2357DE',
        'CD-blue-accent': '#4770FF',
        'CD-black-dark': '#1D1D1D',
        'CD-black-dark-accent': '#202020',
        'CD-black-medium-dark': '#242424',
        'CD-black-extra-dark': '#1B1B1B',
        'CD-black-light': '#2E2E2E',
        'CD-gray': '#3E3E3E',
        'CD-gray-accent': '#353535',
        'CD-red-accent': '#FF745F',
        'CD-yellow-accent': '#FFC167',
      },
    },
  },
  variants: {
    typography: ['dark'],
  },
  plugins: [require('@tailwindcss/typography')],
};
