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
        extensions: ['.js', '.ts', '.json'],
      },
    },
    // Append 'ts' extensions to Airbnb 'import/extensions' setting
    'import/extensions': ['.js', '.ts'],
  },
  extends: [
    'airbnb-base',                                       // 'eslint-config-airbnb-base' package.
    // 'eslint:recommended',                                // 'eslint' package
    'plugin:@typescript-eslint/eslint-recommended',      // '@typescript-eslint/eslint-plugin' package
    'plugin:@typescript-eslint/recommended',             // '@typescript-eslint/eslint-plugin' package
    'plugin:eslint-comments/recommended',                // 'eslint-plugin-eslint-comments' package
    'prettier',                                          // 'eslint-config-prettier' package. Disables rules that conflicts with 'prettier'
    // 'plugin:prettier/recommended',                       // Enables 'eslint-plugin-prettier' and displays prettier errors as ESLint errors. Should be the last configuration in the extends array.
  ],
  rules: {
    // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',

    // Annoying
    'class-methods-use-this': 'off',

    // Don't want to write unreadable code for something that might never happen
    'no-prototype-builtins': 'off',

    // Prevent lines but allow TS overloads
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],

    // Ensure consistent use of file extension within the import path
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      ts: 'never',
    }],

    // Forbid the use of extraneous packages
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    // paths are treated both as absolute paths, and relative to process.cwd()
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: [
        '**/*{.,_}{test,spec}.ts',
        '**/rollup.config.js',
        'babel-register.js'
      ],
      optionalDependencies: false,
    }],

    // Use function and class hoisting to improve code readability
    'no-use-before-define': ['error', 'nofunc'],

    // Allow implicit function return type for lambdas
    // '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],

    // Allow properties in ctors, as it reduces code duplicates
    '@typescript-eslint/no-parameter-properties': ['error', { allows: ['private readonly', 'protected readonly', 'public readonly'] }],

    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
  },
  overrides: [
    {
      // enable the rules specifically for TypeScript files
      files: ["*.ts"],
      rules: {
        'no-use-before-define': 'off',
        // Use function hoisting to improve code readability
        '@typescript-eslint/no-use-before-define': ['error', 'nofunc'],
      }
    }
  ]
};
