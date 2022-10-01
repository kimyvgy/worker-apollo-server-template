const { build } = require('esbuild');
const { NodeModulesPolyfillPlugin } = require('@esbuild-plugins/node-modules-polyfill');
const { NodeGlobalsPolyfillPlugin } = require('@esbuild-plugins/node-globals-polyfill');
const { default: GraphQLLoaderPlugin } = require('@luckycatfactory/esbuild-graphql-loader');
const { optimizeDocumentNode } = require('@graphql-tools/optimize');

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
    GraphQLLoaderPlugin({
      mapDocumentNode: (documentNode) => {
        return optimizeDocumentNode(documentNode);
      }
    }),
  ],
})
.catch(() => process.exit(1));
