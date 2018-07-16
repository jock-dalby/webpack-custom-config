const path = require('path');

module.exports = {
  // what kind of source maps (if any) webpack should generate
  // cheap-module-eval-source-map is best kind of source maps
  // can generate for development. Very detailed, good performance.
  // Makes it easy to debug code in the browser.
  devtool: 'cheap-module-eval-source-map',
  entry: './src/index.js',
  output: {
    // what the file should be called
    filename: 'bundle.js',
    // where bundle.js should be output
    // path.resolve allows us to generate an absolute path
    // __dirname is a node prop and refers to directory the file is run in
    // second arguement is the folder where we want to create the path to
    // path.resolve will then take current dir, add /dist and output an absolute path
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  }
};