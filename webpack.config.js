/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const devMode = process.env.NODE_ENV === 'development';

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };
  if (!devMode) {
    config.minimizer = [new CssMinimizerPlugin(), new TerserPlugin()];
  } else {
    this.devtool = `inline-source-map`;
  }
  return config;
};

const fileName = ext => (devMode ? `[name].${ext}` : `[name].[contenthash].${ext}`);

const cssLoaders = newLoader => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    'css-loader',
  ];
  if (newLoader) loaders.push(newLoader);
  return loaders;
};

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    main: './index.ts',
  },
  output: {
    filename: fileName('js'),
    path: path.resolve(__dirname, './dist'),
    clean: true,
  },
  optimization: optimization(),
  devServer: {
    port: 8080,
    hot: devMode,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: !devMode,
      },
    }),
    new MiniCssExtractPlugin({
      filename: fileName('css'),
    }),
    new CopyPlugin({
      patterns: [{ from: 'assets', to: 'assets' }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg|giv|webp)$/,
        type: 'asset',
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: 'asset',
      },
      {
        test: /\.css$/i,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
