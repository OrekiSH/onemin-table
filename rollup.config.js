import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import vue from 'rollup-plugin-vue';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import fs from 'fs';
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';

function genConfig(input, format, {
  output, name, file, useTerser,
}) {
  return {
    input,
    output: {
      dir: output,
      format,
      name,
      file,
    },
    plugins: [
      commonjs(),
      vue(),
      babel({
        babelHelpers: 'bundled',
        extensions: ['.js', '.vue'],
      }),
      useTerser ? terser({}) : false,
      format === 'umd' ? nodeResolve({
        resolveOnly: [/^@onemin-table\/.*$/, 'lodash', 'camelcase'],
      }) : false,
    ].filter(Boolean),
    watch: {
      include: 'packages/**',
    },
  };
}

const genSource = (e) => `./packages/${e}/src/index.vue`;

const pkgs = fs.readdirSync('./packages')
  .filter((e) => fs.lstatSync(`${__dirname}/packages/${e}`).isDirectory());

const conf = pkgs.map((e) => ((e === 'shared' || e.endsWith('utils')) ? [] : [
  genConfig(genSource(e), 'cjs', { output: `./packages/${e}/lib` }),
  genConfig(genSource(e), 'es', { output: `./packages/${e}/es` }),
  genConfig(genSource(e), 'umd', {
    name: upperFirst(camelCase(e)),
    file: `./packages/${e}/dist/${e}.js`,
  }),
  genConfig(genSource(e), 'umd', {
    name: upperFirst(camelCase(e)),
    file: `./packages/${e}/dist/${e}.min.js`,
    useTerser: true,
  }),
])).flat();

export default conf;
