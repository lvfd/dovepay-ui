const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')

module.exports = merge(common, {
  name: 'dovepay',
  entry: {
    main: './src/main',
    'system-index': './src/system-index',
  },
  module: {
    rules: [{
      test: /\.((woff)|(woff2)|(eot)|(ttf)|(otf))$/i,
      type: 'asset/resource',
      generator: {
        filename: 'asset/fonts/[name][ext]'
      },
      include: [path.resolve(__dirname, 'node_modules/@lyufudi/uikit-v2/dist')]
    },
    {
      test: /\.(js)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'asset/plugins/[name][ext]'
      },
      include: [
        path.resolve(__dirname, 'node_modules/@lyufudi/uikit/dist'),
        path.resolve(__dirname, 'node_modules/jquery-lts/dist'),
        path.resolve(__dirname, 'node_modules/dom4'),
        path.resolve(__dirname, 'node_modules/showmodaldialog'),
        path.resolve(__dirname, 'node_modules/chart.js/dist')
      ]
    },
    {
      test: /\.(js)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'asset/plugins/compatible/[name][ext]'
      },
      include: [
        path.resolve(__dirname, 'node_modules/@lyufudi/uikit-v2/dist'),
        path.resolve(__dirname, 'node_modules/jquery-v2/dist'),
      ]
    }]
  }
})