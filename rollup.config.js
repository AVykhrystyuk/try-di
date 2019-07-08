// import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

// import pkg from './package.json';

const bundlePath = 'dist/bundle';

const extensions = [
  '.js', '.ts',
];

const babelConfig = {
  presets: [
    ['@babel/env', { modules: false }],
    '@babel/typescript'
  ],
  plugins: [
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
  ],
}

export default {
  input: 'src/index.ts',

  output: [
    /* iife */
    {
      file: `${bundlePath}/index.iife.js`, //pkg.main,
      format: 'iife',
      name: 'DI',
      sourcemap: true,
    },

    /* esm */
    {
      file: `${bundlePath}/index.es.js`, //pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],

  // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
  // https://rollupjs.org/guide/en#external-e-external
  external: [],

  plugins: [
    // Allows node_modules resolution
    nodeResolve({ extensions }),

    // Allow bundling cjs modules. Rollup doesn't understand cjs
    // commonjs(),

    // Compile TypeScript/JavaScript files
    babel({
      extensions,
      include: ['src/**/*'],
      babelrc: false,
		  ...babelConfig,
    }),
  ],
};
