import type { Config } from "jest";

const config: Config = {
  testEnvironment: "node",
  moduleNameMapper: { "^@/(.*)$": "<rootDir>/$1" },
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: { jsx: "react", esModuleInterop: true } }],
  },
  testMatch: ["**/__tests__/**/*.test.ts"],
};

export default config;
