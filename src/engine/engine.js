var UnitGroups = require('../services/unitGroups.js');
var UnitGroup = require('../services/unitGroup.js');
var Food = require('../units/food.js');
var Hunter = require('../units/hunter.js');
var Forest = require('../units/forest.js');
var QuadNode = require('../services/quadNode.js');
var User = require('../models/user.js');
var Veggie = require('../units/veggie.js');

function Engine(renderer){
  this.renderer = renderer;

  this.absoluteBounds = [-(this.renderer.width/2),-(this.renderer.height/2),(this.renderer.width/2),(this.renderer.height/2)];
  UnitGroups.setAbsoluteBounds([-(this.renderer.width/2),-(this.renderer.height/2),(this.renderer.width/2),(this.renderer.height/2)]);
  this.mapCenter = [0, 0];

  this.unitGroups = {
    forests: [],
    foods: [],
    hunters: [],
    hunterVisions: new UnitGroup({
      name: 'hVisions',
      collisionBounds: this.absoluteBounds,
    }),
  };

  // this.unitGroups.hunterVisions.addCanCollideWith({units: this.unitGroups.foods})

  this.createInitialUnits();

  // create the root of the scene graph
  this.mainStage = new PIXI.ParticleContainer();
  this.mainStage.interactive = true;

}


Engine.prototype.createInitialUnits = function(){
  var that = this;

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

  // _.times(9, function(i){
  //   var forest = new Forest(that.unitGroups, {pos: new Vector({magnitude:400, radians: i/9*2*Math.PI})});
  //   _.times(20, function(){
  //     new Hunter(that.unitGroups, {
  //       pos: forest.pos.add(new Vector({
  //           magnitude: Math.random()*forest.radius,
  //           radians: Math.random()*2*Math.PI,
  //       })),
  //     });
  //   });
  // });


  // _.times(27, function(i){
  //   var forest = new Forest(that.unitGroups, {pos: new Vector({magnitude:800, radians: i/27*2*Math.PI})});
  //   _.times(20, function(){
  //     new Hunter(that.unitGroups, {
  //       pos: forest.pos.add(new Vector({
  //           magnitude: Math.random()*forest.radius,
  //           radians: Math.random()*2*Math.PI,
  //       })),
  //     });
  //   });
  // });


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
    bounds: this.absoluteBounds,
  });
  return qn;
}

Engine.prototype.checkCollision = function(){
  var that = this;
  UnitGroups.checkCollisions();
};

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

  var centerX = this.mapCenter[0] - (this.renderer.width/2)
  var centerY = this.mapCenter[1] - (this.renderer.height/2);


  UnitGroups.drawAll(this.mainStage, [centerX, centerY])


  // this.mainGraphics.clear();

  // var unitGroupKeys = Object.keys(this.unitGroups);
  // var i,l, unitGroup;
  // var j,k, unit;
  // for(i = 0, l=unitGroupKeys.length; i<l; i++){
  //   unitGroup = this.unitGroups[unitGroupKeys[i]]

  //   for(j=0,k=unitGroup.length; j<k; j++){
  //     unitGroup[j].draw(this.mainStage, [centerX, centerY]);
  //   }
  // }

  this.renderer.render(this.mainStage)

};


module.exports = Engine;


