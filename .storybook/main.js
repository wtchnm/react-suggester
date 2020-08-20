module.exports = {
  stories: ["../stories/*.stories.tsx"],
  addons: ["@storybook/addon-storysource", "@storybook/addon-knobs"],
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
    return config;
  },
};
