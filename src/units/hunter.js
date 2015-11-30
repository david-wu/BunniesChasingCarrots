var UnitGroups = require('../services/unitGroups.js');
var BaseUnit = require('./_baseUnit.js');
var Vision = require('./vision.js');

function Hunter(options){
    var that = this;
    BaseUnit.apply(this, arguments);
    _.extend(this, {
        radius: 10,
        color: 'red',
        radius: 3,
        drag: 0,
        maxVelocity: 0.5,
        pos: new Vector({
            magnitude: Math.random()*450,
            radians: Math.random()*2*Math.PI,
        }),
    });
    _.extend(this, options);


    this.vision = new Vision({
        parent: this,
    });

    this.on('collision', function(unit){
        if(_.includes(unit.type, 'food')){
            unit.emit('destroy');
        }
        _.remove(that.vision.sees, function(n){
            return n===unit;
        });
        that.vision.radius = that.vision.initialRadius;
    });

    UnitGroups.addUnit('hunter', this)
}

Hunter.prototype = Object.create(BaseUnit.prototype);

Hunter.prototype.act = function(){
    if(this.age%10 === 0){
        this.hunt();
    }
}

Hunter.prototype.hunt = function(){
    // if(this.age%10!==0){return;}
    var that = this;

    // stops hunting previous target
    if(this.hunting){
        this.hunting.hunted = false;
        this.hunting = false;
    }

    var foodCandidates = _.filter(this.vision.sees, function(unit){
        return !unit.hunted;
    });

    if(foodCandidates.length){
        this.huntUnit(this.closestUnit(foodCandidates));
        this.vision.sees = [];
        return;
    }

    // Stop hunting if no candidates
    this.vel.coords = [0,0];
    this.hunting = false;
    this.vision.radius+=5;
    this.vision.sees = [];
    return;
};

Hunter.prototype.wander = function(){}

Hunter.prototype.huntUnit = function(unit){
    this.hunting = unit;
    unit.hunted = this;
    this.goto(unit.pos);
};

module.exports = Hunter;

