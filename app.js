#!/usr/bin/env node

const fs = require('fs');
const processGameData = require("./services/processGameData").default;
const { ERROR } =     "Error: please pass filepath as an argument \n\n";


const main = () => {
  try {
    if (process.stdin.isTTY) {
      // handle when filepath is passed as argument
      const [, , filepath] = process.argv;

      if (!filepath) {
        process.stdout.write(ERROR);
        return;
      }

      const readStream = fs.createReadStream(filepath);
      readStream.on("readable", () => {
        const input = readStream.read();
        processGameData (input);
      });

      readStream.on("end", () => {
        return;
      });
    } else {
      // handle piped content
      process.stdin.on("readable", () => {
        let chunk;
        while ((chunk = process.stdin.read()) !== null) {
          processGameData (chunk);
        }
      });
    }
  } catch (e) {
    console.error(e);
  }
};

main();

module.exports.default = main;
