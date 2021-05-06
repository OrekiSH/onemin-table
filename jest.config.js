module.exports = {
  moduleFileExtensions: [
    'js',
    'vue',
  ],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
  setupFiles: ['./tests/setup.js'],
  collectCoverageFrom: ['packages/**/index.vue', '!/node_modules/'],
  collectCoverage: true,
  coverageReporters: ['html'],
};
