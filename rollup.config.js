import { babel } from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";

const extensions = [".js", ".jsx", ".es6", ".es", ".mjs", ".ts", ".tsx"];

export default {
  input: "src/index.ts",
  external: ["react"],
  output: {
    name: "ReactSuggester",
    file: "dist/ReactSuggester.js",
    format: "umd",
    sourcemap: true,
    globals: {
      react: "React",
    },
  },
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
