module.exports = {
    "testURL": "http://localhost/",
    "collectCoverage": true,
    "collectCoverageFrom": ["src/**/*.ts"],
    "roots": [ "<rootDir>/tests" ],
    "coverageReporters": [ "json", "lcov", "text" ],
    "reporters": ["jest-tap-reporter"],
    "transform": { "^.+\\.tsx?$": "ts-jest" },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec|e2e-spec))\\.(jsx?|tsx?)$",
    "moduleFileExtensions": [ "ts", "tsx", "js", "jsx", "json", "node" ],
    "coverageDirectory": "./coverage"
  }
  