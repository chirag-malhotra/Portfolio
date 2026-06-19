import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Overrides tsconfig.json's Vite-specific "moduleResolution: bundler"
  // which ts-jest does not support — uses "node" resolution instead
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          moduleResolution: 'node',
          jsx: 'react-jsx',
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          ignoreDeprecations: '6.0',
        },
        diagnostics: {
          ignoreCodes: [1343],
        },
        astTransformers: {
          before: [
            {
              path: 'node_modules/ts-jest-mock-import-meta',
              options: {
                metaObjectReplacement: {
                  env: {
                    VITE_EMAILJS_SERVICE_ID: 'mock_service_id',
                    VITE_EMAILJS_TEMPLATE_ID: 'mock_template_id',
                    VITE_EMAILJS_PUBLIC_KEY: 'mock_public_key',
                  },
                },
              },
            },
          ],
        },
      },
    ],
  },

  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
    '!src/main.tsx',
  ],

  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  // Mocks CSS/SCSS imports so Jest doesn't choke on them
  // Requires: npm install -D identity-obj-proxy
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};

export default config;