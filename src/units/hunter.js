var BaseUnit = require('./_baseUnit.js');
var User = require('../models/user.js');


function Hunter(unitGroups, options){
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
    this.unitGroup = this.unitGroups.hunters;
    this.unitGroup.push(this);


    this.on('step', this.hunt.bind(this));
    this.on('collision', function(unit){
        if(_.includes(unit.type, 'food')){
            unit.emit('destroy');
            User.resources.foods++;
        }
        that.vision.radius = that.vision.initialRadius;
    });


    var that = this;
    this.sees = [];
    this.vision = new BaseUnit()
    _.extend(this.vision, {
        pos: undefined,
        parent: this,
        color: 'blue',
        opacity: 0.05,
        initialRadius: 50,
        radius: 50,
    });
    // this.vision.draw = _.noop;
    this.vision.unitGroup = unitGroups.hunterVisions;
    this.vision.unitGroup.push(this.vision)
    this.vision.on('collision', function(unit){
        if(_.includes(unit.type, 'food')){
            that.sees.push(unit);
        }
    });
    this.vision.step = _.noop;
}

Hunter.prototype = Object.create(BaseUnit.prototype);

Hunter.prototype.hunt = function(){
    if(this.age%10!==0){return;}
    var that = this;

    // stops hunting previous target
    if(this.hunting){
        this.hunting.hunted = false;
        this.hunting = false;
    }

    var foodCandidates = _.filter(this.sees, function(unit){
        return !unit.hunted;
    });

    if(foodCandidates.length){
        this.huntUnit(this.closestUnit(foodCandidates));
        this.sees = [];
        return;
    }

    // Stop hunting if no candidates
    this.vel.coords = [0,0];
    this.hunting = false;
    this.vision.radius+=2;
    this.sees = [];
    return;
};

Hunter.prototype.wander = function(){}

Hunter.prototype.huntUnit = function(unit){
    this.hunting = unit;
    unit.hunted = this;
    this.goto(unit.pos);
};

module.exports = Hunter;

