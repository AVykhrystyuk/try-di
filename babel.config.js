const { BUILD_TYPE } = process.env;

module.exports = (api) => {
  console.log('api.env()', api.env());
  const isProduction = api.env('production');

  api.cache(true);

  // const test = {
  //   presets: [],
  //   plugins: []
  // };

  const overrides = {
    // env: { test }
  };

  return {
    ...getDefaultConfig(isProduction),
    ...overrides
  };
};

function getDefaultConfig(isProduction) {
  switch (BUILD_TYPE) {
    case 'cjs': /* lts nodejs */
      return {
        presets: [
          '@babel/preset-typescript',
          ['@babel/preset-env', {
            debug: !isProduction,
            // loose: true,
            modules: false,
            targets: {
              node: '8',
            }
          }],
        ],
        plugins: [
          '@babel/plugin-proposal-class-properties',
        ]
      };


    case 'es5': /* legacy browsers */
      return {
        presets: [
          '@babel/preset-typescript',
          ['@babel/preset-env', {
            modules: false,
            debug: !isProduction,
            // loose: true,
          }],
        ],
        plugins: [
          '@babel/plugin-proposal-class-properties'
        ],
      };


    default:
      /* es2019 - modern browsers */
      return {
        presets: [
          '@babel/preset-typescript'
        ],
        plugins: [
          '@babel/plugin-proposal-class-properties',
        ],
      };
  }
}
