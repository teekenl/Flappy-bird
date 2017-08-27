const Pipe = function(xpos, ypos, length, speed, ctx){
    this.xpos = xpos;
    this.ypos = ypos;
    this.length = length;
    this.ctx = ctx;
    this.speed = speed;
};

Pipe.prototype.update = function(){
    this.xpos -= this.speed;
};

Pipe.prototype.render = function(){
  //this.ctx.save();
  this.ctx.fillStyle = "#000000";
  this.ctx.fillRect(this.xpos+5, this.ypos+5, 150, this.length);
  this.ctx.fillStyle = "#74BF2E";
  this.ctx.fillRect(this.xpos+5, this.ypos+5, 140, this.length-10);
  this.ctx.fillStyle = "#FFFFFF";
  //this.ctx.restore();
};