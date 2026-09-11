import js from "@eslint/js";
import nx from "@nx/eslint-plugin";

export default [
  js.configs.recommended,
  ...nx.configs["flat/base"],
  ...nx.configs["flat/typescript"],
  ...nx.configs["flat/javascript"],
  {
    // Fixes eslint-plugin-react version detection in ESLint v10
    settings: {
      react: {
        version: "19.2",
      },
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    rules: {
      "@nx/enforce-module-boundaries": [
        "error",
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: "*",
              onlyDependOnLibsWithTags: ["*"],
            },
          ],
        },
      ],
      "no-extra-semi": "off",
    },
  },
];
