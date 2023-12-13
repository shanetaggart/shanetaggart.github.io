const path = require('path');

module.exports = {
  mode: 'none',
  entry: './src/js/main.js',
  output: {
    filename: 'main.min.js',
    path: path.resolve(__dirname, 'public/js/'),
  },
};