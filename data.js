let cvs = document.getElementById("cvs");
let ctx = cvs.getContext("2d");
let dinosaurIMG = document.getElementById("dinosaur");
let cactusIMG = document.getElementById("cactus");
let bgIMG = document.getElementById("bg");

let timer;
let background; 
let dinosaur;
let cactus;
let W = cvs.width; H = cvs.height
let score = 0

class Background {
    constructor(){
        this.x = 0;
        this.y = 0;
    }
    draw() {
        ctx.drawImage(bgIMG, this.x, this.y, 600, 250)
    }
    update() {
        this.draw()
    }
}

class Dinosaur {
    constructor(){
        this.x = 20;
        this.y = 155;
        this.jumping = false;
        this.jumpSpeed = 2;
        this.highestJump = false;
    }
    draw() {
        ctx.drawImage(dinosaurIMG, this.x, this.y, 95, 80)
    }
    jump() {
        // up
        if(this.jumping && !this.highestJump && this.y > 50) {
            this.y -= this.jumpSpeed
        }
        // down
        else if (this.y < 155) {
            this.highestJump = true;
            this.y += this.jumpSpeed
        }
        // end
        else {
            this.highestJump = false;
            this.jumping = false;
        }
    }
    update() {
        this.draw()
        this.jump()
    }
}

class Cactus{
    constructor() {
        this.x = W
        this.y = 185;
        this.speed = 2
    }
    draw() {
        ctx.drawImage(cactusIMG, this.x, this.y, 50, 50)
    }
    score() {
        if(this.x == -40) {
            score++
        }
        ctx.fillStyle = "black"
        ctx.font = "bold 18px Courier"
        ctx.fillText("Score: " + score, 60, 30)
    }
    moveLoop(){
        if(this.x > -50 ) {
            this.x -= this.speed
        } else {
            this.x = W
        }
    }
    update() {
        this.draw()
        this.score()
        this.moveLoop()
    }
}

function isCollision() {
    if(
        dinosaur.x < cactus.x &&
        dinosaur.x + 40 > cactus.x &&
        dinosaur.y + 80 > cactus.y
    ){
        restartGame()
    }
}

function loop() {
    ctx.clearRect(0, 0, W, H)
    background.update()
    cactus.update()
    dinosaur.update()
    isCollision()
}

function startGame() {
    timer = setInterval(loop, 2.5)
    background = new Background()
    dinosaur = new Dinosaur()
    cactus = new Cactus()
}

function restartGame() {
    clearInterval(timer)
    addEventListener('keydown', startGame, {once: true})
    score = 0

    ctx.fillStyle = "black"
    ctx.textAlign = "center"
    ctx.font = "bold 30px Courier"
    ctx.fillText("GAME OVER", W/2, H/2)

    ctx.font = "bold 18px Courier"
    ctx.fillText("Press any key to restart", W/2, H/2 + 30)
}

addEventListener("keydown", function(){
    if(!dinosaur.jumping){
        dinosaur.jumping = true
    }
})

startGame()