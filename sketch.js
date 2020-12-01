var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var PLAY=1;
var END=0;
var gameState=PLAY;
var bckground, bckground0;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  
  monkey_collided=loadAnimation("sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bckground0=loadImage("background1.jpg");

}



function setup() {

  createCanvas(600, 300);

  monkey = createSprite(50, 180, 20, 50);
  monkey.addAnimation("gomonkey", monkey_running);
  monkey.scale = 0.1;
  
  
  bckground = createSprite(0, 0, 1200, 600);
  bckground.addImage("backdrop",bckground0);
  bckground.velocityX=-4;
  

  
  monkey.depth=bckground.depth+1;


  ground = createSprite(200, 280, 610, 5);
  ground.x = ground.width / 2


  obstaclesGroup = createGroup();
  foodGroup = createGroup();
  
  monkey.setCollider("rectangle", 0, 0, 400, monkey.height);
  monkey.debug = false
  
  ground.visible=false;
  
  score = 0;
}


function draw() {

  background("green");
  
    
  if (gameState === PLAY) {
  
    
  if (obstaclesGroup.isTouching(monkey)) {
    gameState=END;
  }

    

    if (keyDown("space") && monkey.y >= 240) {
      monkey.velocityY = -12;
    }
    score = score + Math.round(frameCount / 150);
    
     spawnFood();
    spawnObstacles();

  }
  
            if (bckground.x < 0) {
      bckground.x = bckground.width/2;
    }
  
  monkey.velocityY = monkey.velocityY + 0.8

  if (gameState === END) {
    bckground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    monkey.changeAnimation("end",monkey_collided)


  }
   
  



  monkey.collide(ground);

  drawSprites();
  
stroke("black");  
textSize(20);  
text("Survival Time: " + score, 400, 50);    
}



function spawnFood() {
  //write code here to spawn the clouds
  if (frameCount % 240 === 0) {
    banana = createSprite(600, 170, 30, 10);
    banana.addImage("photo", bananaImage);
    banana.scale = 0.5;
    banana.velocityX = -3;
  

    //assign lifetime to the variable
    banana.lifetime = 200;
    banana.scale = 0.1;




    //add each cloud to the group
    foodGroup.add(banana);
  }
}


function spawnObstacles() {
  //write code here to spawn the clouds
  if (frameCount % 120 === 0) {
    obstacle = createSprite(600, 250, 30, 30);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.5;
    obstacle.velocityX = -3;
    

    //assign lifetime to the variable
    obstacle.lifetime = 200;
    obstacle.scale = 0.1;



    //add each cloud to the group
    obstaclesGroup.add(obstacle);
  }
}

