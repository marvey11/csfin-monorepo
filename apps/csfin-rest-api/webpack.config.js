const { composePlugins, withNx } = require('@nx/webpack');
const { join } = require('path');

module.exports = composePlugins(
  withNx({
    target: 'node',
    compiler: 'tsc',
    main: './apps/csfin-rest-api/src/main.ts',
    tsConfig: './apps/csfin-rest-api/tsconfig.app.json',
    assets: ['./apps/csfin-rest-api/src/assets'],
    optimization: false,
    outputHashing: 'none',
  }),
  (config) => {
    config.output = {
      ...(config.output || {}),
      path: join(__dirname, '../../dist/apps/csfin-rest-api'),
    };
    return config;
  }
);
