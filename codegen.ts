import type { CodegenConfig } from '@graphql-codegen/cli';
import schema from './src/schema';

const config: CodegenConfig = {
  schema,
  generates: {
    'src/@types/apollo-server.d.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        enumsAsConst: true,
        namingConvention: {
          enumValues: "keep"
        }
      }
    }
  }
}

export default config;
