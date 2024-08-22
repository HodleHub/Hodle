const nodeExternals = require('webpack-node-externals');
const path = require('path');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

const prod = process.env.NODE_ENV === 'production';

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    main: './src/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(j|t)s$/,
        exclude: [/[\\/]node_modules[\\/]/],
        loader: 'builtin:swc-loader',
        options: {
          jsc: {
            parser: {
              syntax: 'typescript',
            },
            externalHelpers: true,
            minify: {
              compress: {
                drop_console: false,
              },
            },
          },
          env: {
            targets: 'Chrome >= 48',
          },
        },
      },
      {
        test: /\.(j|t)sx$/,
        loader: 'builtin:swc-loader',
        exclude: [/[\\/]node_modules[\\/]/],
        options: {
          jsc: {
            parser: {
              syntax: 'typescript',
              tsx: true,
            },
            transform: {
              react: {
                runtime: 'automatic',
                development: !prod,
                refresh: !prod,
              },
            },
            externalHelpers: true,
            minify: {
              compress: {
                drop_console: false,
              },
            },
          },
          env: {
            targets: 'Chrome >= 48',
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [
    new RunScriptWebpackPlugin({
      name: 'main.js',
      autoRestart: false,
    })
  ],
  mode: prod ? 'production' : 'development',
  devtool: prod ? 'source-map' : 'eval-source-map',
};