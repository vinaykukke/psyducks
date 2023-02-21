const fsPromises = require("fs/promises");
const path = require("path");

/**
 * This file is a node-js only program
 * Reads a directory and manipulates the SVG files to the desired results
 *
 * Use "YARN URL" to generate the required svg files
 */
(async () => {
  try {
    const promises = [];
    for (let i = 0; i < 11111; i++) {
      const json = {
        name: `Unpsyned #${i}`,
        description:
          "This collection is part of the PSY lottery system. Mathematics reveals its secrets only to those who approach it with pure love - for its own beauty.",
        tokenId: i,
        attributes: [
          {
            trait_type: "PI",
            value: "3.14159265359",
          },
          {
            trait_type: "PHI",
            value: "1.61803398875",
          },
          {
            trait_type: "E",
            value: "2.71828182845",
          },
          {
            trait_type: "I",
            value: "-1^2",
          },
          {
            trait_type: "MU",
            value: "1.45607494858",
          },
          {
            trait_type: "Mood",
            value: "Spiritual",
          },
        ],
        image: `ipfs://QmYXrRUFo285PNnaT2Y2MzhieFqrUU9KxEmtWWJ4sCAZUx/${i}.svg`,
      };

      await fsPromises.writeFile(
        path.resolve("NFT", "Unpsyned", "metadata") + `/${i}.json`,
        JSON.stringify(json)
      );
    }
  } catch (err) {
    console.log("Error appending data to file", err);
  }
})();
