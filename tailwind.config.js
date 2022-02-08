module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      gray: {
        '100': '#F8F9FA',
        '200': '#E9ECEF',
        '300': '#DEE2E6',
        '400': '#CED4DA',
        '500': '#ADB5BD',
        '600': '#6C757D',
        '700': '#495057', 
        '800': '#343A40', 
        '900': '#212529',
      },
      primary: '#7C99AC', // color light blue tenue
      secondary: '#92A9BD', // color light blue 
      third: '#D3DEDC', // color verde
      blue: '#3A86FF',
      red: '#DA1E37',
      green: '#77D970',
      'red-light': '#FFEFEF',
      'white-light': '#fff',
      'white-opacity': 'rgba(248, 249, 250, .5)',
      transparent: 'rgba(255, 255, 255, 0)'
    },
    fontFamily: {
      'chettan': ["'Baloo Chettan 2'", 'cursive'],
    },
    extend: {
      'backgroundImage': () => ({
        'pattern-body': 'linear-gradient(111.34deg, #7C99AC 0%, #FFEFEF 100%)'
      })
    },
    container: {
      center: true
    }
  },
  plugins: [],
}
