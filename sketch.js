let stretchy, floor;
let count = 0;
let MARGIN = 10;
let screen = 0;
let initialize = true;
let sound;
let cnv;
let timeCounter = 0;
let levelSpeed = -1;
let playBtnCounter = true;
let replayBtnCounter = true;
let nextScreenBtn;
let nameInput;
let button;
let mydiv;

function preload() {
  soundFormats("mp3");
  game_over_sound = loadSound("./assets/game_over.mp3");
  // inconsolata = loadFont('font.ttf');

  // bounce_sound = loadSound('bounce.wav');
}

function setup() {
  cnv = createCanvas(400, 400);
  mydiv = createDiv();
  // cnv.parent("mydiv");
}

function draw() {
  if (screen == 0) {
    startScreen();
  } else if (screen == 1) {
    gameOn();
    // if the screen variable was changed to 2, show the game over screen
  } else if (screen == 2) {
    gameOver();
  }
}

function changeScreen() {
  if (screen == 0) {
    screen = 1;
    nextScreenBtn.remove();
    playBtnCounter = true;
  } else if (screen == 2) {
    initialize = true;
    screen = 0;
    nameInput.remove();
    button.remove();
    replayBtnCounter = true;
  }
}

function startScreen() {
  background("#e4f1f7");
  fill("black");
  textSize(32);
  timeCounter = 0;
  levelSpeed = -1;
  textAlign(CENTER);
  textLeading(45);
  // let time = millis();
  // rotateX(time / 10);
  // rotateZ(time / 1234);
  // text('p5.js', 0, 0);
  // textFont(inconsolata);
  text("Levels Game!", width / 2, height / 2);
  textSize(18);
  if (playBtnCounter) {
    nextScreenBtn = createButton("Play");
    // nextScreenBtn.parent("mydiv");

    nextScreenBtn.position(0, 0, "relative");
    nextScreenBtn.mouseClicked(changeScreen);
    playBtnCounter = false;
  }
}

function clearCanvas() {
  rect(0, 0, canvas.width, canvas.height);
  background("white");
}

function gameOn() {
  let items = new Group();
  let x_pos = random(0, 400);

  background("gray");
  text("Counter: " + timeCounter, width / 2, 20);

  for (let s of allSprites) {
    if (s.x < -MARGIN) s.x = width + MARGIN;
    if (s.x > width + MARGIN) s.x = -MARGIN;
  }

  if (initialize) {
    world.gravity.y = 20;
    face = loadImage("./assets/face.png");
    stretchy = new Sprite();
    stretchy.draw = () => {
      fill(237, 205, 0);

      push();
      rotate(stretchy.direction);
      ellipse(0, 0, 70 + stretchy.speed, 70 - stretchy.speed);
      pop();

      image(face, stretchy.vel.x, stretchy.vel.y);

      if (kb.pressing("left")) {
        stretchy.vel.x = -5;
      } else if (kb.pressing("right")) {
        stretchy.vel.x = 5;
      } else {
        stretchy.vel.x = 0;
      }
    };
    floor = new items.Sprite(width / 2, 400, 200, 10);
    floor.collider = "static";
    floor.collider = "k";
    floor.velocity.y = -1;
    initialize = false;
  }

  // end game criteria
  if (stretchy.y > height || stretchy.y < 0) {
    screen = 2;
  }

  // spawn pipes every 120 frames (2 second)
  if (frameCount % 120 == 2) {
    print("timeCounter: " + timeCounter);
    if (levelSpeed > -2) {
      // levelSpeed -= 0.1;
      print("levelSpeed: " + levelSpeed);
    }
    timeCounter++;
    // Sprite ( [x]  [y]  [width]  [height]  [colliderType] )
    // Add a floor
    floor = new items.Sprite(x_pos, 400, 200, 10);
    floor.collider = "k";
    floor.velocity.y = levelSpeed;
  }

  // get rid of passed pipes
  for (let item of items) {
    if (item.y < 0) {
      item.remove();
    }
  }
}

function gameOver() {
  // clear();
  allSprites.remove();
  if (sound == true) {
    game_over_sound.play();
    sound = false;
  }
  background("#fce6e6");
  text("Counter: " + timeCounter, width / 2, 20);
  fill("black");
  textAlign(CENTER);
  textSize(32);
  textLeading(45);
  text("Game over :(", width / 2, height / 2);
  text("Enter your name", width / 2, height / 2 + 40);

  textSize(18);

  if (replayBtnCounter) {
    // console.log(replayBtnCounter);
    nameInput = createInput();
    nameInput.position(0, 0, "relative");
    button = createButton("submit");
    button.position(160, 0, "relative");
    // console.log(screen);

    button.mouseClicked(changeScreen);
    replayBtnCounter = false;
    // console.log(replayBtnCounter);
  }
}

function enter(score) {
  changeScreen();
  sendMessage(score);
}
