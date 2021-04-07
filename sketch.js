var starImg,bgImg;
var star, starBody;
//create variable for fairy sprite and fairyImg
var fairy,fairyImg,fairys;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	starImg = loadImage("star.png");
	bgImg = loadImage("starNight.png");
	//load animation for fairy here

	fairyImg = loadAnimation("fairyimage1.png","fairyimage2.png");
	fairys = loadSound("JoyMusic.mp3");
}

function setup() {
	createCanvas(800, 750);

	//write code to play fairyVoice sound
fairys.play();

	//create fairy sprite and add animation for fairy
fairy = createSprite(100,580);
fairy.addAnimation("fairy",fairyImg);
fairy.scale = 0.2;
fairy.velocityX = 0;

	star = createSprite(650,30);
	star.addImage(starImg);
	star.scale = 0.2;


	engine = Engine.create();
	world = engine.world;

	starBody = Bodies.circle(650 , 30 , 5 , {restitution:0.5, isStatic:true});
	World.add(world, starBody);
	
	Engine.run(engine);
fairy.setCollider("rectangle",100,250,900,700,0);
	fairy.debug = false;

}


function draw() {
  background(bgImg);

  star.x= starBody.position.x 
  star.y= starBody.position.y 

  

  //write code to stop star in the hand of fairy
  if(star.y > 550 && starBody.position.y > 550 && star.isTouching(fairy)){
	  Matter.Body.setStatic(starBody,true);
  }
  stroke("white");
  
text("TO STOP THE STAR YOU WANT TO TOUCH THE STAR WITH FAIRY",200,200);
  drawSprites();

}

function keyPressed() {

	if (keyCode === DOWN_ARROW) {
		Matter.Body.setStatic(starBody,false); 
	}

	//write code to move fairy left and right 
	if(keyCode === RIGHT_ARROW){
		fairy.x = fairy.x + 35;
	}
	if(keyCode === LEFT_ARROW){
		fairy.x = fairy.x - 35;
	}
	
	
}
