var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;
var obstacle1img,obstacle2img,obstacle3img;
var obstacle1,obstacle2,obstacle3;

var pinkCG, yellowCG,redCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  oppPink1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
  oppPink2Img = loadAnimation("images/opponent3.png");
  
  oppYellow1Img = loadAnimation("images/opponent4.png","images/opponent5.png");
  oppYellow2Img = loadAnimation("images/opponent6.png");
  
  oppRed1Img = loadAnimation("images/opponent7.png","images/opponent8.png");
  oppRed2Img = loadAnimation("images/opponent9.png");
  
  obstacle1img = loadAnimation("images/obstacle1.png");
  obstacle2img = loadAnimation("images/obstacle2.png");
  obstacle3img = loadAnimation("images/obstacle3.png");
  
  cycleBell = loadSound("sound/bell.mp3");
  gameOverImg = loadImage("images/gameOver.png");
 
  

 
}

function setup(){
  
createCanvas(1200,300);
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
//set collider for mainCyclist

  
gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
  obstacle1G = new Group();
  obstacle2G = new Group();
  obstacle3G = new Group();
  
   mainCyclist.setCollider("circle",0,0,500);
  mainCyclist.debug = false;
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    //code to play cycle bell sound
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,3));

  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else {
      redCyclists();
    }
  }
    
    var select_Oo = Math.round(random(1,5));
    if(World.frameCount % 250 == 0){
      if(select_Oo == 1){
        spawnO1();
      }else if(select_Oo == 2){
        spawnO2();
      }else{
        spawnO3();
      }
    }
    
   
  
   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
      obstacle1G.setVelocityXEach(0);
  obstacle2G.setVelocityXEach(0);
  obstacle3G.setVelocityXEach(0);
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
      obstacle1G.setVelocityXEach(0);
  obstacle2G.setVelocityXEach(0);
  obstacle3G.setVelocityXEach(0);
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
       obstacle1G.setVelocityXEach(0);
  obstacle2G.setVelocityXEach(0);
  obstacle3G.setVelocityXEach(0);
    }
    
    if(mainCyclist.isTouching(obstacle1G)){
      gameState = END;
      obstacle1G.velocityX = 0;
     mainCyclist.addAnimation("SahilRunning",mainRacerImg2);

    }
    
    if(mainCyclist.isTouching(obstacle2G)){
      gameState = END;
      obstacle2G.velocityX = 0;
  
    }
    
     
    if(mainCyclist.isTouching(obstacle3G)){
      gameState = END;
      obstacle3G.velocityX = 0;
     mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
    
    }
    
    
}else if (gameState === END) {
   
   gameOver.visible = true;
    //Add code to show restart game instrution in text here
   text("PRESS UP ARROW  TO RESTART THE GAME",450,200);
  
    //Add code to show restart game instrution in text here

  
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
  
  obstacle1G.setVelocityXEach(0);
    obstacle1G.setLifetimeEach(-1);
  
  obstacle2G.setVelocityXEach(0);
    obstacle2G.setLifetimeEach(-1);
  
  obstacle3G.setVelocityXEach(0);
    obstacle3G.setLifetimeEach(-1);
  
  
    //write condition for calling reset( )
  if(keyDown("UP_ARROW")){
    reset();
  }
}
}

function pinkCyclists(){
        player1 =createSprite(1250,Math.round(random(50, 250)));
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
 
}

function yellowCyclists(){
        player2 =createSprite(1250,Math.round(random(50, 250)));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);

}

function redCyclists(){
        player3 =createSprite(1250,Math.round(random(50, 250)));
        player3.scale =0.06;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);

}

function spawnO1(){
  obstacle1 =createSprite(1250,Math.round(random(50, 250)));
        obstacle1.scale =0.09;
        obstacle1.velocityX = -(6 + 2*distance/150);
        obstacle1.addAnimation("obstacles",obstacle1img);
        obstacle1.setLifetime=170;
        obstacle1G.add(obstacle1);
}
function spawnO2(){
  obstacle2 =createSprite(1250,Math.round(random(50, 250)));
        obstacle2.scale =0.09;
        obstacle2.velocityX = -(6 + 2*distance/150);
        obstacle2.addAnimation("obstacles",obstacle2img);
        obstacle2.setLifetime=170;
        obstacle2G.add(obstacle2);
}

function spawnO3(){
  obstacle3 =createSprite(1250,Math.round(random(50, 250)));
        obstacle3.scale =0.09;
        obstacle3.velocityX = -(6 + 2*distance/150);
        obstacle3.addAnimation("obstacles",obstacle3img);
        obstacle3.setLifetime=170;
        obstacle3G.add(obstacle3);
}


//create reset function here
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  pinkCG.destroyEach();
  redCG.destroyEach();
  yellowCG.destroyEach();
  distance = 0;
  
  obstacle1G.destroyEach();
  obstacle2G.destroyEach();
  obstacle3G.destroyEach();
} 
