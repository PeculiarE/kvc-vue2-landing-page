module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      spacing: {
        '70': '17rem',
        '99': '34rem',
      },
      textColor: {
        'gray-special': '#828282',
      },
      backgroundColor: {
        'gray-special': '#828282',
      },
      fontFamily: {
        'serif': ['"Playfair Display"'],
        'sans': ['Rubik']
      },
      height: {
        xl: '600px',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
