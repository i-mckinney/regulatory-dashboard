
module.exports = {
  webpack: {
    configure: {
      externals: [
        //this will externalize everything which start with '@material-ui'
        /^@material-ui\/.+$/
      ]
    }
  }
};

