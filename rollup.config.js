import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.ts",
  external: ["react"],
  output: {
    name: "ReactSuggester",
    file: "dist/bundle.js",
    format: "iife",
    sourcemap: true,
    globals: {
      react: "React",
    },
  },
  plugins: [
    typescript(),
    resolve({ browser: true }),
    postcss({
      extract: true,
      sourceMap: true,
    }),
    terser(),
  ],
};
