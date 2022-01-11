module.exports = {
  root: true,
  env: {
    node: true,
  },
  // parser: '@typescript-eslint/parser',
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser"
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['off'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['off'],
  }
}