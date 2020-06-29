const path = require('path');

module.exports = {
  entry: {
    home: path.resolve(__dirname, 'src/js/home.js'),
    precio: path.resolve(__dirname, 'src/js/precio.js'),
    contacto: path.resolve(__dirname, 'src/js/contacto.js')
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}