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
  _.times(75, function(){
    new Hunter(that.units);
  });
  _.times(1, function(){
    new Forest(that.units);
  });
};

Engine.prototype.start = function(){
  var that = this;
  this.tickInterval = setInterval(function(){
    that.tick();
  }, 16);
};

Engine.prototype.stop = function(){
  clearInterval(this.tickInterval);
};

Engine.prototype.tick = function(){
  this.checkCollision();
  this.step();
  this.drawAll();
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
    var unit1;
    var unit2;
    for(var i = 0; i < content.length-1; i++){
      for(var j = i+1; j < content.length; j++){
        unit1 = content[i];
        unit2 = content[j]
        if(unit1.distanceFrom(unit2) < (unit1.radius + unit2.radius)){
          if(unit1 && unit2){
            unit1.emit('collision', unit2);
          }
          if(unit1 && unit2){
            unit2.emit('collision', unit1);
          }
        }
      }
    }
  })
};

Engine.prototype.step = function(){
  var that = this;
  _.each(this.units, function(unit){
    if(unit){
      unit.emit('step', that.units);
    }
  });
};

Engine.prototype.drawAll = function(){
  var that = this;

  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  var centerX = that.mapCenter[0] - (that.canvas.width/2)
  var centerY = that.mapCenter[1] - (that.canvas.height/2);
  _.each(this.units, function(unit){
    unit.draw(that.ctx, [centerX, centerY]);
  });

  this.drawQuadNodes(centerX, centerY);
};

Engine.prototype.drawQuadNodes = function(centerX, centerY){
  var that = this;
  centerX = centerX || that.mapCenter[0] - (that.canvas.width/2);
  centerY = centerY || that.mapCenter[1] - (that.canvas.height/2);

  var allQuadNodes = this.qn.allChildren();
  _.each(allQuadNodes, function(quadNode){
    var bounds = quadNode.bounds.slice();
    bounds[0]-=centerX;
    bounds[1]-=centerY;
    bounds[2]-=centerX;
    bounds[3]-=centerY;
    that.ctx.rect(bounds[0], bounds[1], bounds[2]-bounds[0], bounds[3]-bounds[1]);
    that.ctx.stroke();
  });
};

module.exports = Engine;


