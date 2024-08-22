const path = require('path');
const rspack = require('@rspack/core');

const PORT = parseInt(process.env.PORT || '3000', 10);
const cwd = process.cwd();

/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(cwd, 'dist'),
    filename: 'hodler-admin/hodler.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@': path.resolve(cwd, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true,
              },
            },
          },
        },
        type: 'javascript/auto',
      },
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'ecmascript',
                jsx: true,
              },
            },
          },
        },
        type: 'javascript/auto',
      },
    ],
  },
  devServer: {
    port: PORT,
    open: true,
    historyApiFallback: true,
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: path.join(cwd, './src/index.html'),
      publicPath: '/',
      // favicon: path.join(cwd, './src/static/hodler.svg'),
    }),
  ],
  optimization: {
    splitChunks: false,
  },
};
