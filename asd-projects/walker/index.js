/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width();
  const WALKER_WIDTH = $("#walker").width();
  const BOARD_HEIGHT = $("#board").height();
  const WALKER_HEIGHT = $("#walker").height();
  const KEY = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,

    A: 65,
    W: 87,
    D: 68,
    S: 83,
  }
  // Game Item Objects
  
  var walker = Walker ("#walker", 0, 0, 0, 0, WALKER_WIDTH, WALKER_HEIGHT);
  var walker2 = Walker ("#walker2", BOARD_WIDTH - WALKER_WIDTH, BOARD_HEIGHT - WALKER_HEIGHT, 0, 0, WALKER_WIDTH, WALKER_HEIGHT);

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem(walker);
    repositionGameItem(walker2);
    wallCollision(walker);
    wallCollision(walker2);
    redrawGameItem(walker);
    redrawGameItem(walker2);
    handleCollision();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT){
      walker.speedX = -5;
    }
    if (event.which === KEY.UP){
      walker.speedY = -5;
    }
    if (event.which === KEY.RIGHT){
      walker.speedX = 5;
    }
    if (event.which === KEY.DOWN){
      walker.speedY = 5;
    }
    if (event.which === KEY.A){
      walker2.speedX = -5;
    }
    if (event.which === KEY.W){
      walker2.speedY = -5;
    }
    if (event.which === KEY.S){
      walker2.speedY = 5;
    }
    if (event.which === KEY.D){
      walker2.speedX = 5;
    }
    
  }

  function handleKeyUp(event) {
    if (event.which === KEY.LEFT || event.which === KEY.RIGHT){
      walker.speedX = 0;
    }
    if (event.which === KEY.UP || event.which === KEY.DOWN){
      walker.speedY = 0;
    }
    if (event.which === KEY.A || event.which === KEY.D){
      walker2.speedX = 0;
    }
    if (event.which === KEY.W || event.which === KEY.S){
      walker2.speedY = 0;
    }
    
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function Walker (id, xPos, yPos, speedX, speedY, width, height){
    let obj = {
      id: id,
      xPos: xPos,
      yPos: yPos,
      speedX: speedX,
      speedY: speedY,
      width: width,
      height: height,
    }
    return obj;
  }

  function handleCollision(){
    if (doCollide(walker, walker2)){
      walker.xPos = 0;
      walker.yPos = 0;
      walker2.xPos = BOARD_WIDTH - WALKER_WIDTH;
      walker2.yPos = BOARD_HEIGHT - WALKER_HEIGHT;
      changeColor();
    }
  }


  function doCollide(obj1, obj2){
    obj1.leftX = obj1.xPos;
    obj1.topY = obj1.yPos;
    obj1.rightX = obj1.xPos + obj1.width;
    obj1.bottomY = obj1.yPos + obj1.height;
    
    // TODO: Do the same for walker2
    obj2.leftX = obj2.xPos;
    obj2.topY = obj2.yPos;
    obj2.rightX = obj2.xPos + obj2.width;
    obj2.bottomY = obj2.yPos + obj2.height;

    // TODO: Return true if they are overlapping, false otherwise
	if (
      obj2.rightX > obj1.leftX && 
      obj2.leftX < obj1.rightX &&
      obj2.bottomY > obj1.topY && 
      obj2.topY < obj1.bottomY
    
    ){
      return true;
    } 
    else {
      return false
    }
		
}
  
  function wallCollision(obj){
    if (obj.xPos > BOARD_WIDTH - WALKER_WIDTH || obj.xPos < 0){
      obj.xPos -= obj.speedX;
    }
    if (obj.yPos > BOARD_HEIGHT - WALKER_HEIGHT || obj.yPos < 0){
      obj.yPos -= obj.speedY;
    }
  }

  function repositionGameItem(obj){
    obj.xPos += obj.speedX;
    obj.yPos += obj.speedY;
  }

  function redrawGameItem(obj){
    $(obj.id).css("left", obj.xPos);
    $(obj.id).css("top", obj.yPos);
  }

  function changeColor (){
    var walkerColor = $("#walker").css("background-color")
    var walker2Color = $("#walker2").css("background-color")
    $("#walker").css("background-color", walker2Color)
    $("#walker2").css("background-color", walkerColor)
  }


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
