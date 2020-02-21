const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
let vector;
let speed;

let spriteCounter = 0;

/* Create Unit of Measure */
const UOM = 32;

/* Load Images */
let bg = new Image();
bg.src = "custom/assets/bg2.png"

let sprite = new Image();
sprite.src = "custom/assets/patka-sprite.png"

const foodImg = new Image();
foodImg.src = "custom/assets/patka3.png"

/* Load audio files */

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

/* Create Snake */
let snake = [];
snake[0] = {
    x : 9 * UOM,
    y : 10 * UOM
}

/* Create food */
let food = {
    x : Math.floor(Math.random()*17+1) * UOM,
    y : Math.floor(Math.random()*15+3) * UOM,
}

/* Create score */
let score = 0;

/* Controls */
document.addEventListener("keydown", direction);

function direction(event){
    let key = event.keyCode
    if(key == 37 && vector != "RIGHT"){
        vector = "LEFT";
    }else if(key == 38 && vector != "DOWN"){
        vector = "UP";
    }else if(key == 39 && vector != "LEFT"){
        vector = "RIGHT";
    }else if(key == 40 && vector != "UP"){
        vector = "DOWN";
    }else if(key == 32){
        restart();
    }

}


/* Cheack collision function */
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

/* Draw on the canvas */
function draw(){

    spriteCounter = spriteCounter - 1

    ctx.drawImage(bg,0,0);

    for ( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0)? "#1d8cf8" : "#1d8cf8";
        ctx.fillRect(snake[i].x, snake[i].y, UOM, UOM);

        ctx.strokeStyle = "#171941";
        ctx.strokeRect(snake[i].x, snake[i].y, UOM, UOM);
    }

    ctx.drawImage(foodImg, food.x, food.y);
    ctx.drawImage(sprite,20,0);

    /* Current Snake position -> first tile */
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;


    /* Change direction */
    if (vector == "LEFT") snakeX -= UOM;
    if (vector == "UP") snakeY -= UOM;
    if (vector == "DOWN") snakeY += UOM;
    if (vector == "RIGHT") snakeX += UOM;

    /* If snake eats the food */
    if(snakeX == food.x && snakeY == food.y){
        score++;
        spriteCounter = 5;
        /* Create new food */
        food = {
            x : Math.floor(Math.random()*17+1) * UOM,
            y : Math.floor(Math.random()*15+3) * UOM,
        }
    }else{
        /* Snake does NOT eat food -> remove the tail */
        snake.pop();
    }

    /* Add new element to snake */
    let newHead = {
        x : snakeX,
        y : snakeY
    }

    if (spriteCounter>0){
        sprite.src = "custom/assets/patka-sprite2.png"
    }else{
        sprite.src = "custom/assets/patka-sprite.png"
    }


    
    /* Game Over */
    if(snakeX < UOM || snakeY > 17 * UOM || snakeX > 17*UOM || snakeY < 3 * UOM || collision(newHead,snake)){
        sprite.src = "custom/assets/patka-sprite3.png"
        ctx.drawImage(sprite,20,0);
        ctx.fillRect(1*UOM-2, 3*UOM-2, 17*UOM+4, 15*UOM+3);
        ctx.font = "30px Lato";
        ctx.fillStyle = "white";
        ctx.fillText("Kliknij, żeby zagrać", 5*UOM, 11*UOM); 
        /* dead.play(); */
        clearInterval(game);
    }

    snake.unshift(newHead);


    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 3.5*UOM, 1.8*UOM)
}

/* Game Loop  */
let game = setInterval(draw,90);

canvas.addEventListener('click', restart, false);

function restart(){
    clearInterval(game);

    vector = ""

    /* Create Snake */
    snake = [];
    snake[0] = {
        x : 9 * UOM,
        y : 10 * UOM
    }

    /* Create food */
    food = {
        x : Math.floor(Math.random()*17+1) * UOM,
        y : Math.floor(Math.random()*15+3) * UOM,
    }

    /* Create score */
    score = 0;

    game = setInterval(draw,90);    
}