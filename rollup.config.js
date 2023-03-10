import { nodeResolve } from "@rollup/plugin-node-resolve";
import copy from "rollup-plugin-copy";

module.exports = {
  input: "index.js",
  output: {
    dir: "dist",
  },
  treeshake: false,
  plugins: [
    copy({
      targets: [
        {
          src: ["index.html", "sketch.js", "styles.css", "assets"],
          dest: "dist",
        },
      ],
    }),
    nodeResolve(),
  ],
};
