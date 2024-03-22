var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        //////////////////////////////////////////////////////////////////
        // ANIMATION VARIABLES HERE //////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        // TODO (several):
        var tree;
        var buildings = []; // Creates array for buildings
      
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO 1:
            // this currently fills the background with an obnoxious yellow;
            // you should modify both the height and color to suit your game
            var backgroundFill = draw.rect(canvasWidth,groundY,'#18191A');
            background.addChild(backgroundFill);
            
            // TODO 2: - Add a moon and starfield
            
            
            for(var i = 0; i <= 100; i++){ // Repeats 100 times
                var circle = draw.circle(1, "white", "LightGray", 2); // creates circle
                circle.x = canvasWidth * Math.random(); // Random X
                circle.y = groundY * Math.random(); // Random Y
                background.addChild(circle); // Adds to bg
            }

            var moon = draw.bitmap("img/moon.png"); // Id's moon picture
            moon.x = 1600; // X pos
            moon.y = 50; // Y pos
            moon.scaleX = .25; // X scale
            moon.scaleY = .25; // Y scale
            background.addChild(moon); // Adds to bg
            
            // TODO 4: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            for (var i = 0; i < 10; ++i) {
                var buildingHeight = Math.random()*300; // Sets random Building heights
                var building = draw.rect(65, buildingHeight, "Blue", "Black", 1); // Draws buildings
                building.x = 150 * i; // Building X pos
                building.y = groundY - buildingHeight; // Building Y pos
                background.addChild(building); // Adds buildings to background
                buildings.push(building); // Pushes news buildings to buildings array
              }

            
            // TODO 3: Part 1 - Add a tree
            tree = draw.bitmap("img/tree.png"); // Grabs tree picture
            tree.x = 300; // Tree X pos
            tree.y = groundY - 225; // Tree Y pos
            background.addChild(tree); // Adds tree to the background
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 3: Part 2 - Move the tree!

            tree.x = tree.x - 3; // Tree moves to the left 3 units every update
            if (tree.x < -200) {
                tree.x = canvasWidth; // If tree touches -200, reset X pos
            }
            
            // TODO 4: Part 2 - Parallax
           

            for (var i = 0; i < buildings.length; i++) {
                var building = buildings[i]; // Creates varible to address all buildings in buildings array
                building.x = building.x - 0.5; // Building movement speed
                if(building.x < -100){
                    building.x = canvasWidth; // Resets buildings
                }

              }

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
