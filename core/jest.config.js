module.exports = {
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // Updated to JS
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.jsx?$': 'babel-jest', // Updated to handle JS/JSX files
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
  };