const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = function (env) {

  return {
    mode: env.production ? 'production' : 'development',
    devtool: 'inline-source-map',

    entry: {
      main: './src/main.ts',
    },

    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      library: "xayma",
      libraryTarget: 'umd',
    },

    plugins: [
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
  };
};
