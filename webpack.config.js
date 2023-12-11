const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'main.min.js',
    path: path.resolve(__dirname, 'public'),
  },
};