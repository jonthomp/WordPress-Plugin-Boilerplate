"use strict";

var path = require("path");
var webpack = require("webpack");
var autoprefixer = require("autoprefixer");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, "./assets/src"),

  entry: {
    "test-two-admin": "./js/test-two-admin.js",
    "test-two-frontend": "./js/test-two-frontend.js"
  },

  output: {
    path: path.resolve(__dirname, "./assets/build"),
    filename: "js/[name].js",
    library: "test-two"
  },

  plugins: [
    // Specify the resulting CSS filename
    new ExtractTextPlugin("css/[name].css")
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
            options: { presets: ["env", "es2015", "react", "stage-0"] }
          }
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            { loader: "css-loader", options: { url: false } },
            { loader: "postcss-loader" },
            {
              loader: "sass-loader",
              options: {
                outputStyle: "expanded"
              }
            }
          ]
        })
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
              publicPath: url => `../fonts/${url}`
            }
          }
        ]
      }

      // Loaders for other file types can go here
    ]
  },

  stats: {
    // Colored output
    colors: true
  },

  // Create Sourcemaps for the bundle
  devtool: "source-map",

  devServer: {
    contentBase: path.resolve(__dirname, "../../../../"),
    publicPath: "http://localhost:9001/assets/build",
    port: 9001,
    open: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization"
    }
  }
};
