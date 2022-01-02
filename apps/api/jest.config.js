module.exports = {
  displayName: 'api',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': { tsconfig: '<rootDir>/tsconfig.spec.json' },
  },
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/api',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: ['lcov'],
  collectCoverageFrom: [
    '**/*.{ts}',
    '!**/*.spec.{ts}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
};
