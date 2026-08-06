const { composePlugins, withNx } = require('@nx/webpack');
const { join } = require('path');

module.exports = composePlugins(
  withNx({
    target: 'node',
    compiler: 'tsc',
    main: './src/main.ts',
    tsConfig: './tsconfig.app.json',
    assets: ['./src/assets'],
    optimization: false,
    outputHashing: 'none',
  }),
  (config) => {
    config.output = {
      ...config.output,
      path: join(__dirname, '../../dist/apps/csfin-rest-api'),
    };
    return config;
  }
);
