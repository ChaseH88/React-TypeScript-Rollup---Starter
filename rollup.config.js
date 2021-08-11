import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { DEFAULT_EXTENSIONS } from '@babel/core'
import replace from '@rollup/plugin-replace';
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload';
import progress from 'rollup-plugin-progress';

/**
 * The port in which to run the dev server on
 */
const port = 3005;

/**
 * Rollup configuration
 * @see https://rollupjs.org/guide/en/#configuration-files
 */
export default [
  {
    // Starting point of project...
    input: './src/index.tsx',

    // Output folder/file location and polyfill type
    output: {
      file: './build/app.js',
      format: 'iife'
    },
    
    // --- Rollup Plugins ---
    plugins: [
        
      // TypeScript plugin for Rollup
      typescript({
        typescript: require('typescript'),
        rollupCommonJSResolveHack: true,
        sourceMap: false
      }),

      // Polyfill stuff
      commonjs({
        include: 'node_modules/**',
        sourceMap: true
      }),

      // So browsers won't complain
      nodeResolve({
        browser: true
      }),

      // Basically a '.babelrc' file
      babel({
        babelHelpers: 'runtime',
        presets: [
          'react-app',
        ],
        extensions: [
          ...DEFAULT_EXTENSIONS,
          '.ts',
          '.tsx',
        ],
        plugins: [
          '@babel/plugin-proposal-object-rest-spread',
          '@babel/plugin-proposal-optional-chaining',
          '@babel/plugin-syntax-dynamic-import',
          '@babel/plugin-proposal-class-properties'
        ],
        exclude: 'node_modules/**'
      }),

      // Satisfy the browser
      replace({
        'process.env.NODE_ENV': JSON.stringify('development')
      }),

      // Setup the local dev server
      serve({
        host: 'localhost',
        port,
        open: true,
        openPage: `http://localhost:${port}/`,
      }),

      // Hot reload the browser on save
      livereload(),

      // Simple console progress bar seen while compiling
      progress(),
    ]
  }
];
