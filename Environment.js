// Environment for flappy bird
const Environment = function(c, ctx){
    this.c = c;
    this.ctx = ctx;
    this.bgPos = 0;
    this.fgPos = 0;
    this.bgSpeed = 5;
    this.bgWidth = 420;
    this.bgImg = document.getElementById('bg');
};

Environment.prototype.update = function(){
    this.bgPos -= this.bgSpeed;
    if(this.bgPos < -this.bgWidth) {
        this.bgPos = 0;
    }
};

Environment.prototype.render = function(ctx){
    for (let i=0; i<=this.c.width/this.bgWidth; i++){
        ctx.drawImage(this.bgImg, this.bgPos+i*this.bgWidth, 0);
    }
};