/* eslint-disable no-console */
const { BUILD_TYPE } = process.env;

module.exports = api => {
  console.log('process.env.BUILD_TYPE ->', BUILD_TYPE);
  console.log('api.env() ->', api.env());
  const isProduction = api.env('production');
  const isTest = api.env('test');

  api.cache(true);

  return buildConfig({ isProduction, isTest, buildType: BUILD_TYPE });
};

function buildConfig(options) {
  return {
    presets: [
      '@babel/preset-typescript',
      buildPresetEnv(options),
    ].filter(Boolean),
    plugins: [
      ['@babel/plugin-proposal-class-properties', { loose: true }],
    ],
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
