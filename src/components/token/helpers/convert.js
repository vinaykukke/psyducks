const fsPromises = require("fs/promises");
const path = require("path");
const sharp = require("sharp");

/**
 * This file is a node-js only program
 * Reads a directory and manipulates the SVG files to the desired results
 *
 * Use "YARN CONVERT" to generate the required Svg files
 */
(async () => {
  try {
    const dirname = path.resolve("NFT", "Unpsyned", "images - final");
    const filesInDir = await fsPromises.readdir(dirname, "utf8");
    /** Removing all the .DS_Store hidden files */
    const files = filesInDir.filter((item) => !/(^|\/)\.[^\/\.]/g.test(item));

    for (let i = 0; i < files.length; i++) {
      const fileName = files[i];
      sharp(path.resolve("NFT", "Unpsyned", "images - final", fileName), {
        density: 500,
      })
        .png()
        .toFile(
          path.resolve(
            "NFT",
            "Unpsyned",
            "images - png - new",
            fileName.replace(".svg", ".png")
          )
        )
        .then(function (info) {
          console.log(info);
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  } catch (err) {
    console.log("Error appending data to file", err);
  }
})();
