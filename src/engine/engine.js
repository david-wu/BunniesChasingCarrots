var UnitGroups = require('./unitGroups.js');
var UserSelectionBox = require('../models/userSelectionBox.js');

function Engine(){
  this.createInitialUnits();
}

Engine.prototype.createInitialUnits = function(){
  this.createTestEcosystem(3, 200);
  // this.createTestEcosystem(6, 400);
  // this.createTestEcosystem(12, 600);
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
  UnitGroups.tick();
  requestAnimationFrame(this.tick.bind(this));
};


module.exports = Engine;


