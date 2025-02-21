const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const { DefinePlugin } = require('webpack');
require('dotenv').config(); 


module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  return {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.js', // Updated to use JS instead of TSX
    output: {
      publicPath: process.env.PUBLIC_PATH, // Use PUBLIC_PATH from .env
      filename: isProduction ? '[name].[contenthash].js' : '[name].js',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/, // Updated to handle JS/JSX files
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          type: 'asset/resource', // Optimize images
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'], // Updated to handle JS/JSX
    },
    plugins: [
      new DefinePlugin({
        'process.env.REMOTE_CORE': JSON.stringify(process.env.REMOTE_CORE),
        'process.env.PUBLIC_PATH': JSON.stringify(process.env.PUBLIC_PATH),
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new MiniCssExtractPlugin({
              filename: isProduction ? '[name].[contenthash].css' : '[name].css', // Add content hash for cache busting
            }),
      //new MiniCssExtractPlugin(),
      new ModuleFederationPlugin({
        name: 'user', // Name of this micro frontend
        filename: 'remoteEntry.js', // Exposed file for Module Federation
        remotes: {
          core: `core@${process.env.REMOTE_CORE}`,
        },
        exposes: {
          './App': './src/App', // Expose the App component to the host app
        },
        shared: {
          react: { singleton: true, eager: true }, // Ensure React is shared as a singleton
          'react-dom': { singleton: true, eager: true }, // Ensure ReactDOM is shared as a singleton
        },
      }),
    ],
    devServer: {
      port: 3001,
      hot: true,
      historyApiFallback: true,
    },
    optimization: {
      minimize: isProduction, // Minify code in production
      splitChunks: {
        chunks: 'async', // Only split asynchronous chunks
      },
    },
  }
};