var Food = require('../units/food.js');
var Hunter = require('../units/hunter.js');
var Forest = require('../units/forest.js');
var QuadNode = require('../services/quadNode.js');
var User = require('../models/user.js');

function Engine(ctx, canvas){
  this.ctx = ctx;
  this.canvas = canvas;
  this.unitGroups = {
    forests: [],
    foods: [],
    hunters: [],
    hunterVisions: [],
  };
  this.mapCenter = [0, 0];


  var that = this;
  this.canvas.addEventListener('click', function(event) {
    var mousePos = that.getMousePos(event);
    new Food(that.unitGroups,{
      pos: new Vector({coords: mousePos}),
    });
    User.resources.foods--;
  }, false);

  this.createInitialUnits();
}


Engine.prototype.getMousePos = function(event) {
  var rect = this.canvas.getBoundingClientRect();
  return [event.clientX - rect.left - (this.canvas.width/2), event.clientY - rect.top- (this.canvas.height/2)];
};


Engine.prototype.createInitialUnits = function(){
  var that = this;
  _.times(0, function(){
    new Food(that.unitGroups);
  });
  _.times(1, function(){
    new Hunter(that.unitGroups);
  })
  _.times(0, function(){
    new Forest(that.unitGroups);
  });
  _.each(this.unitGroups.forests, function(forest){
    _.times(40, function(){
      new Hunter(that.unitGroups, {
        pos: forest.pos.add(new Vector({
            magnitude: Math.random()*300,
            radians: Math.random()*2*Math.PI,
        })),
      });
    });
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

Engine.prototype.createQuadNode = function(flag, unitGroups){
  var qn = new QuadNode({
    contentGroups: unitGroups,
    bounds: [-(this.canvas.width/2),-(this.canvas.height/2),(this.canvas.width/2),(this.canvas.height/2)],
  });
  qn.divide();
  return qn;
}

Engine.prototype.checkCollision = function(){
  var that = this;

  this.qn = this.createQuadNode('first', [this.unitGroups.foods, this.unitGroups.hunterVisions]);
  this.qn2 = this.createQuadNode('', [this.unitGroups.foods, this.unitGroups.hunters]);

  this.checkCollisionForQuadNode(this.qn);
  this.checkCollisionForQuadNode(this.qn2);

  // this.qn = new QuadNode({
  //   contents: this.unitGroups,
  //   bounds: [-(that.canvas.width/2),-(that.canvas.height/2),(that.canvas.width/2),(that.canvas.height/2)],
  // });
  // this.qn.divide();
};

Engine.prototype.checkCollisionForQuadNode = function(qn){
  var contentNodes = qn.allContentNodes();

  _.each(contentNodes, function(contentNode){

    if(!contentNode.contentGroups[0] || !contentNode.contentGroups[1]){return;}

    var contentGroup1 = contentNode.contentGroups[0];
    var contentGroup2 = contentNode.contentGroups[1];

    var unit1;
    var unit2;
    for(var i = 0; i < contentGroup1.length; i++){
      for(var j = 0; j < contentGroup2.length; j++){
        unit1 = contentGroup1[i];
        unit2 = contentGroup2[j]
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

}

Engine.prototype.step = function(){
  var that = this;
  _.each(this.unitGroups, function(unitGroup){
    _.each(unitGroup, function(unit){
      if(unit){
        unit.emit('step', that.unitGroups);
      }
    });
  });
};

Engine.prototype.drawAll = function(){
  var that = this;

  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  var centerX = that.mapCenter[0] - (that.canvas.width/2)
  var centerY = that.mapCenter[1] - (that.canvas.height/2);

  _.each(this.unitGroups, function(unitGroup){
    _.each(unitGroup, function(unit){
      unit.draw(that.ctx, [centerX, centerY]);
    });
  });

  User.drawResources(this.ctx);
  // this.drawQuadNodes(this.qn, centerX, centerY);
};

Engine.prototype.drawQuadNodes = function(qn, centerX, centerY){
  var that = this;
  centerX = centerX || that.mapCenter[0] - (that.canvas.width/2);
  centerY = centerY || that.mapCenter[1] - (that.canvas.height/2);

  var allQuadNodes = qn.allChildren();
  _.each(allQuadNodes, function(quadNode){
    var bounds = quadNode.bounds.slice();
    bounds[0]-=centerX;
    bounds[1]-=centerY;
    bounds[2]-=centerX;
    bounds[3]-=centerY;
    that.ctx.strokeStyle = 'grey';
    that.ctx.globalAlpha = 1;
    that.ctx.rect(bounds[0], bounds[1], bounds[2]-bounds[0], bounds[3]-bounds[1]);
    that.ctx.stroke();
  });
};

module.exports = Engine;


