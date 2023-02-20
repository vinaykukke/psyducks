const fsPromises = require("fs/promises");
const path = require("path");

/**
 * This file is a node-js only program
 * Reads a directory and manipulates the SVG files to the desired results
 *
 * Use "YARN GENERATE" to generate the required Svg files
 */
(async () => {
  const arr = [];
  const searchTerm = "<svg";
  const svgCloseTag = `</svg>`;

  try {
    const dirname = path.resolve("NFT", "Unpsyned", "icons");
    const filesInDir = await fsPromises.readdir(dirname, "utf8");
    /** Removing all the .DS_Store hidden files */
    const files = filesInDir.filter((item) => !/(^|\/)\.[^\/\.]/g.test(item));

    for (const file of files) {
      const content = await fsPromises.readFile(
        path.resolve("NFT", "Unpsyned", "icons", file),
        "utf8"
      );

      if (content.includes(searchTerm)) {
        const indexOfFirst = content.indexOf(searchTerm);
        const indexOfSecond = content.indexOf(">", indexOfFirst + 1);
        const newContent = content
          .slice(indexOfSecond + 1)
          .replace(svgCloseTag, "");
        arr.push(newContent);
      }
    }

    await fsPromises.writeFile(
      path.resolve("src", "components", "token") + "/icons.js",
      "module.exports = "
    );
    await fsPromises.appendFile(
      path.resolve("src", "components", "token", "icons.js"),
      JSON.stringify(arr)
    );
  } catch (err) {
    console.log("Error appending data to file", err);
  }
})();
