const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require('webpack');
require('dotenv').config(); 
const { ModuleFederationPlugin } = require('webpack').container;


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
        'process.env.REMOTE_USER': JSON.stringify(process.env.REMOTE_USER),
        'process.env.REMOTE_CREW': JSON.stringify(process.env.REMOTE_CREW),
        'process.env.PUBLIC_PATH': JSON.stringify(process.env.PUBLIC_PATH),
        
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new MiniCssExtractPlugin({
        filename: isProduction ? '[name].[contenthash].css' : '[name].css', // Add content hash for cache busting
      }),
     // new MiniCssExtractPlugin(),
      new ModuleFederationPlugin({
        name: 'core',
        filename: 'remoteEntry.js',
        remotes: {
          user: `user@${process.env.REMOTE_USER}`, // Fallback URL
          crew: `crew@${process.env.REMOTE_CREW}`, // Fallback URL
        },
        exposes: {
          './Button': './src/atoms/Button', // Expose the Button component
          './FormField': './src/molecules/FormField', // Expose the FormField component
          './Header': './src/organisms/Header', // Expose the Header component
        },
        shared: {
          react: { singleton: true, eager: true }, // Ensure React is shared as a singleton
          'react-dom': { singleton: true, eager: true }, // Ensure ReactDOM is shared as a singleton
        },
      }),
    ],
    devServer: {
      port: 3000,
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