var init = function (window) {
    'use strict';
    var 
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz,
        
        app = window.opspark.makeApp(),
        canvas = app.canvas, 
        view = app.view,
        fps = draw.fps('#000');
        
    
    window.opspark.makeGame = function() {
        
        window.opspark.game = {};
        var game = window.opspark.game;
        
        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM SETUP ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        // TODO 1 : Declare and initialize our variables

        var circle;          // variable to hold a single circle when creating cricles
        var circles = [];    // variable to store all circles in one Array

        // TODO 2 : Create a function that draws a circle 
        
        function drawCircle(){
            // Code to draw a circle
            circle = draw.randomCircleInArea(canvas, true, true, "#999", 2);
            physikz.addRandomVelocity(circle, canvas, 2, 2);    // Affects circle speed
            view.addChild(circle);
            circles.push(circle);
        }

        // TODO 3 / 7 : Call the drawCircle() function 

        for(var i = 0; i <= 100; i++){
            drawCircle();                   // Draws 100 circles
        }

        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM LOGIC ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        /* 
        This Function is called 60 times/second producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
        function update() {
            // TODO 4 : Update the circle's position 
            // Makes the circles move

            for(var i = 0; i <= 100; i++){
                physikz.updatePosition(circles[i]);
            }
            
            // TODO 5 / 10 : Call game.checkCirclePosition() on your circles.
            // Keeps the circles that go off the screen back on the screen.
           
            for(var i = 0; i <= 100; i++){
                game.checkCirclePosition(circles[i]);
            }

            // TODO 9 : Iterate over the array
           
            
        }
    
        /* 
        This Function should check the position of a circle that is passed to the 
        Function. If that circle drifts off the screen, this Function should move
        it to the opposite side of the screen.
        */
        game.checkCirclePosition = function(circle) {

            var rightEdge = circle.x + circle.radius;    // Tracks right edge of the circle
            var leftEdge = circle.x - circle.radius*2;   // Tracks the left edge of the circle
            var topEdge = circle.y + circle.radius;      // Tracks the top edge of the circle
            var bottomEdge = circle.y - circle.radius*2; // Tracks the bottom edge of the circle

            // if the circle has gone past the RIGHT side of the screen then place it on the LEFT
            if (leftEdge > canvas.width ) {
                circle.x = 0;                       // checkes if the circle goes past the left of the screen then place it on the right
            }
            
            // TODO 6 : YOUR CODE STARTS HERE //////////////////////
            
            if(rightEdge < 0) {
                circle.x = canvas.width;      // checkes if the circle goes past the right of the screen then place it on the left
            }
            if(bottomEdge > canvas.height) {
                circle.y = 0 - circle.radius;                 // checkes if the circle goes above the screen then places it on the bottom
            }
            if(topEdge < 0) {
                circle.y = canvas.height + circle.radius;    // checkes if the circle goes below the screen them places it on the top
            }

            // YOUR TODO 6 CODE ENDS HERE //////////////////////////
        }
        
        /////////////////////////////////////////////////////////////
        // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
        /////////////////////////////////////////////////////////////
        
        view.addChild(fps);
        app.addUpdateable(fps);
        
        game.circle = circle;
        game.circles = circles;
        game.drawCircle = drawCircle;
        game.update = update;
        
        app.addUpdateable(window.opspark.game);
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = init;
}
