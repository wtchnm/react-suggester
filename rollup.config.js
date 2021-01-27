import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import { terser } from "rollup-plugin-terser";

const extensions = [".js", ".jsx", ".es6", ".es", ".mjs", ".ts", ".tsx"];

const common = {
  name: "ReactSuggester",
  sourcemap: true,
  globals: {
    react: "React",
  },
  exports: "named",
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
    sizeSnapshot(),
    terser(),
  ],
};
