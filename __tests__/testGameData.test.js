const processGameData = require("../services/processGameData").default

// used for testing processMatchdayInput
// wouldve put this in __tests__
// const gameInput = `San Jose Earthquakes 3, Santa Cruz Slugs 3
// 				   Capitola Seahorses 1, Aptos FC 0
// 				   Felton Lumberjacks 2, Monterey United 0
// 				   `
const gameInput = `San Jose Earthquakes 3, Santa Cruz Slugs 3
    Capitola Seahorses 1, Aptos FC 0
    Felton Lumberjacks 2, Monterey United 0`


processGameData(gameInput)