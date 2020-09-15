const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackGitHash = require("webpack-git-hash");

function getOutput(defaultConfig) {
  if (global.process.env.WEBPACK_DEV_SERVER === "true") {
    return {};
  }

  return {
    filename: `[githash].${defaultConfig.output.filename}`,
  };
}

module.exports = (webpackConfigEnv) => {
  const orgName = "single-spa-books";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
  });

  return webpackMerge.smart(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    devServer: {
      historyApiFallback: true,
    },
    output: getOutput(defaultConfig),
    plugins: [
      new WebpackGitHash(),
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal === "true",
          orgName,
        },
      }),
    ],
  });
};
