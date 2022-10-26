module.exports = {
  roots: ['<rootDir>/src'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts(x)?'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  modulePaths: ['<rootDir>/src/'],
}
