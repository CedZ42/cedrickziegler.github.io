/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();
  const PADDLE_WIDTH = $("#leftPaddle").width();
  const PADDLE_HEIGHT = $("#leftPaddle").height();
  const BALL_HEIGHT = $("#ball").height();
  const BALL_WIDTH = $("#ball").width();
  
  // Game Item Objects

  const KEY = {
    "W": 87, 
    "S": 83,
    "UP": 38,
    "DOWN": 40,
  }

  function GameItem (id, speedX, speedY){
    var obj = {
      id: id,
      x: parseFloat($(id).css("left")),
      y: parseFloat($(id).css("top")),
      speedX: speedX,
      speedY: speedY,
      width: $(id).width(),
      height: $(id).height(),
    }
    return obj;
  }

  var leftPaddle = GameItem("#leftPaddle", 0, 0);
  var rightPaddle = GameItem("#rightPaddle", 0, 0);
  var ball = GameItem("#ball", (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1), (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1))
  var leftScore = GameItem("#leftScore", 0, 0);
  var rightScore = GameItem("#rightScore", 0, 0);
  var scoreL = 0;
  var scoreR = 0;
  var centerDistance = 240;

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
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
    drawGameItem(leftPaddle);
    updateGameItem(leftPaddle);
    drawGameItem(leftScore);
    updateGameItem(leftScore);
    drawGameItem(rightPaddle);
    updateGameItem(rightPaddle);
    drawGameItem(rightScore);
    updateGameItem(rightScore);
    drawGameItem(ball);
    updateGameItem(ball);
    paddleWallCollision(leftPaddle);
    paddleWallCollision(rightPaddle);
    ballWallCollision(ball);
    doCollide(ball, leftPaddle);
    doCollide(ball, rightPaddle);
    $("#leftScore").text(scoreL);
    $("#rightScore").text(scoreR);
    $("#Title").text("PONG");
    scoreToPaddle(leftPaddle, leftScore);
    scoreToPaddle(rightPaddle, rightScore);
    paddleCollisionDetection(leftPaddle, ball);
    paddleCollisionDetection(rightPaddle, ball);
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.W){
      leftPaddle.speedY = -10;
      leftScore.speedY = -10;
    }
    if (event.which === KEY.S){
      leftPaddle.speedY = 10;
      leftScore.speedY = 10;
    }
    if (event.which === KEY.UP){
      rightPaddle.speedY = -10;
      rightScore.speedY = -10;
    }
    if (event.which === KEY.DOWN){
      rightPaddle.speedY = 10;
      rightScore.speedY = 10;
    }
  }

  function handleKeyUp(event) {
    if (event.which === KEY.W || event.which === KEY.S){
      leftPaddle.speedY = 0;
      leftScore.speedY = 0;
    }
    if (event.which === KEY.UP || event.which === KEY.DOWN){
      rightPaddle.speedY = 0;
      rightScore.speedY = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Movement Helpers
  function drawGameItem (obj){
    $(obj.id).css("left", obj.x);
    $(obj.id).css("top", obj.y);
  }

  function updateGameItem (obj){
    obj.x += obj.speedX;
    obj.y += obj.speedY;
  }

  function paddleWallCollision (obj){
    if (obj.y > BOARD_HEIGHT - PADDLE_HEIGHT){
      obj.speedY = 0;
      obj.y = BOARD_HEIGHT - PADDLE_HEIGHT;
    }
    if (obj.y < 0){
      obj.speedY = 0;
      obj.y = 0;
    }
  }

  function scoreToPaddle (paddle, score){
    if (paddle.speedY === 0){
      score.speedY = 0;
      score.y = paddle.y + centerDistance;
    }
  }

  function ballWallCollision (obj){
    if (obj.y > BOARD_HEIGHT - BALL_HEIGHT){
      obj.speedY = -obj.speedY;
    }
    if (obj.y < 0){
      obj.speedY = -obj.speedY;
    }
    if (obj.x > BOARD_WIDTH - BALL_WIDTH){
      obj.speedX = -obj.speedX;
      resetBall(ball);
      scoreL = scoreL + 1;
    }
    if (obj.x < 0){
      obj.speedX = -obj.speedX;
      resetBall(ball);
      scoreR = scoreR + 1;
    }
  }

  function doCollide (ball ,paddle){
    if (ball.x < paddle.x + PADDLE_WIDTH && ball.x > paddle.x - PADDLE_WIDTH && ball.y < paddle.y + PADDLE_HEIGHT && ball.y > paddle.y){
      ball.speedX = -ball.speedX * 1.1;
    }
  }
 
  function resetBall (ball){
    ball.x = (BOARD_WIDTH - BALL_WIDTH) / 2;
    ball.y = (BOARD_HEIGHT - BALL_HEIGHT) / 2;
    ball.speedX = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -3 : 1);
    ball.speedY = (Math.random() > 0.5 ? -3 : 1);
  }
  
  // handle what happens when someone wins
  // handle resetting the game

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
