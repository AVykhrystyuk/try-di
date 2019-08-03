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
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      options.includeCoverage ? ['babel-plugin-istanbul'] : null,
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
        modules: isTest ? 'commonjs' : 'false',
        targets: {
          node: '8',
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
      return null;
  }
}
