var START = 1;
var PLAY = 2;
var END = 3;
var GameState = START;

var bird,birdimg1,birddeathimg;
var ground,groundimg,invisibleroof;
var pipesGroup,pipeimg,pipeimg2;
var canvas,score,endtitle,Gametitle,endtitleimg,Gametitleimg,restart,restartimg;

function preload(){
    groundimg = loadImage("ground.png");
    birdimg1 = loadImage("bird1.gif");
    pipeimg = loadImage("pipe.png");
    pipeimg2 = loadImage("pipe2.png");
    birddeathimg = loadImage("Deathanimation.png");
    endtitleimg = loadImage("EndTitle.png");
    Gametitleimg = loadImage("GameTitle.png");
    restartimg = loadImage("playbutton.png");
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    console.log(windowWidth);
    console.log(windowHeight);

    Gametitle = createSprite(580,150,100,100);
    Gametitle.addImage(Gametitleimg);
    Gametitle.visible = false;

    endtitle = createSprite(580,180,100,100);
    endtitle.addImage(endtitleimg);
    endtitle.visible = false;

    restart = createSprite(580,265,50,50);
    restart.addImage(restartimg);
    restart.scale = 0.5;

    bird = createSprite(100,100,20,20);
    bird.addAnimation("animation1",birdimg1);

    bird.scale = 0.15;

    ground = createSprite(1000,400,windowWidth,20);
    ground.addImage("ground",groundimg);
    ground.velocity.x = 0;

    invisibleroof = createSprite(0,0,windowWidth,1);

    //creating groups
    pipesGroup = createGroup();

    score = 0;
}

function draw() {
    background("lightblue")
    invisibleroof.visible = false;

    ground.velocityX = -8;
    if (ground.x < 0) {
        ground.x = ground.width/2;
    }

    if (GameState === START) {
        Gametitle.visible = true;
        restart.visible = true;

        if (mousePressedOver(restart)){
            reset();
        }
        
    }

    if (GameState === PLAY) {
        //displaying score
        text("Score: "+ score, windowWidth-100,50);
        score = score+1;
        restart.visible = false;
        Gametitle.visible = false;

        //make bird fly
        if (keyDown("space")) {
            bird.velocityY = -7;
        }

        //add gravity
        bird.velocityY = bird.velocityY + 0.8;

        if (bird.isTouching(invisibleroof)) {
            bird.y = 20;
    }
        if (bird.isTouching(pipesGroup) || bird.isTouching(ground) ) {
            GameState = END;
        }

    }

    else if (GameState === END) {
        bird.addImage("Death", birddeathimg);
        bird.y = 400;
        bird.velocityY =0;

        pipesGroup.setVelocityXEach(-8);

        endtitle.visible = true;
        restart.visible = true;
        Gametitle.visible = false;

        if (mousePressedOver(restart)){
            reset();
        }

    }

    function spawnPipes() {
        //write code here to spawn the pipes
        if (frameCount % 60 === 0) {
          var pipes = createSprite(windowWidth,300,40,10);
          pipes.setCollider("rectangle",0,0,40,299);
          pipes.y = Math.round(random(320,240));
          pipes.addImage(pipeimg);
          pipes.velocityX = -8

          var pipe2 = createSprite(900,50,40,100);
          pipe2.velocityX = -8;
          pipe2.y = Math.round(random(30,60));
          pipe2.addImage(pipeimg2);
          pipe2.scale = 0.5;
          
          //assign lifetime to the variable
          pipes.lifetime = 200;
          pipe2.lifetime = 200;

          pipes.depth = bird.depth;
          pipe2.depth = bird.depth
          ground.depth = ground.depth+3;
          bird.depth = bird.depth + 2;
          Gametitle.depth = Gametitle.depth+4;
          endtitle.depth = endtitle.depth+4;
          restart.depth = restart.depth+4;

          pipesGroup.add(pipes);
          pipesGroup.add(pipe2);
        }
    } 

    function reset(){
        GameState = PLAY;
        endtitle.visible = false;

        bird.changeAnimation("animation1",birdimg1);
        bird.y = 100;

        pipesGroup.destroyEach();
        score = 0;
    }

    spawnPipes()
    drawSprites()
}
    