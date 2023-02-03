const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  name: 'dovepay',
  entry: {
    main: './src/main',
    'system-index': './src/system-index',
  }
})