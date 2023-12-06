$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }
    //create walls
    createPlatform(-50, -50, canvas.width + 100, 50); //top
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200); //right
    createPlatform(-50, -50, 50, canvas.height + 500); //bottom
    createPlatform(canvas.width, -50, 50, canvas.height + 100);

    /**
     * Uncomment the loops below to add a "grid" to your platformer game's screen
     * The grid will place both horizontal and vertical platforms incremented 100 pixels apart
     * This can give you a better idea of where to create new platforms
     * Comment the lines out to remove the grid
     */

    for (let i = 50; i < canvas.width; i += 50) {
    createPlatform(i, canvas.height, -1, -canvas.height);
    }
    for (let i = 50; i < canvas.height; i += 50) {
    createPlatform(canvas.width, i, -canvas.width, -1);
    }

    /////////////////////////////////////////////////
    //////////ONLY CHANGE BELOW THIS POINT///////////
    /////////////////////////////////////////////////

    // TODO 1
    // Create platforms
    // You must decide the x position, y position, width, and height of the platforms
    // example usage: createPlatform(x,y,width,height)
    // Read bottom to top

    createPlatform(0,620,1250,20); // First PF
    createPlatform(150,500,1250,20); // Second PF
    createPlatform(0,350,250,20); // Ending PF
    createPlatform(150,200,900,50); // Top Ending PF
    createPlatform(250,380,100,20); // Last Gap
    createPlatform(350,350,250,20); // Thrid PF
    createPlatform(600,380,150,20); // 2nd Gap
    createPlatform(750,350,250,20); // Thrid PF
    createPlatform(1000,380,150,20); // Starting PF
    createPlatform(1150,83,50,317); // Wall
    createPlatform(1300,400,100,20); // First JPF
    createPlatform(1200,280,100,20); // Second JPF
    createPlatform(1300,180,100,20); // Thrid JPF
    createPlatform(1200,80,100,20); // Last JPF
    createPlatform(1030,0,20,220); // Smaller Wall
    createPlatform(0,240,50,15); // Smaller Wall

    // TODO 2
    // Create collectables
    // You must decide on the collectable type, the x position, the y position, the gravity, and the bounce strength
    // Your collectable choices are 'database' 'diamond' 'grace' 'kennedi' 'max' and 'steve'; more can be added if you wish
    // example usage: createCollectable(type, x, y, gravity, bounce)

    createCollectable('diamond',400,550);


    // TODO 3
    // Create cannons
    // You must decide the wall you want the cannon on, the position on the wall, and the time between shots in milliseconds
    // Your wall choices are: 'top' 'left' 'right' and 'bottom'
    // example usage: createCannon(side, position, delay, width, height)

    createCannon("left",630,1800,50,50); // Bottom
    createCannon("left",215,2700,45,45); // Top
    createCannon("right",630,1600,50,50);
    createCannon("top",630,1800,15,15); // 1st
    createCannon("top",330,1800,15,15); // 2nd
    createCannon("top",930,1800,15,15); // 3rd

    /////////////////////////////////////////////////
    //////////ONLY CHANGE ABOVE THIS POINT///////////
    /////////////////////////////////////////////////
  }

  registerSetup(setup);
});
