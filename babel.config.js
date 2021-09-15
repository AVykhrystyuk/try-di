/* eslint-disable no-console */

const { BUILD_TYPE, BABEL_COVERAGE } = process.env;
const { node: NODE_VERSION } = process.versions;

module.exports = api => {
  console.log('babel config options →', { apiEnv: api.env(), BUILD_TYPE, BABEL_COVERAGE, NODE_VERSION });

  return buildConfig({
    isProduction: api.env('production'),
    isTest: api.env('test'),
    buildType: BUILD_TYPE,
    includeCoverage: BABEL_COVERAGE === 'true',
  });
};

function buildConfig(options) {
  return {
    presets: [
      '@babel/preset-typescript',
      buildPresetEnv(options),
    ].filter(Boolean),
    plugins: [
      options.includeCoverage && ['babel-plugin-istanbul'],
    ].filter(Boolean),
  };
}

function buildPresetEnv({ buildType, isProduction, isTest }) {
  const preserveESmodules = false; /* 'false' to preserve ES modules */

  switch (buildType) {
    /* lts nodejs */
    case 'cjs':
      return ['@babel/preset-env', {
        debug: !isProduction,
        loose: true,
        modules: isTest ? 'commonjs' : preserveESmodules,
        targets: {
          node: 'current', // the same as process.versions.node
        },
      }];

    /* legacy browsers */
    case 'es5':
      return ['@babel/preset-env', {
        debug: !isProduction,
        loose: true,
        modules: preserveESmodules,
      }];

    default:
      /* es2019 - modern browsers */
      return undefined;
  }
}
