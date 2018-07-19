const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    // what lazy loaded files will be called.
    // Need a variable becuase dynamically created and can use the id that is generated
    // Had to add "syntax-dynamic-import" plugin to .babelrc so webpack can understand import statements
    chunkFilename: '[id].js',
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
      },
      {
        // test for files ending .css
        test: /\.css$/,
        exclude: /node_modules/,
        // loader is short form if want to setup a prepackaged loader, use is to setup custom loader
        // use takes an array of the loaders we want to apply
        use: [
          // extracts css code form css files and injects it at top of html file to reduce amount of files we have to download
          { loader: 'style-loader' },
          // tells webpack what to do with the .css imports
          {
            loader: 'css-loader',
            options: {
              // Tell css loader we will be running 1 loader before this loader (stupidly named postcss-loader)
              importLoaders: 1,
              // Yes we want css modules
              modules: true ,
              // how the css modules should be named.
              // Modules will be named first the name of the class defined in css, double underscore, then the name of the
              // component and then a hash
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          },
          {
            // postcss-loader is a loader that allows us to transform the css
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => {
                autoprefixer({
                  browsers: [
                    "> 1%",
                    "last 2 versions"
                  ]
                })
              }
            }
          }
          // These loaders must be defined in this order because webpack parses loaders and applies them from last to first.
          // So here, webpack will take the postcss-loader to transform css to suit popular browsers,
          // then css loader, which helps it understand the css imports and then applies the style-loader
          // on the extracted css code.
        ]
      },
      {
        // test for images (files ending in .png, .jpeg, .jpg or .gif)
        test: /\.(png|jpe?g|gif)$/,
        // url-loader will take the images and if they are below a certain limit we define, it will convert them
        // into data64 url's which can be inlined in documents so don't need to be downloaded each time.

        // Use query params here to assign a fallback loader if the limit is exceeded. For images that
        // are above the limit file-loader will copy the images to the output folder and then generate a link to
        // these files and put a link to imports in components.
        // images will be copied into dist/images with image name and extension used to name it
        loader: 'url-loader?limit=8000&name=images/[name].[ext]'
      }
    ]
  },
  "plugins": [
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ]
};