var Food = require('../units/food.js');
var Hunter = require('../units/hunter.js');
var Forest = require('../units/forest.js');
var QuadNode = require('../services/quadTree.js');

function Engine(ctx, canvas){
  var that = this;

  this.ctx = ctx;
  this.canvas = canvas;

  this.units = [];
  _.times(0, function(){
    new Food(that.units);
  });
  _.times(50, function(){
    new Hunter(that.units);
  });
  _.times(1, function(){
    new Forest(that.units);
  });

  this.mapCenter = [0,0];
}

Engine.prototype.step = function(){
  var that = this;
  _.each(this.units, function(unit){
    if(unit){
      unit.emit('step', that.units);
    }
  });
};

Engine.prototype.checkCollision = function(){
  var qn = new QuadNode({
    contents: this.units,
    bounds: [-1000,-1000,1000,1000],
  });
  qn.divide();

  _.each(qn.allChildren(), function(quadNode){
    var contents = quadNode.contents;
    for(var i = 0; i < contents.length-1; i++){
      for(var j = i+1; j < contents.length; j++){
        if(contents[i].distanceFrom(contents[j]) < (contents[i].radius + contents[j].radius)){
          if(contents[i] && contents[j]){
            contents[i].emit('collision', contents[j]);
          }
          if(contents[i] && contents[j]){
            contents[j].emit('collision', contents[i]);
          }
        }
      }
    }
  })
  // for(var i = 0; i < this.units.length-1; i++){
  //   for(var j = i+1; j < this.units.length; j++){
  //     if(this.units[i].distanceFrom(this.units[j]) < (this.units[i].radius + this.units[j].radius)){
  //       if(this.units[i] && this.units[j]){
  //         this.units[i].emit('collision', this.units[j]);
  //       }
  //       if(this.units[i] && this.units[j]){
  //         this.units[j].emit('collision', this.units[i]);
  //       }
  //     }
  //   }
  // }
};

Engine.prototype.drawAll = function(){
  var that = this;

  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  var centerX = that.mapCenter[0] - (that.canvas.width/2)
  var centerY = that.mapCenter[1] - (that.canvas.height/2);
  _.each(this.units, function(unit){
    unit.draw(that.ctx, [centerX, centerY]);
  });
};

Engine.prototype.start = function(){
  var that = this;
  this.interval = setInterval(function(){
    that.tick();
  }, 16);
};

Engine.prototype.tick = function(){
  this.step();
  this.checkCollision();
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


