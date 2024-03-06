/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:tailwindcss/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        disallowTypeAnnotations: false,
      },
    ],
    "@typescript-eslint/no-unused-vars": ["warn"],
    "tailwindcss/classnames-order": ["off"],
  },
};
