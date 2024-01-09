/** @type {import('jest').Config} */
const config = {
    verbose: true,
    setupFilesAfterEnv: ['./setUpTest.js'],
    transformIgnorePatterns: []
  };
  
  module.exports = config;