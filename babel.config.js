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
  const commonPresets = [
    '@babel/preset-typescript'
  ];

  const commonPlugins = [
    ["@babel/plugin-proposal-class-properties", { "loose": true }]
  ];

  switch (BUILD_TYPE) {
    case 'cjs': /* lts nodejs */
      return {
        presets: [
          ...commonPresets,
          ['@babel/preset-env', {
            debug: !isProduction,
            loose: true,
            modules: false,
            targets: {
              node: '8',
            }
          }],
        ],
        plugins: [
          ...commonPlugins,
        ]
      };


    case 'es5': /* legacy browsers */
      return {
        presets: [
          ...commonPresets,
          ['@babel/preset-env', {
            modules: false,
            debug: !isProduction,
            loose: true,
          }],
        ],
        plugins: [
          ...commonPlugins,
        ],
      };


    default:
      /* es2019 - modern browsers */
      return {
        presets: [
          ...commonPresets,
        ],
        plugins: [
          ...commonPlugins,
        ],
      };
  }
}
