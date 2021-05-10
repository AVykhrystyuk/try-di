/* eslint-disable no-console */
const { BUILD_TYPE, BABEL_COVERAGE } = process.env;

module.exports = api => {
  console.log('options ->', { apiEnv: api.env(), BUILD_TYPE, BABEL_COVERAGE });

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
  switch (buildType) {
    /* lts nodejs */
    case 'cjs':
      return ['@babel/preset-env', {
        debug: !isProduction,
        loose: true,
        modules: isTest ? 'commonjs' : false,
        targets: {
          // TODO: is possible to take node version from travis script?
          node: '14',
        },
      }];

    /* legacy browsers */
    case 'es5':
      return ['@babel/preset-env', {
        debug: !isProduction,
        loose: true,
        modules: false,
      }];

    default:
      /* es2019 - modern browsers */
      return undefined;
  }
}
