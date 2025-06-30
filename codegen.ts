import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: [
        {
            'https://xrusdfbrctlvqazuzvfa.hasura.us-west-2.nhost.run/v1/graphql': {
                headers: {
                    'x-hasura-admin-secret': 'SQae9RGF;5s3Q_u\'w8f3O$\'zp6$gQMW&',
                },
            },
        },
    ],
    documents: ['./src/graphql/**/*.graphql'],
    generates: {
        './src/graphql/generated/index.ts': {
            plugins: [
                'typescript',
                'typescript-operations',
                'typescript-react-apollo',
            ],
            config: {
                withHooks: true,
            }
        }
    }
};

export default config;