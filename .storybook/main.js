module.exports = {
  stories: ["../src/stories/*.stories.tsx"],
  addons: ["@storybook/addon-actions", "@storybook/addon-links"],
  webpackFinal: async (config) => {
    config.module.rules.forEach((rule) => {
      if (rule.test.toString() === "/\\.css$/") {
        const idx = rule.use.findIndex(
          ({ loader }) => loader && loader.includes("css-loader")
        );
        rule.use[idx].options.modules = true;
      }
    });
    config.module.rules.push({
      test: /\.css$/,
      use: ["postcss-loader"],
    });
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve("ts-loader"),
        },
        {
          loader: require.resolve("react-docgen-typescript-loader"),
        },
      ],
    });
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  },
};
