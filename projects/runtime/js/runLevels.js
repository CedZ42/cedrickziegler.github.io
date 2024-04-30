var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    function createSawBlade(x,y){
      var hitZoneSize = 40;
      var damageFromObstacle = 20;
      var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
      sawBladeHitZone.x = x; // Hitbox X value
      sawBladeHitZone.y = y; // Hitbox Y value
      game.addGameItem(sawBladeHitZone); // Adds sawblades into game
      var obstacleImage = draw.bitmap("img/bugs.png"); // Puts image on object
      obstacleImage.x = -40; // Picture X value
      obstacleImage.y = -45; // Picture X value
      obstacleImage.scaleX = .38; // X scale for picture
      obstacleImage.scaleY = .38; // Y scale for picture
      sawBladeHitZone.addChild(obstacleImage);
      
    }

    function createManhole(x, y) {
      var enemy = game.createGameItem("enemy", 25); // Creates game item
      var manhole = draw.bitmap("img/manhole.png"); // Draws game item
      manhole.scaleX = .5; // X scale for picture
      manhole.scaleY = .75; // Y scale for picture
      manhole.x = -125; // manhole X pos
      manhole.y = -200; // manhole Y pos
      enemy.addChild(manhole); // Relates the red square to the enemy
      enemy.x = x; // Enemy X pos
      enemy.y = y; // Enemy Y pos
      game.addGameItem(enemy); // Adds enemy into the game
      enemy.velocityX = -5 // Enemy Movement

      enemy.onPlayerCollision = function () { // Function make the player lose health and object disappear
        game.increaseScore(-100);
        enemy.fadeOut();
      };

    }

    function createThug(x, y) {
      var enemy = game.createGameItem("enemy", 50); // Creates game item
      var thug = draw.bitmap("img/thug.png"); // Draws game item
      thug.scaleX = .5; // X scale for picture
      thug.scaleY = .75; // Y scale for picture
      thug.x = -80; // thug X pos
      thug.y = -200; // thug Y pos
      enemy.addChild(thug); // Relates the red square to the enemy
      enemy.x = x; // Enemy X pos
      enemy.y = y; // Enemy Y pos
      game.addGameItem(enemy); // Adds enemy into the game
      enemy.velocityX = -6 // Enemy Movement

      enemy.onPlayerCollision = function () { // Function make the player lose health and object disappear
        game.increaseScore(-100);
        enemy.fadeOut();
      };
      enemy.onProjectileCollision = function () { // Function make the player get points and makes object disappaer
        game.increaseScore(100);
        enemy.fadeOut();
      };

    }

    function createWarrior(x, y) {
      var enemy = game.createGameItem("enemy", 50); // Creates game item
      var warrior = draw.bitmap("img/Warrior.webp"); // Draws game item
      warrior.scaleX = .5; // X scale for picture
      warrior.scaleY = .75; // Y scale for picture
      warrior.x = -80; // warrior X pos
      warrior.y = -200; // warrior Y pos
      enemy.addChild(warrior); // Relates the red square to the enemy
      enemy.x = x; // Enemy X pos
      enemy.y = y; // Enemy Y pos
      game.addGameItem(enemy); // Adds enemy into the game
      enemy.velocityX = -6 // Enemy Movement

      enemy.onPlayerCollision = function () { // Function make the player lose health and object disappear
        game.increaseScore(-100);
        enemy.fadeOut();
      };
      enemy.onProjectileCollision = function () { // Function make the player get points and makes object disappaer
        game.increaseScore(100);
        enemy.fadeOut();
      };

    function createReward(x, y) {
      var reward = game.createGameItem("enemy", 15); // Creates game item
      var bandAid= draw.bitmap("img/Band-aid.png"); // Draws game item
      bandAid.scaleX = .25; // X scale for picture
      bandAid.scaleY = .25; // Y scale for picture
      bandAid.x = -65; // blueSquare X pos
      bandAid.y = -25; // blueSquare Y pos
      reward.addChild(bandAid); // Relates the red square to the enemy
      reward.x = x; // Enemy X pos
      reward.y = groundY; // Enemy Y pos
      game.addGameItem(reward); // Adds enemy into the game
      reward.velocityX = -3 // Enemy Movement

      reward.onPlayerCollision = function () { // Function make the player get points and makes object disappaer
        game.increaseScore(100);
        reward.fadeOut();
        reward.shrink();
      };
    }

    function createBetterReward(x, y) {
      var bestReward = game.createGameItem("enemy", 15); // Creates game item
      var superBandAid= draw.bitmap("img/Superbandaid.png"); // Draws game item
      superBandAid.scaleX = .15; // X scale for picture
      superBandAid.scaleY = .15; // Y scale for picture
      superBandAid.x = -40; // blueSquare X pos
      superBandAid.y = -40; // blueSquare Y pos
      bestReward.addChild(superBandAid); // Relates the red square to the enemy
      bestReward.x = x; // Enemy X pos
      bestReward.y = groundY; // Enemy Y pos
      game.addGameItem(bestReward); // Adds enemy into the game
      bestReward.velocityX = -3 // Enemy Movement

      bestReward.onPlayerCollision = function () { // Function make the player get points and makes object disappaer
        game.increaseScore(100);
        game.increaseScore(100);
        bestReward.fadeOut();
        bestReward.shrink();
      };
    }

    function createMarker(x, y) {
      var marker = game.createGameItem("enemy", 25); // Creates game item
      var yellowSquare= draw.rect(50, 50, "yellow"); // Draws game item
      yellowSquare.x = -25; // marker X pos
      yellowSquare.y = -25; // marker Y pos
      marker.addChild(yellowSquare); // Relates the red square to the enemy
      marker.x = x; // marker X pos
      marker.y = y; // marker Y pos
      game.addGameItem(marker); // Adds enemy into the game
      marker.velocityX = -3; // Enemy Movement
      yellowSquare.scaleX = 1; // Enemy Movement
      yellowSquare.scaleY = 1; // Enemy Movement

      marker.onPlayerCollision = function () { // Function makes marker disappear
        marker.fadeOut();
        startLevel();
      };

    }

    function startLevel() {
      // TODO 13 goes below here

      var level = levelData[currentLevel];
      var levelObjects = level.gameItems;
      for (var i = 0; i < levelObjects.length; i++){
        var element = levelObjects[i];
        if (element.type === "sawblade"){
          createSawBlade(element.x, element.y);
        }
        if ( element.type === "enemy"){
          createManhole(element.x,element.y);
        }
        if ( element.type === "reward"){
          createReward(element.x,element.y);
        }
        if (element.type === "marker"){
          createMarker(element.x,element.y);
        }
        if (element.type === "thug"){
          createThug(element.x,element.y);
        }
        if (element.type === "bestReward"){
          createBetterReward(element.x,element.y);
        }
        if (element.type === "warrior"){
          createWarrior(element.x,element.y);
        }
      }

      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  }
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
