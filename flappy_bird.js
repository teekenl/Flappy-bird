
window.onload = function(){
    const c = document.getElementById('canvas'),
        ctx = c.getContext("2d"),
        refresh = document.getElementById('refresh');
    c.width = window.innerWidth;
    c.height = 900;

    // Setup environment, bird and pipe for the game.
    let environment = new Environment(c,ctx);
    let bird = new Bird(80, 350, c, ctx);
    let pipes = [];
    setInterval(function(){
        let pipeSet = generateRandomPipe(ctx, c.width, c.height);
        pipes.push(pipeSet.top, pipeSet.bottom);
    },3000);

    refresh.addEventListener("click",resetGame);
    //start game
    gamePlay();

    function resetGame() {
        pipes = [];
        environment = new Environment(c,ctx);
        bird = new Bird(80,350, c, ctx);
        gamePlay();
    }

    ctx.fillStyle= "#FFFFFF";
    function gamePlay(){
        refresh.style.visibility = refresh.style.visibility = "visible" ?  "hidden": "hidden";

        ctx.fillRect(0,0,c.width,c.height);
        environment.update();
        environment.render(ctx);
        pipes.forEach(function(pipe){
            pipe.update();
            pipe.render();
        });
        if(bird.game_status()) {
            alert("Game over");
            refresh.style.visibility = "visible";
            return;
        }
        bird.update();

        bird.render();
        if(detectCollision(bird,pipes)){
            alert("You lose");
            refresh.style.visibility = "visible";
            return;
        }

        window.requestAnimationFrame(gamePlay);
    }

    window.addEventListener('keydown', function(e){
        if(e.keyCode === 13 && refresh.style.visibility==="visible") {
            resetGame();
        }
    });
};

function generateRandomPipe(ctx, canvasWidth, canvasHeight){
    let lengthTop = Math.round(Math.random()*400+100);
    let lengthBottom = 600 - 80 - lengthTop;
    let returnVal = { };
    returnVal.top= new Pipe(canvasWidth, -5, lengthTop, 3, ctx);
    returnVal.bottom= new Pipe(canvasWidth, canvasHeight-210-lengthBottom, lengthBottom, 3, ctx);
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
            if(a >= x0 && a <= x1 && b <= y0) {
                collisionDetected = true
            }
        } else{
            let y2 = e.ypos;
            let a = bird.x;
            let b = bird.y +  bird.height/2;
            if(a>= x0 && a<= x1 && b >= y2) collisionDetected = true;
        }
    });
    return collisionDetected;
}
