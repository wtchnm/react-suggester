import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";

const INJECT_PROCESS_MODULE_ID = "\0inject-process";

export default {
  input: "src/index.ts",
  external: ["react"],
  output: {
    name: "ReactSuggester",
    file: "dist/ReactSuggester.min.js",
    format: "umd",
    sourcemap: true,
    globals: {
      react: "React",
    },
  },
  plugins: [
    typescript(),
    nodeResolve({ browser: true }),
    postcss({
      extract: "ReactSuggester.min.css",
      sourceMap: true,
    }),
    terser(),
    {
      name: "inject-process-plugin",
      resolveId(id) {
        if (id === INJECT_PROCESS_MODULE_ID) {
          return INJECT_PROCESS_MODULE_ID;
        }
        return undefined;
      },
      load(id) {
        if (id === INJECT_PROCESS_MODULE_ID) {
          return `export const env = {NODE_ENV: 'production'};\n`;
        }
        return undefined;
      },
      transform(code, id) {
        if (id !== INJECT_PROCESS_MODULE_ID) {
          return `import * as process from '${INJECT_PROCESS_MODULE_ID}';\n${code}`;
        }
        return undefined;
      },
    },
  ],
};
