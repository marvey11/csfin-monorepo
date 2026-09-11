import eslintReact from "@eslint-react/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import baseConfig from "../../eslint.config.mjs";

export default [
  ...baseConfig,
  eslintReact.configs.recommended,
  {
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    rules: {},
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {},
  },
  {
    files: ["**/*.js", "**/*.jsx"],
    rules: {},
  },
];
