var Food = require('../units/food.js');
var Hunter = require('../units/hunter.js');
var Forest = require('../units/forest.js');
var QuadNode = require('../services/quadNode.js');

function Engine(ctx, canvas){
  this.ctx = ctx;
  this.canvas = canvas;
  this.units = [];
  this.mapCenter = [0,0];
  this.createInitialUnits();
}

Engine.prototype.createInitialUnits = function(){
  var that = this;
  _.times(0, function(){
    new Food(that.units);
  });
  _.times(100, function(){
    new Hunter(that.units);
  });
  _.times(1, function(){
    new Forest(that.units);
  });
};

Engine.prototype.step = function(){
  var that = this;
  _.each(this.units, function(unit){
    if(unit){
      unit.emit('step', that.units);
    }
  });
};

Engine.prototype.checkCollision = function(){
  var that = this;

  this.qn = new QuadNode({
    contents: this.units,
    bounds: [-(that.canvas.width/2),-(that.canvas.height/2),(that.canvas.width/2),(that.canvas.height/2)],
  });
  this.qn.divide();
  this.contents = this.qn.allContents();

  _.each(this.contents, function(content){
    for(var i = 0; i < content.length-1; i++){
      for(var j = i+1; j < content.length; j++){
        if(content[i].distanceFrom(content[j]) < (content[i].radius + content[j].radius)){
          if(content[i] && content[j]){
            content[i].emit('collision', content[j]);
          }
          if(content[i] && content[j]){
            content[j].emit('collision', content[i]);
          }
        }
      }
    }
  })
};

Engine.prototype.drawAll = function(){
  var that = this;

  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  var centerX = that.mapCenter[0] - (that.canvas.width/2)
  var centerY = that.mapCenter[1] - (that.canvas.height/2);
  _.each(this.units, function(unit){
    unit.draw(that.ctx, [centerX, centerY]);
  });

  // this.drawQuadNodes(centerX, centerY)
};

Engine.prototype.drawQuadNodes = function(centerX, centerY){
  var that = this;
  centerX = centerX || that.mapCenter[0] - (that.canvas.width/2)
  centerY = centerY || that.mapCenter[1] - (that.canvas.height/2);

  var allQuadNodes =this.qn.allChildren();
  _.each(allQuadNodes, function(quadNode){
    var bounds = quadNode.bounds;
    bounds[0]-=centerX;
    bounds[1]-=centerY;
    bounds[2]-=centerX;
    bounds[3]-=centerY;
    that.ctx.rect.apply(that.ctx, bounds);
    that.ctx.stroke();
  })

}

Engine.prototype.start = function(){
  var that = this;
  this.interval = setInterval(function(){
    that.tick();
  }, 16);
};

Engine.prototype.tick = function(){
  this.checkCollision();
  this.step();
  this.drawAll();
};

Engine.prototype.stop = function(){
  clearInterval(this.interval);
};

// Engine.prototype.bindKeyHandler = function () {
//   var ship = this.ship
//   $(window).keydown(function(key){
//     switch(key.keyCode){
//     case 32:
//       ship.useEvade()
//       break;
//     case 37:
//       ship.left_key_pressed = true;
//       break;
//     case 38:
//       ship.up_key_pressed = true;
//       break;
//     case 39:
//       ship.right_key_pressed = true;
//       break;
//     case 40:
//       ship.down_key_pressed = true;
//       break;
//     }
//   })
//   $(window).keyup(function(key){
//     switch(key.keyCode){
//     case 37:
//       ship.left_key_pressed = false;
//       break;
//     case 38:
//       ship.up_key_pressed = false;
//       break;
//     case 39:
//       ship.right_key_pressed = false;
//       break;
//     case 40:
//       ship.down_key_pressed = false;
//       break;
//     }
//   })
// }

module.exports = Engine;


