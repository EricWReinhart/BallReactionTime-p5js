// Reaction game where several moving balls will appear on the screen, and you must hover over all of the green ones as fast as possible. If you hover over a red one or all of the balls go out of bounds, then you lose. If you successfully hover over all of the green ones, then you win!
// Inspiration for implementing balls from https://editor.p5js.org/etalmage/sketches/NnNbCKQ44

var balls = [];
var numBalls = 6; // adjust number of balls here
var numGreenBalls = 0;
var xMouse;
var yMouse;

function setup() {
  createCanvas(500, 500);
  
  // Create a list of balls & count number of green ones
  for (var ballNum = 0; ballNum < numBalls; ballNum++) {
  	balls[ballNum] = new Ball();  
    if (balls[ballNum].green == 255) {
      numGreenBalls +=1;
    }
  }
}

function draw() {
  background(100);
  
  // Loop through all balls and check if you win or lose
  for (var ballNum = 0; ballNum < balls.length; ballNum++) {
    var currBall = balls[ballNum];
    currBall.display();
    currBall.moveBall();
    
    // If a red ball is clicked, you lose
    if (currBall.isClicked() && currBall.ballColor == red) {
      lose();
    }
    
    // If every green ball is clicked, you win
    else if (currBall.isClicked() && currBall.ballColor == green) {
      
      // Check that the number of green balls clicked equals the total number of green balls
      var numBallsClicked = 0;
      for (var ballNum2 = 0; ballNum2 < balls.length; ballNum2++) {
        if (balls[ballNum2].hasBeenClicked && balls[ballNum2].green == 255) {
          numBallsClicked +=1;
        }
      
        if (numBallsClicked == numGreenBalls) {
          win()
        }
      }
    } 
  }
  
  
  // Player loses if all balls are out of bounds
  for (var ballNum = 0; ballNum < balls.length; ballNum++) {
    if (!checkOutOfBounds(balls[ballNum])) {
      break;
    }
    if (checkOutOfBounds(balls[ballNum]) && ballNum == balls.length - 1) {
      lose();
    }
  }
  
  // Returns true if all balls are out of bounds
  function checkOutOfBounds(ball) {
    if (ball.ballX < -50 || ball.ballX > 550 || ball.ballY < -50 || ball.ballY > 550) {
      return true;
    }
  }
  
  // Hides all balls
  function hideAllBalls() {
    for (var ballNum = 0; ballNum < balls.length; ballNum++) {
      balls[ballNum].undisplay();
    }
  }
  
  // Handles losing
  function lose() {
    hideAllBalls();
    background(0,0,0);
    textSize(60);
    text("You lose!", 125, 250);
    noLoop();
  }
  
  // Handles winning
  function win() {
    hideAllBalls();
    background(0, 0, 255);
    textSize(60);
    text("You win!", 125, 250);
    noLoop();
  }
}

// Handles Ball objects
class Ball {
  constructor() {
    // Set initial position, speed and size of balls
    this.setPositionSpeedSize()
    
    // Color the balls
    this.setColors()
  }
  
  // Setup for a ball
  setPositionSpeedSize() {
    this.ballX = (250,250)
    this.ballY = (250,250)
  
    this.speedX = random(-2, 2);
    this.speedY = random(-3, 3);
    this.size = 70;
    
    this.hasBeenClicked = false;
  }
  
  // All balls are green by default but a few of them will be red instead
  setColors() {
    this.ballColor = green;
    this.red = 0;
    this.green = 255;
    this.blue = 0;
    
    if (random(0,8) > 4) {
      this.ballColor = red;
      this.red = 255;
      this.green = 0.
    }
  }
  
  // Display the balls on screen
  display() {
    fill(this.red, this.green, this.blue);
    ellipse(this.ballX, this.ballY, this.size);
  }
  
  // Hide the balls on screen
  undisplay() {
    ellipse(this.ballX, this.ballY, 0);
  }

  // Move the balls
  moveBall() {
    this.ballX += this.speedX;
  	this.ballY += this.speedY;
  }
  

  // Return true if a ball is clicked 
  isClicked() {
    // source for getting coordinates of a mouse click: https://stackoverflow.com/questions/7790725/javascript-track-mouse-position
       (function() {
    document.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
        var eventDoc, doc, body;
        event = event || window.event;
        xMouse = event.clientX;
        yMouse = event.clientY;
    }
    })();
    
     // source for calculating if the mouse is inside of a ball: https://stackoverflow.com/questions/16792841/detect-if-user-clicks-inside-a-circle
    // (a,b) is current point, (c, d) is circle center, radius is circle radius
    var [a,b,c,d,radius] = [xMouse, yMouse, this.ballX, this.ballY, this.size / 2];
    var distancesquared = (a - c) * (a - c) + (b - d) * (b - d);
    if (distancesquared <= radius * radius) {
        this.hasBeenClicked = true;
    }
    return this.hasBeenClicked;
  } 
}

