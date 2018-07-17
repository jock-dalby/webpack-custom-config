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
  },
  resolve: {
  // tell webpack to be aware of certain extensions, and if it encounters an import without
  // an extensions, it should try the ones listed in extensions and see if it can find a file
  // with that extension.
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        // test if a file webpack has identified meets certain criteria.
        // Here, anything ending in .js then apply a certain loader
        test: /\.js$/,
        // a loader is a 3rd part package which does something to the file
        // babel is the defacto standard for transpiling next gen js to current gen js
        // npm i --save-dev babel-loader babel-core babel-preset-react babel-react-env
        // babel-loader will look for the .babelrc file which we have configured to
        // transpile from react (jsx) and transpile into js that runs in browsers which
        // have greater than 1% market share or last 2 versions.
        loader: 'babel-loader',
        // exclude any files with node_modules in the file path
        exclude: /node_modules/
      }
    ]
  }
};