module.exports = {
  babel: {
    plugins: [[
      "transform-imports",
      {
        "@material-ui/core": {
          "transform": "@material-ui/core/${member}",
          "preventFullImport": true
        },
        "@material-ui/icons": {
          "transform": "@material-ui/icons/${member}",
          "preventFullImport": true
        }
      }
    ]]
  },
};
