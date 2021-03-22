import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import vue from 'rollup-plugin-vue';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import css from 'rollup-plugin-css-only';
import fs from 'fs';
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';

const genSource = (e) => `./packages/${e}/src/index.vue`;

function genConfig(input, format, {
  output, name, file, useTerser,
}) {
  const isUmd = format === 'umd';

  return {
    input: genSource(input),
    output: {
      dir: output,
      format,
      name,
      file,
    },
    plugins: [
      commonjs(),
      css({ output: `${input}.css` }),
      vue({ css: false }),
      babel({
        babelHelpers: 'bundled',
        extensions: ['.js', '.vue'],
        plugins: isUmd ? ['babel-plugin-transform-dynamic-imports-to-static-imports'] : [],
      }),
      useTerser ? terser({}) : false,
      isUmd ? nodeResolve({
        resolveOnly: [/^@onemin-table\/.*$/, 'lodash', 'camelcase'],
      }) : false,
    ].filter(Boolean),
    watch: {
      include: 'packages/**',
    },
  };
}

const pkgs = fs.readdirSync('./packages')
  .filter((e) => fs.lstatSync(`${__dirname}/packages/${e}`).isDirectory());

const conf = pkgs.map((e) => ((e === 'shared' || e.endsWith('utils')) ? [] : [
  genConfig(e, 'cjs', { output: `./packages/${e}/lib` }),
  genConfig(e, 'es', { output: `./packages/${e}/es` }),
  genConfig(e, 'umd', {
    name: upperFirst(camelCase(e)),
    file: `./packages/${e}/dist/${e}.js`,
  }),
  genConfig(e, 'umd', {
    name: upperFirst(camelCase(e)),
    file: `./packages/${e}/dist/${e}.min.js`,
    useTerser: true,
  }),
])).flat();

export default conf;
