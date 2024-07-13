const prod = process.env.NODE_ENV === 'production';

const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    main: './src/index.ts',
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
};
