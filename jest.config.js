module.exports = {
  verbose: true,
  testEnvironment: 'node',
  clearMocks: true,
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
  globals: {
    NODE_ENV: 'test',
  },
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['node_modules', 'src/config', 'app.js', 'tests'],
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'yml'],
  testTimeout: 120000,
  maxConcurrency: 1,
  maxWorkers: '50%',
};
