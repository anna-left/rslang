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

const cssLoaders = newLoader => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    { loader: 'css-loader', options: { sourceMap: true, importLoaders: 2 } },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
        postcssOptions: {
          plugins: [['autoprefixer']],
        },
      },
    },
  ];
  if (newLoader) loaders.push({ loader: 'sass-loader', options: { sourceMap: true } });
  return loaders;
};

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    main: './index.ts',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
  },
  optimization: optimization(),
  devtool: devTool(),
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
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
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
        use: cssLoaders(true),
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
