const { build } = require('esbuild');
const { NodeModulesPolyfillPlugin } = require('@esbuild-plugins/node-modules-polyfill');
const { NodeGlobalsPolyfillPlugin } = require('@esbuild-plugins/node-globals-polyfill');

const isProd = process.env.NODE_ENV === 'production';

build({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  sourcemap: true,
  minify: isProd,
  outdir: 'build',
  plugins: [
    NodeModulesPolyfillPlugin(),
    NodeGlobalsPolyfillPlugin({ buffer: true }),
  ],
})
.catch(() => process.exit(1));
