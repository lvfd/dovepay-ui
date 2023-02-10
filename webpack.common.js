const env = process.env.NODE_ENV? process.env.NODE_ENV: 'production'
const path = require('path')

module.exports = {
  mode: env,
  devtool: env === 'production'? 'source-map': 'inline-source-map',
  output: {
    clean: true,
    filename: env === 'production'? '[name].min.js': '[name].js',
    path: path.resolve(process.cwd(), 'dist')
  },
  module: {
    rules: [{
      test: /\.m?js$/,
      include: path.resolve(process.cwd(), 'src'),
      exclude: path.resolve(process.cwd(), 'src/static'),
      use: {
        loader: "babel-loader",
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                "targets": {"ie": "10"},
                "useBuiltIns": "usage",
                "corejs": "3"
              }
            ]
          ]
        }
      }
    }, 
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'asset/images/[name][ext]'
      }
    },
    {
      test: /\.css$/i,
      type: 'asset/resource',
      generator: {
        filename: 'asset/styles/[name][ext]'
      }
    }]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
        },
        libs: {
          name: 'libs',
          filename: env === 'production'? '[name].min.js': '[name].js',
          test: /[\\/]node_modules[\\/]/,
        }
      }
    }
  },
  resolve: {
    alias: {
      '@src': path.resolve(process.cwd(), 'src')
    }
  },
  watch: env === 'development'? true: false,
  watchOptions: {
    aggregateTimeout: 1000,
    ignored: /node_modules/
  }
}