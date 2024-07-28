module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**'],
    coveragePathIgnorePatterns: ['src/*/*.test.(js|ts)', 'src/*/*.spec.(js|ts)', 'src/entities', 'src/database', 'src/dto', 'src/repositories', 'src/types', 'src/server'],
    testEnvironment: 'node',
}
