var dog,sadDog,happyDog,database,foodS,foodStock,lastFed,foodObj,fedTime,feed,addFood,garden;


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
  MilkImg = loadImage("Images/MilkImage.png");
  garden = loadImage("Images/garden.jpg");
}

function setup() {
  database = firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(850,250,150,150);
  dog.addImage(sadDog);
  dog.scale=0.25;

  feed = createButton("Feed Drago");
  feed.position(700,395);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,395);
  addFood.mousePressed(addFoods);  

}

function draw() {
  background(garden);

  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })

  fill("red");
  textSize(40);
  text("DRAGO",780,370);

  fill("red");
  stroke("black");
  rect(340,0,250,40);
  rect(596,309,80,30);
  rect(496,309,90,30);

  

  fill(206,0,9);
  noStroke();
  textSize(30);
  if(lastFed>=12){
    fill("black");
    text("Last Fed : "+ lastFed%12 +"PM",350,30);
  }else if(lastFed==0){
    fill("black");
    text("Last Fed : 12 AM",350,30);
  }else{
    fill("black");
    text("Last Fed : "+ lastFed +"AM",350,30);
  }
   
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS ++;
  database.ref('/').update({
    Food:foodS
  })
}