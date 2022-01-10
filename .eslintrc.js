module.exports = {
  root: true,
  env: {
    node: true,
  },
  // parser: '@typescript-eslint/parser',
  parser: "vue-eslint-parser",
  // https://github.com/vuejs/vue-eslint-parser#parseroptionsparser
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
}