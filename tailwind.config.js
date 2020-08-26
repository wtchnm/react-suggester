module.exports = {
  purge: ["./src/**/*.tsx"],
  variants: {
    backgroundColor: ["responsive", "hover", "focus", "active"],
  },
  future: {
    removeDeprecatedGapUtilities: true,
  },
};
