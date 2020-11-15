
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground
var invisibleGround
var PLAY=1;
var END=0;
gameState=PLAY;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600)
  ground=createSprite(300,500,800,10)
  ground.velocityX=-4;
 
  
  
  monkey=createSprite(50,450,20,20)
  monkey.addAnimation("running",monkey_running)
  monkey.scale=0.1;
  monkey.debug=true;
  
  
  invisibleGround=createSprite(300,510,600,10)
  invisibleGround.visible=false;
  
  obstacleGroup=createGroup();
  foodGroup=createGroup();
  score=0;
}  


function draw() {
background("white");
    textFont("Times New Roman")
  textStyle(BOLD)
  textSize(15)
  text("Score: "+ score, 450,50);
  
  
  if(gameState===PLAY){
 monkey.collide(invisibleGround) ;
    if(ground.x<0){
      ground.x=300
    }
     ground.x=ground.width/2;
 obstacles();
    banana();
    if(mouseIsPressed===true&& monkey.y>=400) {
      monkey.velocityY=-15;
  
    }
        monkey.velocityY= monkey.velocityY+0.8
    
    if(obstacleGroup.isTouching(monkey)){
      gameState=END;
    }
    
    if(foodGroup.isTouching(monkey)){
      score=score+1;
      foodGroup.destroyEach();
    }
    
  }
  
  if(gameState===END){
    textSize(30);
    fill("black");
    text('Game Over',200,300)

    
    
    obstacleGroup.destroyEach();
    monkey.destroy();
    ground.destroy();
 
       
  }
  
  drawSprites();
}

function obstacles(){
  if(frameCount%160===0){
    var obstacle=createSprite(500,450,200,200)
    obstacle.addImage(obstacleImage)
    obstacle.velocityX=-5
    obstacle.scale=0.25;
    obstacleGroup.add(obstacle);
    
    obstacle.setCollider('circle',10,0,150)
   
    
  }
  
  }

function banana(){
  if(frameCount%90===0){
    var banana=createSprite(600,Math.round(random(200,400)),20,20)
    banana.addImage(bananaImage)
    banana.velocityX=-8;
    banana.scale=0.1
    foodGroup.add(banana)
  }
}






