module.exports = {
  purge: ["./src/**/*.tsx"],
  variants: {
    backgroundColor: ["responsive", "hover", "focus", "active"],
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
};
