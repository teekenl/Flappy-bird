const Pipe = function(xpos, ypos, length, speed, ctx){
    this.xpos = xpos;
    this.ypos = ypos;
    this.width = 150;
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
  this.ctx.fillRect(this.xpos, this.ypos+5, this.width+5, this.length);  // (x, y, grid_x, grid_y)
  this.ctx.fillStyle = "#74BF2E";
  this.ctx.fillRect(this.xpos+5, this.ypos+9, this.width-15, this.length-10);
  this.ctx.fillStyle = "#FFFFFF";
  //this.ctx.restore();
};