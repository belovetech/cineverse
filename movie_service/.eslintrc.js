module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: [
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module"
  },
  plugins: ["@typescript-eslint"],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"]
  }
  // rules: {
  //   "@typescript-eslint/explicit-member-accessibility": 0,
  //   "@typescript-eslint/explicit-function-return-type": 0,
  //   "@typescript-eslint/no-parameter-properties": 0,
  //   "@typescript-eslint/interface-name-prefix": 0,
  //   "@typescript-eslint/explicit-module-boundary-types": 0,
  //   "@typescript-eslint/no-explicit-any": "off",
  //   "@typescript-eslint/ban-types": "off",
  //   "@typescript-eslint/no-var-requires": "off"
  // }
};
