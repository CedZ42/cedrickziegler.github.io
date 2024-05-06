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
      var hitZoneSize = 40; // Variable for hitzone radius
      var damageFromObstacle = 20; // Variable for obstacle radius
      var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);v // Creates the obstalce with the hitzone radius as hitZoneSize and damage with damageFromObstacle
      sawBladeHitZone.x = x; // Assigns the x parameter in the function to the x value of the hitbox for the sawblade
      sawBladeHitZone.y = y; // Assigns the y parameter in the function to the y value of the hitbox for the sawblade
      game.addGameItem(sawBladeHitZone); // Adds sawblades into game
      var obstacleImage = draw.bitmap("img/bugs.png"); // Inserts the image ontop of the obstacle
      obstacleImage.x = -40; // Picture X value
      obstacleImage.y = -45; // Picture Y value
      obstacleImage.scaleX = .38; // Scales the X value for the picture
      obstacleImage.scaleY = .38; // Scales the Y value for the picture
      sawBladeHitZone.addChild(obstacleImage); // Groups the image with the sawblade
      
    }

    function createManhole(x, y) {
      var enemy = game.createGameItem("enemy", 25); // Creates game item
      var manhole = draw.bitmap("img/manhole.png"); // Inserts the image ontop of the manhole
      manhole.scaleX = .5; // Scales the X value for the manhole picture
      manhole.scaleY = .75; // Scales the Y value for the manhole picture
      manhole.x = -125; // X position for manhole image
      manhole.y = -200; // Y position for manhole image
      enemy.addChild(manhole); // Groups the image with the enemy
      enemy.x = x; // Assigns the x parameter in the function to the x value of the manhole position
      enemy.y = y; // Assigns the y parameter in the function to the y value of the manhole position
      game.addGameItem(enemy); // Adds enemy into the game
      enemy.velocityX = -5 // Changes the X direction the manhole moves in

      enemy.onPlayerCollision = function () { // Function make the player lose health and object disappear
        game.increaseScore(-100); // Decreases the player's score on collision 
        enemy.fadeOut(); // Makes enemy fade out on collision
      };

    }

    function createThug(x, y) {
      var enemy = game.createGameItem("enemy", 50); // Creates game item
      var thug = draw.bitmap("img/thug.png"); // Inserts the image ontop of the thug
      thug.scaleX = .5; // Scales the X value for the thug picture
      thug.scaleY = .75; // Scales the Y value for the thug picture
      thug.x = -80; // X position for thug image
      thug.y = -200; // Y position for thug image
      enemy.addChild(thug); // Groups the image with the thug
      enemy.x = x; // Assigns the x parameter in the function to the x value of the thug position
      enemy.y = y; // Assigns the y parameter in the function to the y value of the thug position
      game.addGameItem(enemy); // Adds thug into the game
      enemy.velocityX = -6 // Changes the X direction the thug moves in

      enemy.onPlayerCollision = function () { // Function make the player lose health and object disappear
        game.increaseScore(-100); // Decreases the player's score on collision 
        enemy.fadeOut(); // Makes thug fade out on collision
      };
      enemy.onProjectileCollision = function () { // Function make the player get points and makes object disappaer
        game.increaseScore(100); // Increases the player's score on bullet collision 
        enemy.fadeOut(); // Makes thug fade out on bullet collision
      };

    }

    function createWarrior(x, y) {
      var enemy = game.createGameItem("enemy", 50); // Creates game item
      var warrior = draw.bitmap("img/Warrior.webp"); // Inserts the image ontop of the warrior
      warrior.scaleX = .25; // Scales the X value for the warrior picture
      warrior.scaleY = .25; // Scales the Y value for the warrior picture
      warrior.x = -80; // X position for warrior image
      warrior.y = -200; // Y position for warrior image
      enemy.addChild(warrior); // Groups the image with the warrior
      enemy.x = x; // Assigns the x parameter in the function to the x value of the warrior position
      enemy.y = y; // Assigns the y parameter in the function to the y value of the warrior position
      game.addGameItem(enemy); // Adds warrior into the game
      enemy.velocityX = -6 // Changes the X direction the warrior moves in

      enemy.onPlayerCollision = function () { // Function make the player lose health and object disappear
        game.increaseScore(-100); // Decreases the player's score on collision
        enemy.fadeOut(); // Makes warrior fade out on collision
      };
      enemy.onProjectileCollision = function () { // Function make the player get points and makes object disappaer
        game.increaseScore(100); // Increases the player's score on bullet collision 
        enemy.fadeOut(); // Makes warrior fade out on bullet collision
      };
    }

    function createReward(x) {
      var reward = game.createGameItem("enemy", 15); // Creates game item
      var bandAid= draw.bitmap("img/Band-aid.png"); // Inserts the image ontop of the bandAid
      bandAid.scaleX = .25; // Scales the X value for the bandAid picture
      bandAid.scaleY = .25; // Scales the Y value for the bandAid picture
      bandAid.x = -65; // X position for bandAid image
      bandAid.y = -25; // Y position for bandAid image
      reward.addChild(bandAid); // Groups the image with the bandAid
      reward.x = x; // Assigns the x parameter in the function to the x value of the bandAid position
      reward.y = groundY; // Assigns the groundY variable in the function to the y value of the bandAid position
      game.addGameItem(reward); // Adds bandAid into the game
      reward.velocityX = -3 // Changes the X direction the bandAid moves in

      reward.onPlayerCollision = function () { // Function make the player get points and makes object disappaer
        game.increaseScore(100); // Increases the player's score on collision 
        reward.fadeOut(); // Makes bandAid fade out on collision
        reward.shrink(); // Makes bandAid shrink on collision
      };
    }

    function createBetterReward(x) {
      var bestReward = game.createGameItem("enemy", 15); // Creates game item
      var superBandAid= draw.bitmap("img/Superbandaid.png"); // Inserts the image ontop of the Superbandaid
      superBandAid.scaleX = .15; // Scales the X value for the Superbandaid picture
      superBandAid.scaleY = .15; // Scales the Y value for the Superbandaid picture
      superBandAid.x = -40; // X position for Superbandaid image
      superBandAid.y = -40; // Y position for Superbandaid image
      bestReward.addChild(superBandAid); // Groups the image with the Superbandaid
      bestReward.x = x; // Assigns the x parameter in the function to the x value of the Superbandaid position
      bestReward.y = groundY; // Assigns the groundY variable in the function to the y value of the Superbandaid position
      game.addGameItem(bestReward); // Adds Superbandaid into the game
      bestReward.velocityX = -3 // Changes the X direction the Superbandaid moves in

      bestReward.onPlayerCollision = function () { // Function make the player get points and makes object disappaer
        game.increaseScore(200); // Increases the player's score on collision 
        bestReward.fadeOut(); // Makes Superbandaid fade out on collision
        bestReward.shrink(); // Makes Superbandaid shrink on collision
      };
    }

    function createMarker(x, y) {
      var marker = game.createGameItem("enemy", 25); // Creates game item
      var yellowSquare= draw.rect(50, 50, "yellow"); // Draws a yellow square ontop of the marker
      yellowSquare.x = -25; // X position for yellow square image
      yellowSquare.y = -25; // Y position for yellow square image
      marker.addChild(yellowSquare); // Groups the yellow square with the marker
      marker.x = x; // Assigns the x parameter in the function to the x value of the marker position
      marker.y = y; // Assigns the y parameter in the function to the y value of the marker position
      game.addGameItem(marker); // Adds marker into the game
      marker.velocityX = -3; // Changes the X direction the Superbandaid moves in
      yellowSquare.scaleX = 1; // Scales the X value for the yellow square
      yellowSquare.scaleY = 1; // Scales the Y value for the yellow square

      marker.onPlayerCollision = function () { // Function makes marker disappear
        marker.fadeOut(); // Makes marker fade out on collision
        startLevel(); // Runs a function that increase the level variable to proceed from "Robot Romp" to the next level "Robot Rampage"
      };

    }

    function startLevel() {
      // TODO 13 goes below here

      var level = levelData[currentLevel]; // Variable that keeps track of what level you are on with the levelData array
      var levelObjects = level.gameItems; // Variable that stores all game items in each level
      for (var i = 0; i < levelObjects.length; i++){ // Loop that iterates through the levelObjects array to go through each game item in each level
        var element = levelObjects[i];
        if (element.type === "sawblade"){
          createSawBlade(element.x, element.y); // If the type "sawblade" is up, run the createSawblade function with the element's x and y coorindates
        }
        if ( element.type === "enemy"){
          createManhole(element.x,element.y); // If the type "enemy" is up, run the createManhole function with the element's x and y coorindates
        }
        if ( element.type === "reward"){
          createReward(element.x,element.y); // If the type "reward" is up, run the createReward function with the element's x and y coorindates
        }
        if (element.type === "marker"){
          createMarker(element.x,element.y); // If the type "marker" is up, run the createMarker function with the element's x and y coorindates
        }
        if (element.type === "thug"){
          createThug(element.x,element.y); // If the type "thug" is up, run the createThug function with the element's x and y coorindates
        }
        if (element.type === "bestReward"){
          createBetterReward(element.x,element.y); // If the type "bestReward" is up, run the createBetterReward function with the element's x and y coorindates
        }
        if (element.type === "warrior"){
          createWarrior(element.x,element.y); // If the type "warrior" is up, run the createWarrior function with the element's x and y coorindates
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
