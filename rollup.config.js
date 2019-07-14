/* eslint-disable import/no-default-export */
// import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const { BUILD_TYPE, BABEL_ENV } = process.env;
const IS_PRODUCTION = BABEL_ENV === 'production';
const IS_ES5 = BUILD_TYPE === 'es5';
const IS_ES2019 = BUILD_TYPE === 'es2019';
const ES5_BUNDLE_PATH = 'dist/es5';

const extensions = ['.js', '.ts'];

export default {
  input: 'src/index.ts',

  output: buildOutput(),

  // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
  // https://rollupjs.org/guide/en#external-e-external
  external: [],

  plugins: buildPlugins(),
};

function buildOutput() {
  const suffix = IS_PRODUCTION ? '.min' : '';

  if (IS_ES5) {
    return [
      /* iife */
      {
        file: `${ES5_BUNDLE_PATH}/index.iife${suffix}.js`,
        format: 'iife',
        name: 'DI',
        sourcemap: true,
      },

      /* esm */
      {
        file: `${ES5_BUNDLE_PATH}/index.esm${suffix}.js`,
        format: 'es',
        sourcemap: true,
      },
    ];
  }

  if (IS_ES2019) {
    return [
      /* esm */
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true,
      },
    ];
  }

  return [
    /* cjs */
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
  ];
}

function buildPlugins() {
  const plugins = [
    // Allows node_modules resolution
    nodeResolve({ extensions }),

    // Allow bundling cjs modules. Rollup doesn't understand cjs
    // commonjs(),

    // Compile TypeScript/JavaScript files
    babel({
      extensions,
      include: ['src/**/*'],
    }),
  ];

  if (IS_ES5) {
    plugins.push(
      terser({
        include: [/^.+\.min\.js$/],
      })
    );
  }

  return plugins;
}
