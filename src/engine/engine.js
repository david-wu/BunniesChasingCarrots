var UnitGroups = require('../services/unitGroups.js');
var User = require('../models/user.js');
var UserSelectionBox = require('../models/userSelectionBox.js');

function Engine(renderer){
  this.renderer = renderer;
  this.mapCenter = [0, 0];

  // create the root of the scene graph
  this.mainStage = new PIXI.Container();

  UnitGroups.setCollisionBounds([-(this.renderer.width/2),-(this.renderer.height/2),(this.renderer.width/2),(this.renderer.height/2)]);
  UnitGroups.setStage(this.mainStage);
  UnitGroups.initializeGroups();


  this.createInitialUnits();

  var selBox = new UserSelectionBox();

}

Engine.prototype.createInitialUnits = function(){
  this.createTestEcosystem(3, 200);
  this.createTestEcosystem(6, 400);
  this.createTestEcosystem(12, 600);
  // this.createTestEcosystem(24, 800);
  // this.createTestEcosystem(48, 1000);
};

Engine.prototype.createTestEcosystem = function(count, radius){
  var Hunter = require('../units/hunter.js');
  var Forest = require('../units/forest.js');
  var that = this;
  _.times(count, function(i){
    var forest = new Forest({pos: new Vector({magnitude:radius, radians: i/count*2*Math.PI})});
    _.times(10, function(){
      new Hunter({
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

Engine.prototype.tick = function(){
  var offSet = [this.mapCenter[0] - (this.renderer.width/2), this.mapCenter[1] - (this.renderer.height/2)];

  UnitGroups.checkCollisions();
  UnitGroups.step();
  UnitGroups.draw(offSet);
  this.renderer.render(this.mainStage);

  requestAnimationFrame(this.tick.bind(this));
};


module.exports = Engine;


