import { babel } from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import size from "rollup-plugin-size";

const extensions = [".js", ".jsx", ".es6", ".es", ".mjs", ".ts", ".tsx"];

const common = {
  name: "ReactSuggester",
  sourcemap: true,
  globals: {
    react: "React",
  },
  exports: "named",
  plugins: [size()],
};

export default {
  input: "src/index.ts",
  external: ["react"],
  output: [
    {
      ...common,
      file: "dist/ReactSuggester.umd.js",
      format: "umd",
    },
    {
      ...common,
      file: "dist/ReactSuggester.esm.js",
      format: "esm",
    },
    {
      ...common,
      file: "dist/ReactSuggester.cjs.js",
      format: "cjs",
    },
  ],
  plugins: [
    nodeResolve({
      browser: true,
      extensions,
    }),
    babel({
      babelHelpers: "runtime",
      skipPreflightCheck: true,
      extensions,
    }),
    postcss({
      extract: "ReactSuggester.css",
      sourceMap: true,
    }),
    terser(),
  ],
};
