var makeLevelData = function (window) {
  window.opspark = window.opspark || {};

  window.opspark.makeDataInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game

    // TODO 12: change the below data
    var levelData = [
      {
        name: "Robot Romp",
        number: 1,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 300, y: groundY - 120 }, // Creates a sawblade at X 300
          { type: "sawblade", x: 700, y: groundY - 120 }, // Creates a sawblade at X 700
          { type: "sawblade", x: 1000, y: groundY - 120 }, // Creates a sawblade at X 1000
          { type: "enemy", x: 800, y: groundY }, // Creates an enemy at X 800
          { type: "enemy", x: 1800, y: groundY }, // Creates an enemy at X 1800
          { type: "enemy", x: 1200, y: groundY }, // Creates an enemy at X 1200
          { type: "thug", x: 1400, y: groundY }, // Creates a thug at X 1400
          { type: "thug", x: 2400, y: groundY }, // Creates a thug at X 2400
          { type: "thug", x: 2300, y: groundY }, // Creates a thug at X 2300
          { type: "thug", x: 2500, y: groundY }, // Creates a thug at X 2500
          { type: "reward", x: 2450, y: groundY - 50 }, // Creates a reward at X 2450
          { type: "bestReward", x: 2500, y: groundY - 50 }, // Creates a bestReward at X 2500
          { type: "marker", x: 2400, y: groundY + 5 }, // Creates a marker at X 2400
        ],
      },
      {
        name: "Robot Rampage",
        number: 2,
        speed: -3,
        gameItems: [
          { type: "thug", x: 600, y: groundY }, // Creates a thug at X 600
          { type: "thug", x: 700, y: groundY }, // Creates a thug at X 700
          { type: "thug", x: 800, y: groundY }, // Creates a thug at X 800
          { type: "thug", x: 900, y: groundY }, // Creates a thug at X 900
          { type: "thug", x: 1000, y: groundY }, // Creates a thug at X 1000
          { type: "thug", x: 1100, y: groundY }, // Creates a thug at X 1100
          { type: "thug", x: 1200, y: groundY }, // Creates a thug at X 1200
          { type: "thug", x: 1300, y: groundY }, // Creates a thug at X 1300
          { type: "thug", x: 1400, y: groundY }, // Creates a thug at X 1400
          { type: "thug", x: 1500, y: groundY }, // Creates a thug at X 1500
          { type: "warrior", x: 2500, y: groundY }, // Creates a warrior at X 2500
        ],
      },
    ];
    window.opspark.levelData = levelData;
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = makeLevelData;
}
