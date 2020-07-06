import { terser } from "rollup-plugin-terser";
import resolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';

const jsfiles = {
  script: './src/js_src/main.js'
}
const cssfiles = {
  style: './src/css_src/main.scss'
}

export default [{
  input: jsfiles,
  output: [
    {
      name: 'script',
      dir: `${__dirname}/assets`,
      entryFileNames: 'js/[name].js',
      sourcemap: true,
      format: 'iife',
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    babel({
      babelrc: false,
      configFile: './babel.config.json',
    })
  ],
}, {
  input: jsfiles,
  output: [
    {
      name: 'script',
      dir: `${__dirname}/assets`,
      entryFileNames: 'js/[name].min.js',
      sourcemap: false,
      format: 'iife',
      plugins: [terser()]
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    babel({
      babelrc: false,
      configFile: './babel.config.json',
    })
  ],
}, {
  input: cssfiles,
  output: [
    {
      name: 'style',
      dir: `${__dirname}/assets`,
      entryFileNames: 'css/[name].css',
    }
  ],
  plugins: [
    resolve(),
    postcss({
      use: 'sass',
      extensions: ['.scss'],
      minimize: false,
      sourceMap: true,
      config: { path: 'postcss.config.js' },
      extract: 'css/style.css'
    }),
  ],
}, {
  input: cssfiles,
  output: [
    {
      name: 'style',
      dir: `${__dirname}/assets`,
      entryFileNames: 'css/[name].min.css',
    }
  ],
  plugins: [
    resolve(),
    postcss({
      use: 'sass',
      extensions: ['.scss'],
      minimize: true,
      sourceMap: false,
      config: { path: 'postcss.config.js' },
      extract: 'css/style.min.css'
    }),
  ],
}];
