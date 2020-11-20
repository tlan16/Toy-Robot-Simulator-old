module.exports = {
    verbose: true,
    testTimeout: 60000,
    testMatch: [`${__dirname}/tests/**/*.spec.ts`],
    testPathIgnorePatterns: ['/node_modules/', '/src/'],
    moduleFileExtensions: ['ts', 'js', 'json'],
    collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts'],
    transform: {
        '.(ts|tsx)': `${__dirname}/node_modules/ts-jest/preprocessor.js`,
    },
    moduleNameMapper: {
        '@/(.*)$': '<rootDir>/src/$1',
    },
    collectCoverage: true,
    coverageDirectory: `${__dirname}/coverage`,
    coverageProvider: 'v8',
    clearMocks: true,
    coverageThreshold: {
        global: {
            branches: 90,
            functions: 90,
            lines: 90,
            statements: 90,
        },
    },
    globals: {
        'ts-jest': {
            isolatedModules: true, // Implies transpile only
        },
    },
};
