module.exports = (ctx) => ({
  plugins: {
    tailwindcss: {},
    autoprefixer: ctx.env === "production" ? {} : false,
    cssnano: ctx.env === "production" ? {} : false,
  },
});
