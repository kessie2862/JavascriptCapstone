module.exports = {
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },

  resolver: undefined,
  transformIgnorePatterns: ['/node_modules/', '\\.(css|sass)$'],
  testEnvironment: 'jest-environment-jsdom',

  babelConfig: {
    presets: ['@babel/preset-env'],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-transform-modules-commonjs',
    ],
  },
};
