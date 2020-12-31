var fedTime,feed, addFood,dog,dogImg, happyDog, database, foodS, foodStock, food;

function preload()
{
  dogImg = loadImage("images/Dog.png");
  happyDog = loadImage(" images/happydog.png");
}

function setup() {
  createCanvas(700, 700); 
  database = firebase.database(); 
  dog = createSprite(350,350,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.7;
  food = new Food();
  food.getFoodStock();

  feed = createButton("Feed the Dog");
  feed.position(600,95);
  
  addFood=createButton("Add Food");
  addFood.position(700,95);
 

}




function draw() {  

  background(46,139,87);

  var fedTime=database.ref('Feedtime');
  fedTime.on("value", function(data){
    food.lastFed=data.val();
  });
  fill("white");
  textSize(30)
  if(food.lastFed>=12){
    text("Last Feed : "+food.lastFed%12+"PM", 350, 30);
  }else if(food.lastfed===0){
    text("Last Feed : 12AM", 350, 30);
  }else{
    text("Last Feed : "+food.lastFed+" AM", 350, 30);
  }

  food.display();
  feed.mousePressed(feedDog);  
  addFood.mousePressed(addFoods);



 

  drawSprites();
  fill("white");
  textSize(30);
  //text("Note: Press UP_ARROW Key to fead The dog Milk ", 20, 30);
  text("FoodStock: "+food.foodStock, 20,70 );
  
}
function feedDog(){
  if(food.foodStock<=0){
    food.foodStock = 0;
  }else{
    food.foodStock = food.foodStock-1;
  }

 
 
  food.updateStock(food.foodStock);
  dog.addImage(happyDog);
 
  
  
}
function addFoods(){
  food.foodStock++;

}
