const formatInputData = require("./formatInputData").default;
const formatOutputData = require("./formatOutputData").default;

/**
 * Consumes raw matchdays input data,
 * transforms data into a string,
 * formats the string,
 * then outputs data to stdout
 *
 * @param {Buffer} input
 */
module.exports.default = function processGameData(input) {
  const data = String(input);

  if (data && data != "null") {
    const matchdaysData = formatInputData(data);

    for (const [matchdayNumber, teamsData] of Object.entries(matchdaysData)) {
      const matchdayOutput = formatOutputData(matchdayNumber, teamsData);
      process.stdout.write(matchdayOutput);
    }
  }
};
