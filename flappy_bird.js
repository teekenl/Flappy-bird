
window.onload = function(){
    const c = document.getElementById('canvas'),
        ctx = c.getContext("2d");
    c.width = window.innerWidth;
    c.height = 400;

    // Setup environment, bird and pipe for the game.
    const environment = new Environment(c,ctx);
    const bird = new Bird(50, 100, c, ctx);
    const pipes = [];
    setInterval(function(){
        let pipeSet = generateRandomPipe(ctx, c.width, c.height);
        pipes.push(pipeSet.top, pipeSet.bottom);
        console.log(pipeSet);
    },3000);

    //start game
    gamePlay();

    ctx.fillStyle= "#FFFFFF";
    function gamePlay(){
        if(bird.game_status()){

        }
        ctx.fillRect(0,0,c.width,c.height);
        environment.update();
        environment.render(ctx);
        pipes.forEach(function(pipe){
            pipe.update();
            pipe.render();
        });
        bird.update();
        bird.render();
        if(detectCollision(bird,pipes)) alert("You lose");
        window.requestAnimationFrame(gamePlay);
    }
};

function generateRandomPipe(ctx, canvasWidth, canvasHeight){
    let lengthTop = Math.round(Math.random()*200+100);
    let lengthBottom = 600 - 200 - lengthTop;
    let returnVal = { };
    returnVal.top= new Pipe(canvasWidth, -5, lengthTop, 3, ctx);
    returnVal.bottom= new Pipe(canvasWidth, canvasHeight-5-lengthBottom, lengthBottom, 3, ctx);
    return returnVal;
}

function detectCollision(bird,pipes){
    let collisionDetected = false;
    pipes.forEach(function(e) {
        let highPipe = e.ypos <= 0;
        let x0 = e.xpos, x1 = e.xpos+e.width;
        if(highPipe){
            let y0 = e.ypos + e.length;
            let a = bird.x;
            let b = bird.y - bird.height -2;
            if(a > x0 && a < x1 && b < y0) {
                return true;
            }
        } else{
            let y2 = e.ypos;
            let a = bird.x;
            let b = bird.y +  bird.height/2;
            if(a>x0 && a<x1 && b > y2) return true;
        }
    });
    return collisionDetected;
}