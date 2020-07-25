module.exports = {
  stories: ["../stories/*.stories.tsx"],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-storysource",
    "@storybook/addon-knobs/register",
  ],
  webpackFinal: async (config) => {
    config.module.rules.forEach((rule) => {
      if (rule.test.toString() === "/\\.css$/") {
        const idx = rule.use.findIndex(
          (useEntry) =>
            useEntry.loader && useEntry.loader.includes("css-loader")
        );
        rule.use[idx].options.modules = true;
      }
    });
    config.module.rules.push({
      test: /\.css$/,
      loader: "postcss-loader",
    });
    config.module.rules.push({
      test: /\.tsx?$/,
      loader: "babel-loader",
    });
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  },
};
