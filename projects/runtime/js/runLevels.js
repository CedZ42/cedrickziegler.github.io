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
    game.setDebugMode(false);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    function createSawBlade(x,y){
      var hitZoneSize = 25;
      var damageFromObstacle = 10;
      var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
      sawBladeHitZone.x = 400; // Hitbox X pos
      sawBladeHitZone.y = 425; // Hitbox Y pos
      var obstacleImage = draw.bitmap("img/sawblade.png"); // Adds Sawblade image
      obstacleImage.x = x; // Image X pos
      obstacleImage.y = y; // Image Y pos
      sawBladeHitZone.addChild(obstacleImage); // Adds image to background
      game.addGameItem(sawBladeHitZone); // Adds Hitbox to background
    }
    createSawBlade(-25,-25);
    createSawBlade(100,0);
    createSawBlade(-200,-100);

    function createEnemy(x, y) {
      var enemy = game.createGameItem("enemy", 25); // Creates game item
      var redSquare = draw.rect(50, 50, "red"); // Draws game item
      redSquare.x = -25; // Redsquare X pos
      redSquare.y = -25; // Redsquare Y pos
      enemy.addChild(redSquare); // Relates the red square to the enemy
      enemy.x = x; // Enemy X pos
      enemy.y = y; // Enemy Y pos
      game.addGameItem(enemy); // Adds enemy into the game
      enemy.velocityX = -3 // Enemy Movement

      enemy.onPlayerCollision = function () { // Function make the player lose health
        game.increaseScore(-100);
        enemy.fadeOut();
      };
      enemy.onProjectileCollision = function (){
        enemy.fadeOut();
      }
    }
    
    createEnemy(400, groundY - 50);
    createEnemy(800, groundY - 100);
    createEnemy(1200, groundY - 50);

    function createReward(x, y) {
      var reward = game.createGameItem("enemy", 25); // Creates game item
      var blueSquare= draw.rect(50, 50, "blue"); // Draws game item
      blueSquare.x = -25; // blueSquare X pos
      blueSquare.y = -25; // blueSquare Y pos
      reward.addChild(blueSquare); // Relates the red square to the enemy
      reward.x = x; // Enemy X pos
      reward.y = y; // Enemy Y pos
      game.addGameItem(reward); // Adds enemy into the game
      reward.velocityX = -3 // Enemy Movement

      reward.onPlayerCollision = function () { // Function make the player lose health
        game.increaseScore(100);
        reward.fadeOut();
        reward.shrink();
      };
    }

    createReward(450, groundY - 50);

    function startLevel() {
      // TODO 13 goes below here



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
