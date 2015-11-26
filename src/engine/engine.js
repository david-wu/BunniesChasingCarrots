var Food = require('../units/food.js');
var Hunter = require('../units/hunter.js');
var Forest = require('../units/forest.js');
var QuadNode = require('../services/quadNode.js');
var User = require('../models/user.js');
var Veggie = require('../units/veggie.js');

function Engine(renderer){
  // this.ctx = ctx;
  // this.canvas = canvas;

  this.renderer = renderer;

  // create the root of the scene graph
  this.mainStage = new PIXI.ParticleContainer();
  this.mainStage.interactive = true;

  // this.mainGraphics = new PIXI.Graphics();
  // this.mainStage.addChild(this.mainGraphics);

  // this.canvas.view.width = 2500;
  // this.canvas.view.height = 2500;
  this.unitGroups = {
    forests: [],
    foods: [],
    hunters: [],
    hunterVisions: [],
  };
  this.mapCenter = [0, 0];


  // var that = this;
  // this.canvas.addEventListener('click', function(event) {
  //   var mousePos = that.getMousePos(event);
  //   new Food(that.unitGroups,{
  //     pos: new Vector({coords: mousePos}),
  //   });
  //   User.resources.foods--;
  // }, false);

  this.createInitialUnits();
}


// Engine.prototype.getMousePos = function(event) {
//   var rect = this.canvas.getBoundingClientRect();
//   return [event.clientX - rect.left - (this.canvas.width/2), event.clientY - rect.top - (this.canvas.height/2)];
// };


Engine.prototype.createInitialUnits = function(){
  var that = this;
  _.times(0, function(){
    new Food(that.unitGroups);
  });
  _.times(0, function(){
    new Hunter(that.unitGroups,{
      pos: new Vector({coords: [0,0]})
    });
  });

  _.times(3, function(i){
    var forest = new Forest(that.unitGroups, {pos: new Vector({magnitude:200, radians: i/3*2*Math.PI})});
    _.times(20, function(){
      new Hunter(that.unitGroups, {
        pos: forest.pos.add(new Vector({
            magnitude: Math.random()*forest.radius,
            radians: Math.random()*2*Math.PI,
        })),
      });
    });
  });

  _.times(9, function(i){
    var forest = new Forest(that.unitGroups, {pos: new Vector({magnitude:400, radians: i/9*2*Math.PI})});
    _.times(20, function(){
      new Hunter(that.unitGroups, {
        pos: forest.pos.add(new Vector({
            magnitude: Math.random()*forest.radius,
            radians: Math.random()*2*Math.PI,
        })),
      });
    });
  });


  _.times(27, function(i){
    var forest = new Forest(that.unitGroups, {pos: new Vector({magnitude:800, radians: i/27*2*Math.PI})});
    _.times(20, function(){
      new Hunter(that.unitGroups, {
        pos: forest.pos.add(new Vector({
            magnitude: Math.random()*forest.radius,
            radians: Math.random()*2*Math.PI,
        })),
      });
    });
  });


};

Engine.prototype.start = function(){
  this.tick();
};

var tickCount = 0;
Engine.prototype.tick = function(){
  var that = this;

    if(tickCount++ % 6===0){
      that.checkCollision();
    }

    that.step();
    that.drawAll();

  requestAnimationFrame(function(){
    that.tick();
  })
}

Engine.prototype.createQuadNode = function(flag, unitGroups){
  var qn = new QuadNode({
    contentGroups: unitGroups,
    bounds: [-(this.renderer.width/2),-(this.renderer.height/2),(this.renderer.width/2),(this.renderer.height/2)],
  });
  return qn;
}

Engine.prototype.checkCollision = function(){
  var that = this;

  this.qn = this.createQuadNode('first', [this.unitGroups.hunterVisions, this.unitGroups.foods]);
  this.qn2 = this.createQuadNode('', [this.unitGroups.hunters, this.unitGroups.foods]);

  this.checkCollisionForQuadNode(this.qn);
  this.checkCollisionForQuadNode(this.qn2);

};

Engine.prototype.checkCollisionForQuadNode = function(qn){
  var contentNodes = qn.allContentNodes();

  var m, n, contentNode;
  for(m=0, n=contentNodes.length; m<n; m++){
    contentNode = contentNodes[m];

    var contentGroup1 = contentNode.contentGroups[0];
    var contentGroup2 = contentNode.contentGroups[1];

    var i, j, iLength, jLength;
    var unit1;
    var unit2;
    for(var i = 0, iLength = contentGroup1.length; i < iLength; i++){
      for(var j = 0, jLength = contentGroup2.length; j < jLength; j++){
        unit1 = contentGroup1[i];
        unit2 = contentGroup2[j]
        if(unit1.distanceFrom(unit2) < (unit1.radius + unit2.radius)){
            unit1.emit('collision', unit2);
            // unit2.emit('collision', unit1);
        }
      }
    }
  }
}

Engine.prototype.step = function(){
  var that = this;

  var unitGroupKeys = Object.keys(this.unitGroups);
  var i,l, unitGroup;
  var j,k, unit;
  for(i = 0, l=unitGroupKeys.length; i<l; i++){
    unitGroup = this.unitGroups[unitGroupKeys[i]]



    for(j=0,k=unitGroup.length; j<k; j++){
      unit=unitGroup[j];
      if(unit){
        unit.step();
        unit.act();
        // unit.emit('step', that.unitGroups);
      }
    }
  }
};

Engine.prototype.drawAll = function(){
  var that = this;

  // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  var centerX = that.mapCenter[0] - (this.renderer.width/2)
  var centerY = that.mapCenter[1] - (this.renderer.height/2);

  // this.mainGraphics.clear();

  var unitGroupKeys = Object.keys(this.unitGroups);
  var i,l, unitGroup;
  var j,k, unit;
  for(i = 0, l=unitGroupKeys.length; i<l; i++){
    unitGroup = this.unitGroups[unitGroupKeys[i]]

    for(j=0,k=unitGroup.length; j<k; j++){
      unitGroup[j].draw(this.mainStage, [centerX, centerY]);
    }
  }

  // this.drawQuadNodes(this.qn, centerX, centerY);
  // this.drawQuadNodes(this.qn2, centerX+3, centerY+3);
  this.renderer.render(this.mainStage)

};

// Engine.prototype.drawQuadNodes = function(qn, centerX, centerY){
//   var that = this;
//   centerX = centerX || that.mapCenter[0] - (that.canvas.width/2);
//   centerY = centerY || that.mapCenter[1] - (that.canvas.height/2);

//   var allQuadNodes = qn.allChildren();

//   for(var i=0,l=allQuadNodes.length; i<l; i++){
//     var bounds = allQuadNodes[i].bounds.slice()
//     bounds[0]-=centerX;
//     bounds[1]-=centerY;
//     bounds[2]-=centerX;
//     bounds[3]-=centerY;
//     this.ctx.strokeStyle = 'grey';
//     this.ctx.globalAlpha = 1;

//     this.ctx.beginPath();
//     this.ctx.rect(bounds[0], bounds[1], bounds[2]-bounds[0], bounds[3]-bounds[1]);
//     this.ctx.stroke();
//   }
// };

module.exports = Engine;


