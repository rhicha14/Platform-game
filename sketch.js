
var runner;
var runningAnimation;
var jumpingAnimation;
var gameBackground;
var platformBackground;
var gameFont;
var ground;
var gameOverMusic;
var jumpSound;
var gameOver = false;
var platformsGroup;
var currentPlatformLocation; //= -width;
var gravity = 1;
var jumpPower = 15;
var runnerSpeed = 15;
var currentBackgroundTilePosition;
var backgroundTiles;
var obstacle, obstacleImage;
var obstacleGroup;
var playerScore = 0;
var gameMusic ;



 

function preload(){
gameBackground = loadImage('https://la-wit.github.io/build-an-infinite-runner/build/images/environments/defaultBackground.png');
platformBackground = loadImage('https://la-wit.github.io/build-an-infinite-runner/build/images/environments/defaultPlatform.png');
gameFont = loadFont('https://la-wit.github.io/build-an-infinite-runner/build/fonts/ARCADE_R.TTF');
gameFont = loadFont('https://la-wit.github.io/build-an-infinite-runner/build/fonts/ARCADE_R.TTF');
gameMusic = loadSound('Hypnotic-Puzzle.mp3');
gameOverMusic = loadSound('game-over-piano-sound-effect.mp3');
jumpSound = loadSound("maro-jump-sound-effect_1.mp3");

jumpingAnimation = loadAnimation('Jump__000.png','Jump__001.png','Jump__002.png','Jump__003.png','Jump__004.png','Jump__005.png', 
  'Jump__006.png','Jump__007.png','Jump__008.png','Jump__009.png'
  );
runningAnimation = loadAnimation( 'Run__001.png','Run__002.png','Run__003.png','Run__004.png', 
  'Run__005.png','Run__006.png','Run__007.png','Run__008.png','Run__009.png');
}

function setup() {
createCanvas(840,390);
runner = createSprite(50,200,25,40);
runner.scale=0.2;
runner.depth = 4;

runner.addAnimation('jump', jumpingAnimation);
runner.addAnimation('run', runningAnimation);
runner.setCollider("rectangle", 0,0,10,41);
gameMusic.loop = true;
gameMusic.play();

platformsGroup = new Group();
currentPlatformLocation = -width;
currentBackgroundTilePosition = -width;
backgroundTiles = new Group();
obstaclesGroup = new Group();


}

function draw() {
  if(!gameOver){
    

    background(200);
   
    addNewPlatforms();
    runner.collide(platformsGroup, solidGround);
    jumpDetection();
    runner.velocity.y += gravity;
    runner.velocity.x = runnerSpeed;
    camera.position.x = runner.position.x + 300;
    removeOldPlatforms();
    addNewBackgroundTiles();
    removeOldBackgroundTiles();
    fallCheck();
    //spawnObstacles();
    //hitObstacle();
    
    drawSprites();
    }
  updateScore();
  

  if(gameOver){
    gameOverText();
    updateSprites(false);
    if(keyDown(UP_ARROW)){
       newGame();
}

  }

}

function addNewPlatforms(){
  if(platformsGroup.length < 5){
    var currentPlatformLength = 1132;
    var platform = createSprite((currentPlatformLocation * 1.3), random(300,400), 1132, 336);
    platform.collide(runner);
    currentPlatformLocation += currentPlatformLength;
    platform.addAnimation('default', platformBackground);
    platform.depth = 3;
    platformsGroup.add(platform);
  }
  
}

function solidGround(){
  runner.velocity.y = 0;
  runner.changeAnimation("run");
  if(runner.touching.right){
    runner.velocity.x = 0;
    runner.velocity.y+= 30;
  }
}

function jumpDetection(){
  if(keyWentDown("space")){
    runner.changeAnimation("jump");
    runner.animation.rewind();
    runner.velocityY = -jumpPower;
  }
}

function removeOldPlatforms(){
  for(var i = 0; i < platformsGroup.length; i++){
      if((platformsGroup[i].position.x) < runner.position.x-width){
        platformsGroup[i].remove();
    }
  }
}

function addNewBackgroundTiles(){
  if(backgroundTiles.length < 3){
    currentBackgroundTilePosition += 839;
    var bgLoop = createSprite(currentBackgroundTilePosition, height/2, 840, 390);
    bgLoop.addAnimation('bg', gameBackground);
    bgLoop.depth = 1;
    backgroundTiles.add(bgLoop);
  }
}

function removeOldBackgroundTiles(){
  for(var i = 0; i < backgroundTiles.length; i++){
      if((backgroundTiles[i].position.x) < runner.position.x-width){
        backgroundTiles[i].remove();
    }
  }
}

  
function fallCheck(){
  if(runner.position.y > height){
      gameOver = true;
    gameMusic.stop();
  gameOverMusic.play();
    }
  
}

function gameOverText(){
    background(0,0,0,10);
    fill('white');
    stroke('black')
    textAlign(CENTER);
    textFont(gameFont);

    strokeWeight(2);
    textSize(90);
    strokeWeight(10);
    text("GAME OVER", camera.position.x, camera.position.y);

    textSize(15);
    text("Jump to try again", camera.position.x, camera.position.y + 100);
    textSize(20);
    text("You ran " + playerScore + ' yards!', camera.position.x,       camera.position.y + 50);
}

function newGame(){
  playerScore = 0;
  platformsGroup.removeSprites();
  backgroundTiles.removeSprites();
  gameOver = false;
  updateSprites(true);
  runnerSpeed = 15;
  runner.position.x = 50;
  runner.position.y = 100;
  runner.velocity.x = runnerSpeed;
  currentPlatformLocation = -width;
  currentBackgroundTilePosition = -width;
  //gameOverMusic.stop();
  gameMusic.play();
}

function updateScore(){
  if(frameCount % 60 === 0){
    playerScore++;
  }
  fill('white');
  textFont(gameFont);
  strokeWeight(2);
  stroke('black');
  textSize(20);
  textAlign(CENTER);
  text(playerScore, camera.position.x + 350, camera.position.y + 160);
}

