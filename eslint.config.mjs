import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";
import js from "@eslint/js";
import nx from "@nx/eslint-plugin";

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
  recommendedConfig: js.configs.recommended,
});

export default [
  ...nx.configs["flat/base"],
  ...compat
    .config({
      extends: [
        "plugin:@typescript-eslint/strict",
        "plugin:@typescript-eslint/stylistic",
      ],
    })
    .map((config) => ({
      ...config,
      files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
      rules: {
        ...config.rules,
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
      },
    })),
  ...nx.configs["flat/typescript"],
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "no-extra-semi": "off",
    },
  },
  ...nx.configs["flat/javascript"],
  {
    files: ["**/*.js", "**/*.jsx"],
    rules: {
      "no-extra-semi": "off",
    },
  },
];
