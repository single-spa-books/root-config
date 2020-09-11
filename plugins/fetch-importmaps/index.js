// const https = require("https");
// const { Buffer } = require("buffer");

// const params = {
//   service: "my-service",
//   url:
//     "https://raw.githubusercontent.com/mallonenogueira/teste-deployer/master/web.js",
// };

// const options = {
//   method: "PATCH",
//   hostname: "import-map-deployer-mallone.herokuapp.com",
//   port: null,
//   path: "/services",
//   headers: {
//     "content-type": "application/json",
//     "content-length": "118",
//     authorization: "Basic YWRtaW46MTIzNA==",
//   },
// };

// const req = https.request(options, () => {});

// req.write(JSON.stringify(params));

// req.end();

const path = require("path");
const fs = require("fs");

module.exports = {
  onPostBuild: (args) => {
    console.log(args);

    const { netlifyConfig } = args;

    fs.readdir(netlifyConfig.build.publish, function (err, files) {
      if (err) {
        return console.log("Unable to scan directory: " + err);
      }

      files.forEach(function (file) {
        console.log(file);
      });
    });
  },
};
