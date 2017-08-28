const Bird = function(x, y, c, ctx) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.c = c;
    this.moveY = 0;
    this.moveX = 0;
    this.width = 90;
    this.height = 64;
    this.game_over = false;
    this.ticks = 0;
    this.spriteIndex = 0;
    this.sprites = [document.getElementById('bird1'),
        document.getElementById('bird2'),
        document.getElementById('bird3')];
    let self = this;
    window.addEventListener('keydown', function(e){
        if(e.keyCode === 32) {
            if(self.y>0){
                self.moveY = -9;
                e.preventDefault();
            }
        }
    });
};

Bird.prototype.update = function(){
    if(!this.game_over) { // checks if the bird is falls beyond the canvas area.
        this.ticks++;
        if (this.ticks % 15 === 0) this.spriteIndex = (this.spriteIndex+1) % this.sprites.length;
        this.y += this.moveY;
        if(this.y > this.c.height){
            //alert('Game over');
            this.game_over = true;
            this.y = -100;
        }
        this.moveY += 0.5;
    }
};

Bird.prototype.render = function(){
    let renderX = this.x - this.width/2 - 10;
    let renderY = this.y - this.height/2 - 10;
    this.ctx.drawImage(this.sprites[this.spriteIndex],renderX,renderY);
};

Bird.prototype.game_status = function(){
    return !this.game_over;
};

Bird.prototype.reset = function(){
    this.game_over = false;
};