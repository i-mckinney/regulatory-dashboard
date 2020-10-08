const path = require('path');

module.exports = {
  webpack: {
    alias: {},
    plugins: [],
    configure: {
      entry: {
        main: ['@babel/polyfill', path.resolve('.', 'src', 'index.js')]
      },
      resolve: {
        alias: {
          src: path.resolve('.', 'src')
        },
        extensions: ['*', '.js', '.jsx']
      },
      output: {
        path: path.resolve('.', 'build'),
        filename: 'userapp.js',
        publicPath: '/public/',
        library: 'userapp',
        libraryTarget: 'window'
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          }
        ]
      }
    },
    configure: (webpackConfig, { env, paths }) => { return webpackConfig; }
  },
};