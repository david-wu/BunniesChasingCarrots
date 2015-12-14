var UnitGroups = require('../unitGroups');
var UserSelectionBox = require('../units/userSelectionBox.js');

function Engine(stage, renderer){

  this.stage = stage;
  this.renderer = renderer;
  this.createInitialUnits();
}

Engine.prototype.createInitialUnits = function(){
  this.createTestEcosystem(4, 250);
  this.createTestEcosystem(9, 500);
  this.createTestEcosystem(16, 750);
  this.createTestEcosystem(25, 1000);
  this.createTestEcosystem(36, 1250);
};

Engine.prototype.createTestEcosystem = function(count, radius){
  var Hunter = require('../units/hunter.js');
  var Forest = require('../units/forest.js');
  var that = this;

  _.times(count, function(i){
    var forest = new Forest({pos: Vector.radial(i/count*2*Math.PI, radius)});
    _.times(8, function(){
      new Hunter({
        pos: forest.pos.add(Vector.radial(Math.random()*2*Math.PI, Math.random()*forest.radius)),
      });
    });
  });
};

Engine.prototype.start = function(){
  this.tick();
};

Engine.prototype.tick = function(){
  UnitGroups.tick();

  // this.hud.draw();
  this.renderer.render(this.stage);
  requestAnimationFrame(this.tick.bind(this));
};


module.exports = Engine;


