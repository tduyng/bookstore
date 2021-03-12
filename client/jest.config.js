module.exports = {
  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  // roots: ['<rootDir>/src'],

  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  // transform: {
  //   '^.+\\.tsx?$': 'ts-jest',
  // },
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },

  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  setupFilesAfterEnv: [
    '@testing-library/react/cleanup-after-each',
    '@testing-library/jest-dom/extend-expect',
  ],

  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',

  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    'src/(.*)$': '<rootDir>/src/$1',
  },
  clearMocks: true,
};

// https://www.pluralsight.com/guides/how-to-test-react-components-in-typescript
