'use strict'

const path = require('path');
const webpack = require('webpack')
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
var LiveReloadPlugin = require('webpack-livereload-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
    publicPath: 'dist/'
  },
  devServer: {
    open: true,
    hot: true,
    overlay: true,
    inline: true,
    contentBase: __dirname,
    watchContentBase: true,
  },
  devtool: isDevelopment && 'source-maps',
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new LiveReloadPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../'
              }
          },
          {
            loader: "css-loader",
            options: {
                sourceMap: isDevelopment,
                minimize: !isDevelopment
            }
          },
          {
            loader: "postcss-loader",
            options: {
                autoprefixer: {
                    browsers: ["last 2 versions"]
                },
                sourceMap: isDevelopment,
                plugins: () => [
                    autoprefixer
                ]
            },
          },
          {
            loader: "sass-loader",
            options: {
                sourceMap: isDevelopment
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
            {
              loader: "file-loader",
              options: {
                  name: '[name].[ext]',
                  outputPath: 'static/',
                  useRelativePath: true,
              }
            },
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                optipng: {
                  enabled: true,
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4
                },
                gifsicle: {
                  interlaced: false,
                },
                webp: {
                  quality: 75
                }
              }
            }
        ]
      }
    ]  
  }
};