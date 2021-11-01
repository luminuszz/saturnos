module.exports = {
  setupFiles: ['dotenv/config'],

  clearMocks: true,
  verbose: true,
  collectCoverage: true,
  preset: 'ts-jest',
  collectCoverageFrom: ['<rootDir>/src/core/events/*.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text-summary', 'lcov'],
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
};
