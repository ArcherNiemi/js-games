const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
var rect = canvas.getBoundingClientRect();

const WIDTH = 800;
const HEIGHT = 500;

canvas.width = WIDTH;
canvas.height = HEIGHT;

const PLAYER_SPEED = 4;
const GRAVITY = 0.6;
const MAX_SPEED = 12;
const JUMP_STRENGTH = 10;

const keysPressed = {};

const PLAYER_WIDTH = 20;
const PLAYER_HEIGHT = 40;

const DASH_SPEED = 8;
const DASH_LENGTH = 12;
const DASH_SLOWDOWN = 2;
const DASH_COOLDOWN = 12;
const DASH_COOLDOWN_TIME = DASH_LENGTH + DASH_COOLDOWN + DASH_SPEED/DASH_SLOWDOWN;
const DASH_ADDITIONAL_SPEED = 2;
const DASH_AIR_COOLDOWN = 20;
const DASH_AIR_COOLDOWN_TIME = DASH_LENGTH + DASH_AIR_COOLDOWN + DASH_SPEED/DASH_SLOWDOWN;

const SMOOTHING = 10;

class Player{
    constructor(x,y,width,height, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.verticalSpeed = 0;
        this.dashSpeed = 0;
        this.timeAfterDash = 0;
        this.grounded = false;
        this.directionFacing = "right";
    }

    jump(){
        this.verticalSpeed = JUMP_STRENGTH;
        this.grounded = false;
    }

    updateMovement(){
        this.updateX();
        this.updateY();
        if(keysPressed[" "] && this.grounded){
            this.jump();
        }
    }

    updateX(){
        if(this.dashSpeed == 0){
            if(keysPressed["ArrowLeft"]){
                this.x -= PLAYER_SPEED;
                this.directionFacing = "left";
            } else if(keysPressed["ArrowRight"]){
                this.x += PLAYER_SPEED;
                this.directionFacing = "right";
            }
        } else {
            if(keysPressed["ArrowLeft"]){
                this.x -= DASH_ADDITIONAL_SPEED;
                this.directionFacing = "left";
            } else if(keysPressed["ArrowRight"]){
                this.x += DASH_ADDITIONAL_SPEED;
                this.directionFacing = "right";
            }
        }

        this.x += this.dashSpeed;

        if(this.grounded){
            var currentDashCooldown = DASH_COOLDOWN_TIME;
        } else {
            var currentDashCooldown = DASH_AIR_COOLDOWN_TIME;
        }
        if(dashUnlocked && keysPressed["x"] && this.dashSpeed <= 0 && this.timeAfterDash >= currentDashCooldown){
            if(this.directionFacing == "left"){
                this.dashSpeed = -DASH_SPEED;
                this.timeAfterDash = 0;
            } else {
                this.dashSpeed = DASH_SPEED;
                this.timeAfterDash = 0;
            }
        }

        this.timeAfterDash += 1;
        if(this.dashSpeed != 0){
            this.verticalSpeed = 0;
            if(this.timeAfterDash > DASH_LENGTH){
                if(this.dashSpeed > 0){
                    this.dashSpeed -= DASH_SLOWDOWN;
                } else {
                    this.dashSpeed += DASH_SLOWDOWN;
                }
            }
        }

        var collisions = checkCollisions();
        if(collisions.length > 0){
            for(let i = 0; i < collisions.length; i++){
                var collision = collisions[i];
                var leftWallIn = (this.x + this.width) - collision.x;
                var rightWallIn = (collision.x + collision.width) - this.x;

                var minOverlap = Math.min(leftWallIn, rightWallIn);

                if (minOverlap == leftWallIn) {
                    this.x = collision.x - this.width;
                } else if (minOverlap == rightWallIn) {
                    this.x = collision.x + collision.width;
                }
            }
        }
    }

    updateY(){
        if(keysPressed[" "]){
            this.verticalSpeed -= GRAVITY / 2;
        } else {
            this.verticalSpeed -= GRAVITY;
        }

        if (this.verticalSpeed > MAX_SPEED){
            this.verticalSpeed = MAX_SPEED;
        } else if(this.verticalSpeed < -MAX_SPEED){
            this.verticalSpeed = -MAX_SPEED;
        }

        if(this.dashSpeed == 0){
            this.y -= this.verticalSpeed;
        }

        var collisions = checkCollisions();
        if(collisions.length > 0){
            for(let i = 0; i < collisions.length; i++){
                var collision = collisions[i];
                var upWallIn = (this.y + this.height) - collision.y
                var downWallIn = (collision.y + collision.height) - this.y;

                var minOverlap = Math.min(upWallIn, downWallIn);

                if (minOverlap == upWallIn) {
                    this.y = collision.y - this.height;
                    if(this.verticalSpeed < 0){
                        this.verticalSpeed = 0;
                        this.grounded = true;
                    }
                } else if (minOverlap == downWallIn) {
                    this.y = collision.y + collision.height;
                    if(this.verticalSpeed > 0){
                        this.verticalSpeed = 0;
                    }                
                }
            }
        }
        if(this.verticalSpeed != 0){
            this.grounded = false;
        }
    }
    respawn(){
        player.x = screen.respawn.x;
        player.y = screen.respawn.y;
    }
}

class Screen{
    constructor(width, height, respawn, transitions, collisions, deathObjects){
        this.width = width;
        this.height = height;
        this.respawn = respawn;
        this.transitions = transitions;
        this.collisions = collisions;
        this.deathObjects = deathObjects;
    }
}

class CollisionObject{
    constructor(x,y,width,height,color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
}

class Transition{
    constructor(x,y,width,height,side,screenId,positionChange,cameraStartX,cameraStartY){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.side = side;
        this.screenId = screenId;
        if(side == "up" || side == "down"){
            this.xChange = positionChange;
            this.yChange = 0;
        } else {
            this.yChange = positionChange;
            this.xChange = 0;
        }
        this.cameraStartX = cameraStartX;
        this.cameraStartY = cameraStartY;
    }
}

class DeathObject{
    constructor(x,y,width,height,color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
}

class Respawn{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

class Camera{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.width = WIDTH;
        this.height = HEIGHT;
    }
    moveCamera(){
        var cameraCenterX = this.x + this.width/2;
        var cameraCenterY = this.y + this.height/2;

        var playerCenterX = player.x + player.width/2;
        var playerCenterY = player.y + player.height/2;

        this.x -= (cameraCenterX-playerCenterX)/SMOOTHING;
        this.y -= (cameraCenterY-playerCenterY)/SMOOTHING;

        if(this.x < 0){
            this.x = 0;
        } else if(this.x + this.width > screen.width){
            this.x = screen.width - this.width;
        }
        if(this.y < 0){
            this.y = 0;
        } else if(this.y + this.height > screen.height){
            this.y = screen.height - this.height;
        }
    }
}

const TRANSITION_BUFFER = 5;

const SCREENS = [
    new Screen(800, 500,
        new Respawn(60,400),
        [new Transition(WIDTH, 0, TRANSITION_BUFFER*2, HEIGHT,"right",1,0,0,0)],
        [new CollisionObject(0, HEIGHT-40, WIDTH, 40, "#000000"),new CollisionObject(0, 0, 40, HEIGHT, "#000000")],
        [new DeathObject(-20 - PLAYER_WIDTH, -20 - PLAYER_HEIGHT, WIDTH+40+(PLAYER_WIDTH*2), 20, "#ff0000"),new DeathObject(-20 - PLAYER_WIDTH, -20 - PLAYER_HEIGHT, 20, HEIGHT + 40 + (PLAYER_HEIGHT*2), "#ff0000"),new DeathObject(-20 - PLAYER_WIDTH, HEIGHT + PLAYER_HEIGHT, WIDTH+40+(PLAYER_WIDTH*2), 20, "#ff0000"),new DeathObject(WIDTH + PLAYER_WIDTH, -20 - PLAYER_HEIGHT,20, HEIGHT+40+(PLAYER_HEIGHT*2), "#ff0000")]
    ),
    new Screen(800, 500,
        new Respawn(60,400),
        [new Transition(-TRANSITION_BUFFER*2, 0, TRANSITION_BUFFER*2, HEIGHT,"left",0,0,0,0),new Transition(WIDTH, 0, TRANSITION_BUFFER*2, HEIGHT,"right",2,480,0,300)],
        [new CollisionObject(0, HEIGHT-40, 410, 40, "#000000"),new CollisionObject(470, 400, WIDTH-470, 100, "#000000"),new CollisionObject(200, 400, 60, 60, "#000000"),new CollisionObject(350, 400, 60, 60, "#000000"),new CollisionObject(530, 370, WIDTH - 530, 30, "#000000"),new CollisionObject(590, 340, WIDTH - 590, 30, "#000000"),new CollisionObject(650, 280, WIDTH - 650, 60, "#000000")],
        [new DeathObject(-20 - PLAYER_WIDTH, -20 - PLAYER_HEIGHT, WIDTH+40+(PLAYER_WIDTH*2), 20, "#ff0000"),new DeathObject(-20 - PLAYER_WIDTH, -20 - PLAYER_HEIGHT, 20, HEIGHT + 40 + (PLAYER_HEIGHT*2), "#ff0000"),new DeathObject(-20 - PLAYER_WIDTH, HEIGHT + PLAYER_HEIGHT, WIDTH+40+(PLAYER_WIDTH*2), 20, "#ff0000"),new DeathObject(WIDTH + PLAYER_WIDTH, -20 - PLAYER_HEIGHT,20, HEIGHT+40+(PLAYER_HEIGHT*2), "#ff0000")]
    ),
    new Screen(800, 800,
        new Respawn(60,700),
        [new Transition(-TRANSITION_BUFFER*2, 0, TRANSITION_BUFFER*2, 800,"left",1,-480,0,0)],
        [new CollisionObject(0, 760, 800, 40, "#000000"), new CollisionObject(200, 720, 600, 40, "#000000"), new CollisionObject(350, 680, 450, 40, "#000000"), new CollisionObject(500, 600, 300, 80, "#000000"), new CollisionObject(180, 520, 220, 80, "#000000"), new CollisionObject(180, 440, 140, 80, "#000000"), new CollisionObject(400, 360, 80, 80, "#000000"), new CollisionObject(560, 320, 240, 280, "#000000"), new CollisionObject(660, 260, 140, 60, "#000000")],
        []
    )
];

var player = new Player(60,400,PLAYER_WIDTH,PLAYER_HEIGHT,'#163abc');

var screen = SCREENS[0];

var collisionObjects = screen.collisions;

var deathObjects = screen.deathObjects;

var transitioning = false;

var pause = false;

var dashUnlocked = true;

var camera = new Camera(0,0);

window.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true;
});

window.addEventListener('keyup', (event) => {
    keysPressed[event.key] = false;
});

function update() {
    if(!pause){
        player.updateMovement();
        updateTransitions();
        checkDeath();
        camera.moveCamera();
    }

    ctx.fillStyle = '#090';
    ctx.fillRect(0,0,800,500);
    draw()

    requestAnimationFrame(update);
}

function updateTransitions(){
    var transition = checkTransitions();
    if(transition != -1 && !transitioning){
        transitioning = true;
        screen = SCREENS[transition.screenId];
        if(transition.side == "right"){
            player.x -= WIDTH - player.width - (TRANSITION_BUFFER*2);
        } else if(transition.side == "left"){
            player.x += WIDTH - player.width - (TRANSITION_BUFFER*2);
        } else if(transition.side == "down"){
            player.y -= HEIGHT - player.height - (TRANSITION_BUFFER*2);
        } else if(transition.side == "up"){
            player.y += HEIGHT - player.height - (TRANSITION_BUFFER*2);
        }
        collisionObjects = screen.collisions;
        deathObjects = screen.deathObjects;
        player.x += transition.xChange;
        player.y += transition.yChange;
        camera.x = transition.cameraStartX;
        camera.y = transition.cameraStartY;
    } else if(transition == -1){
        transitioning = false;
    }
}

function checkTransitions(){
    for(let i = 0; i < screen.transitions.length; i++){
        transition = screen.transitions[i];
        if(checkCollision(player, transition)){
            return transition;
        }
    }
    return -1;
}

function checkCollisions(){
    collisions = [];
    for(let i = 0; i < collisionObjects.length; i++){
        currentObject = collisionObjects[i];
        if(checkCollision(player, currentObject)){
            collisions.push(currentObject);
        }
    }
    return collisions;
}

function checkDeath(){
    for(let i = 0; i < deathObjects.length; i++){
        currentObject = deathObjects[i];
        if(checkCollision(player, currentObject)){
            player.respawn();
        }
    }
}

function draw() {
    drawPlayer();
    drawCollisionObjects();
}

function drawPlayer() {
    drawRect(player);
}

function drawCollisionObjects() {
    for(let i = 0; i < collisionObjects.length; i++){
        object = collisionObjects[i];
        drawRect(object);
    }
}

function drawRect(object) {
    ctx.fillStyle = object.color;
    ctx.fillRect(object.x - camera.x,object.y - camera.y,object.width, object.height);
}

function checkCollision(rectA, rectB) {
  return (
    rectA.x < rectB.x + rectB.width &&
    rectA.x + rectA.width > rectB.x &&
    rectA.y < rectB.y + rectB.height &&
    rectA.y + rectA.height > rectB.y
  );
}

update();