var Food = require('../units/food.js');
var Hunter = require('../units/hunter.js');

function Engine(ctx, canvas){
  var that = this;
  this.ctx = ctx;
  this.canvas = canvas;

  this.units = [];
  _.times(20, function(){
    that.units.push(new Food());
  });
  _.times(2, function(){
    that.units.push(new Hunter());
  });

  _.each(this.units, function(unit){
    unit.on('destroy', function(){
      var index = that.units.indexOf(unit);
      if(index !== -1){
        that.units.splice(index, 1);
      }
    })
  })

  this.mapCenter = [0,0];
}

Engine.prototype.step = function(){
  var that = this;
  _.each(this.units, function(unit){
    unit.emit('step', that.units);
  });
};

Engine.prototype.checkCollision = function(){
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


