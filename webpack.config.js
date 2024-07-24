// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const PACKAGE = require("./package.json");
const createExpoWebpackConfigAsync = require("@expo/webpack-config");

const isProduction = process.env.NODE_ENV == "production";

const getExpoConfig = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  config.entry = "./src/index.ts";
  config.output = {
    path: path.resolve(__dirname, "dist"),
    library: {
      type: "this",
    },
    filename: `${PACKAGE.name}.js`,
  };

  // Max image size 999 MB
  config.module.rules[1].oneOf[0].parser.dataUrlCondition.maxSize = 999999999;
  config.module.rules[1].oneOf[1].parser.dataUrlCondition.maxSize = 999999999;

  config.optimization = {
    minimize: isProduction,
  };

  return config;
};

module.exports = async function (env, argv) {
  env.mode = !isProduction ? "development" : "production";
  const config = await getExpoConfig(env, argv);
  // config.mode = "production";
  return config;
};
