const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = function (env) {

  return {
    mode: env.production ? 'production' : 'development',
    devtool: 'inline-source-map',

    entry: {
      template: { import: './src/xayma/template/index.ts' },
      styles: { import: './src/xayma/styles/index.ts' },
      firebase: { import: './src/xayma/firebase/index.ts' },
      svgs: { import: './src/xayma/svgs/index.ts' },
      popup: { import: './src/popup/index.ts' },
      main: { import: './src/main.ts' },
    },

    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      library: 'xayma'
    },

    plugins: [
      new HtmlWebpackPlugin({ title: 'Xayma', }),
      new MiniCssExtractPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),

    ],

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },

        {
          test: /\.s[ac]ss$/i,
          use: [
            "sass-loader",
            "css-loader",
            'raw-loader',
          ]
        },

      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },

    devServer: {
      static: './dist',
    },

    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
      },
    },
  };
};
