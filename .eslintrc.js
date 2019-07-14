module.exports = {
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  // parserOptions: {
  //   project: "./tsconfig.json",                      // To use rules which require type information
  // },
  plugins: ['@typescript-eslint'],
  settings: {
    // Append 'ts' extensions to Airbnb 'import/resolver' setting
    'import/resolver': {
      node: {
        extensions: ['.mjs', '.js', '.ts', '.json'],
      },
    },
    // Append 'ts' extensions to Airbnb 'import/extensions' setting
    'import/extensions': ['.js', '.ts', '.mjs'],
  },
  extends: [
    'airbnb-base',                                       // 'eslint-config-airbnb-base' package.
    // "eslint:recommended",                             // 'eslint' package
    // "plugin:@typescript-eslint/eslint-recommended",   // '@typescript-eslint/eslint-plugin' package
    'plugin:@typescript-eslint/recommended',             // '@typescript-eslint/eslint-plugin' package
    'plugin:eslint-comments/recommended',                // 'eslint-plugin-eslint-comments' package
    'prettier',                                          // 'eslint-config-prettier' package. Disables rules that conflicts with 'prettier'
    'prettier/@typescript-eslint',                       // 'eslint-config-prettier' package. Disables rules that conflicts with 'prettier'
    //'plugin:prettier/recommended',                     // Enables 'eslint-plugin-prettier' and displays prettier errors as ESLint errors. Should be the last configuration in the extends array.
  ],
  rules: {
    // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',

    // Use function hoisting to improve code readability
    '@typescript-eslint/no-use-before-define': ['error', 'nofunc'],

    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
  },
};
