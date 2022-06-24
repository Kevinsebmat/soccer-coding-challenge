const path = require('path');
const { spawn } = require('child_process');
const formatOutputData = require("../services/formatOutputData").default;
const sortTeams = require("../services/sortTeams").default;
const formatInputData = require("../services/formatInputData").default;

describe("formatInputData", () => {
  it("take a string of matchday data and output it in the correct format with scores aggregated", () => {
    const unformattedData = `San Jose Earthquakes 3, Santa Cruz Slugs 3
        Capitola Seahorses 1, Aptos FC 0
        Felton Lumberjacks 2, Monterey United 0
        Felton Lumberjacks 1, Aptos FC 2
        Santa Cruz Slugs 0, Capitola Seahorses 0
        Monterey United 4, San Jose Earthquakes 2`;
    
    const formattedData = {
      1: {
        "San Jose Earthquakes": 1,
        "Santa Cruz Slugs": 1,
        "Capitola Seahorses": 3,
        "Aptos FC": 0,
        "Felton Lumberjacks": 3,
        "Monterey United": 0,
      },
      2: {
        "Felton Lumberjacks": 3,
        "Aptos FC": 3,
        "Santa Cruz Slugs": 2,
        "Capitola Seahorses": 4,
        "Monterey United": 3,
        "San Jose Earthquakes": 1,
      },
    };

    expect(formatInputData(unformattedData)).toEqual(formattedData);
  });
});
describe("sortTeams", () => {
  it("should sort the winning teams weighted by score and then alphabetically in case of ties", () => {
    const unsortedTeams = [
      { name: "c", points: 3 },
      { name: "d", points: 6 },
      { name: "a", points: 3 },
      { name: "b", points: 5 },
    ];

    const expectedSortResult = [
      { name: "d", points: 6 },
      { name: "b", points: 5 },
      { name: "a", points: 3 },
      { name: "c", points: 3 },
    ];

    expect(unsortedTeams.sort(sortTeams)).toEqual(expectedSortResult);
  });
});

describe("processGameData", () => {
  it("processes matchdays input data correctly", (done) => {

    const expectedOutput = `Matchday 1
Capitola Seahorses, 3 pts
Felton Lumberjacks, 3 pts
San Jose Earthquakes, 1 pts

`
    const testFilepath = path.join(
      __dirname,
      './testGameData.test.js',
    )

    const testChildProcess = spawn('node', [testFilepath])
    
    testChildProcess.stdout.on('data', data => {
      const output = data.toString()
      expect(output).toEqual(expectedOutput);

      testChildProcess.kill('SIGINT')
      done()
    })
    
  });
});



describe("formatOutputData", () => {
  it("creates correctly formatted output for a matchday given a number and team data", () => {
    const teamsDataInput = {
      "Capitola Seahorses": 3,
      "Felton Lumberjacks": 3 ,
      "San Jose Earthquakes": 1,
    };

    const teamsDataOutput = `Matchday 1\nCapitola Seahorses, 3 pts\nFelton Lumberjacks, 3 pts\nSan Jose Earthquakes, 1 pts\n\n`;
    expect(formatOutputData(1, teamsDataInput)).toEqual(teamsDataOutput);
  });
});
