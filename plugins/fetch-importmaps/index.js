const https = require("https");
const { parse } = require("url");

const api = (urlOptions, data) => {
  return new Promise((resolve, reject) => {
    const req = https.request(urlOptions, (res) => {
      res.on("data", () => {});
      res.on("error", reject);
      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode <= 299) {
          resolve();
        } else {
          reject();
        }
      });
    });
    req.on("error", reject);
    req.write(data, "binary");
    req.end();
  });
};

module.exports = {
  onSuccess: async (args) => {
    // eslint-disable-next-line no-undef
    const { IMPORTMAP_URL, IMPORTMAP_AUTH } = process.env;
    const { service, file, file_url } = args.inputs;

    const githash = args.utils.git.commits[0].sha.slice(0, 7);
    const url = file_url + file.replace("[githash]", githash);

    const params = {
      service,
      url,
    };

    const options = {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
    };

    if (IMPORTMAP_AUTH) {
      options.headers.authorization = IMPORTMAP_AUTH;
    }

    await api(
      Object.assign(options, parse(IMPORTMAP_URL, options)),
      JSON.stringify(params)
    );
  },
};
