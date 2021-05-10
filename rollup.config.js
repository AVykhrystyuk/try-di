/* eslint-disable import/no-default-export */

// import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';

import pkg from './package.json';

const extensions = ['.js', '.ts'];

const { BUILD_TYPE, BABEL_ENV } = process.env;

const PRODUCTION = BABEL_ENV === 'production';

const ES5 = BUILD_TYPE === 'es5';
const ES5_BUNDLE_PATH = 'dist/es5';

const ES2019 = BUILD_TYPE === 'es2019';

export default {
  input: 'src/index.ts',

  output: buildOutput(),

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
      babelHelpers: 'bundled',
    }),

    replace({
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': JSON.stringify(BABEL_ENV),
        'process.env.BUILD_TYPE': JSON.stringify(BUILD_TYPE),
      }
    })
  ],
};

function buildOutput() {
  if (ES5) {
    const suffix = PRODUCTION ? '.min' : '';
    return [
      /* iife */
      {
        file: `${ES5_BUNDLE_PATH}/index.iife${suffix}.js`,
        format: 'iife',
        name: 'TRY_DI',
        sourcemap: true,
        plugins: [terser()],
      },

      /* esm */
      {
        file: `${ES5_BUNDLE_PATH}/index.esm${suffix}.js`,
        format: 'es',
        sourcemap: true,
        plugins: [terser()],
      },
    ];
  }

  if (ES2019) {
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
