module.exports = {
  purge: ["./src/**/*.tsx", "./stories/**/*.tsx"],
  variants: {
    backgroundColor: ["responsive", "hover", "focus", "active"],
  },
  future: {
    removeDeprecatedGapUtilities: true,
  },
};
