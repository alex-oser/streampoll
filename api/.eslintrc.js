/* eslint-disable */
module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  parser: "babel-eslint",
  extends: ["eslint:recommended", "google"],
  rules: {
    "quotes": [1, "double"],
    "object-curly-spacing": 0,
    "max-len": [1, 130],
    "semi": 1,
    "indent": [1, 2],
    "comma-dangle": 1,
    "no-trailing-spaces": 1,
    "quote-props": 1,
    "padded-blocks": 1,
    "new-cap": 0,
  },
};
