module.exports = {
  transformIgnorePatterns: ['node_modules/(?!(sucrase)/)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
};
