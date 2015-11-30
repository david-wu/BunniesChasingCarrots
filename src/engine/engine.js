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

  UnitGroups.setAbsoluteBounds([-(this.renderer.width/2),-(this.renderer.height/2),(this.renderer.width/2),(this.renderer.height/2)]);

  this.mapCenter = [0, 0];

  this.createInitialUnits();

  // create the root of the scene graph
  this.mainStage = new PIXI.ParticleContainer();
  this.mainStage.interactive = true;
}

Engine.prototype.createInitialUnits = function(){
  this.createEcosystem(3, 200);
  this.createEcosystem(6, 400);
};

Engine.prototype.createEcosystem = function(count, radius){
  var that = this;
  _.times(count, function(i){
    var forest = new Forest({pos: new Vector({magnitude:radius, radians: i/count*2*Math.PI})});
    _.times(20, function(){
      new Hunter({
        pos: forest.pos.add(new Vector({
            magnitude: Math.random()*forest.radius,
            radians: Math.random()*2*Math.PI,
        })),
      });
    });
  });
}

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

Engine.prototype.checkCollision = function(){
  UnitGroups.checkCollisions();
};

Engine.prototype.step = function(){
  UnitGroups.step();
};

Engine.prototype.drawAll = function(){
  var that = this;

  // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  var centerX = this.mapCenter[0] - (this.renderer.width/2)
  var centerY = this.mapCenter[1] - (this.renderer.height/2);


  UnitGroups.draw(this.mainStage, [centerX, centerY])
  this.renderer.render(this.mainStage)

};


module.exports = Engine;


