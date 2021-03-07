module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "google"],
  rules: {
    quotes: ["warning", "double"],
    "object-curly-spacing": 0,
    "max-len": [1, 120],
  },
};
