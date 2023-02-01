const env = process.env.NODE_ENV? process.env.NODE_ENV: 'production'
const path = require('path')

module.exports = {
  name: 'dovepay',
  mode: env,
  devtool: env === 'production'? 'source-map': 'inline-source-map',
  entry: {
    main: './src/main',
    'system-index': './src/system-index',
  },
  output: {
    clean: true,
    filename: env === 'production'? '[name].min.js': '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.m?js$/,
      include: path.resolve(__dirname, 'src'),
      exclude: path.resolve(__dirname, 'src/static'),
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
    },
    {
      test: /\.(js)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'asset/plugins/[name].[hash][ext]'
      },
      include: [
        path.resolve(__dirname, 'node_modules/@lyufudi/uikit-v2/dist'),
        path.resolve(__dirname, 'node_modules/@lyufudi/uikit/dist'),
        path.resolve(__dirname, 'node_modules/jquery-v2/dist'),
        path.resolve(__dirname, 'node_modules/jquery-lts/dist'),
        path.resolve(__dirname, 'node_modules/dom4'),
        path.resolve(__dirname, 'node_modules/showmodaldialog'),
        path.resolve(__dirname, 'node_modules/chart.js/dist')
      ]
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'asset/fonts/[name][ext]'
      },
      include: path.resolve(__dirname, 'node_modules/@lyufudi/uikit-v2/dist')
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
      '@src': path.resolve(__dirname, 'src')
    }
  }
}