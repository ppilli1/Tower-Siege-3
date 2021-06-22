const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var engine, world;
var gameState = "OnSling";
var ground1;
var backgroundImg,platform;
var polygon_img, polygon, slingShot;

var bg;
var score = 0;

function preload(){
  polygon_img = loadImage("hexagon.png");
  getBackgroundImg();
}

function setup() {
	var canvas = createCanvas(800, 400);

	engine = Engine.create();
	world = engine.world;

  ground1 = new Ground(400,height,800,20);
  ground2 = new Ground(125,380,150,20);
  ground3 = new Ground(500,200,120,20);
  
  //level 1 - First Pyramid
	block1 = new Box(50,360);
	block2 = new Box(80,360);
	block3 = new Box(110,360);
	block4 = new Box(140,360);
  block5 = new Box(170,360);
  
  //level2 - First Pyramid
  block6 = new Box(80,320);
  block7 = new Box(110,320);
  block8 = new Box(140,320);

  //level3 - First Pyramid
  block9 = new Box(110,280);

  //level1 - Second Pyramid
  block10 = new Box(455,180);
  block11 = new Box(485,180);
  block12 = new Box(515,180,30,40);

  //level2 - Second Pyramid
  block13 = new Box(485,140);

  polygon = Bodies.circle(100,100,20,{restitution:0.5,friction:0.5,density:0.3});
  World.add(world,polygon)

  slingShot = new SlingShot(polygon,{x:100,y:100});
	
	
	//Create the Bodies Here.
	Engine.run(engine);
  
}


function draw() {
  if(backgroundImg){
    background(backgroundImg);
  }

  noStroke();
  textSize(35)
  fill("white")
  text("Score  " + score, width-300, 50)

  rectMode(CENTER);
  //background(255,255,255);
  fill("white");
  text(mouseX + ":" + mouseY, 400,100)

  imageMode(CENTER)
  image(polygon_img,polygon.position.x,polygon.position.y,40,40);

  
  ground1.display();
  ground2.display();
  ground3.display();
  //tree.display();
  
  block1.display();
  block2.display();
  block3.display();
  block4.display();
  block5.display();
  block6.display();
  block7.display();
  block8.display();
  block9.display();
  block10.display();
  block11.display();
  block12.display();
  block13.display();
  slingShot.display();
  
  drawSprites();
 
}
function mouseDragged(){
  if (gameState!=="launched"){
      Matter.Body.setPosition(polygon, {x:mouseX,y:mouseY});
  }
}

function mouseReleased(){
  slingShot.fly();
  gameState = "launched";
}

function keyPressed(){
  if(keyCode === 32){
      slingShot.attach(polygon);
      gameState = "OnSling";
  }
}

async function getBackgroundImg(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/America/New_York");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);
  
  if(hour>=06 && hour<=19){
      bg = "bg1.png";
  }
  else{
      bg = "bg2.jpg";
  }
  backgroundImg = loadImage(bg);
}