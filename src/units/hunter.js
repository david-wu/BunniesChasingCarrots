var UnitGroups = require('../unitGroups');
var BaseUnit = require('./_baseUnit.js');
var Vision = require('./vision.js');

UnitGroups.addUnitGroup({
    name: 'hunter',
    container: new PIXI.Container(),
    collisionCheckFrequency: 2,
});

UnitGroups.groups.hunter.addCanCollideWith('food');


function Hunter(options){
    var that = this;
    BaseUnit.apply(this, arguments);
    _.extend(this, {
        color: 'red',
        radius: 5,
        drag: 0,
        maxVelocity: 0.5,
        pos: Vector(Math.random()*2*Math.PI, Math.random()*450),
        spritePath: './bunny.png',
        tint: Math.random() * 0xFFFFFF,
    });
    _.extend(this, options);


    this.vision = new Vision({
        parent: this,
    });

    UnitGroups.addUnit('hunter', this);
}

Hunter.prototype = Object.create(BaseUnit.prototype);

Hunter.prototype.act = function(){
    var foodIds = Object.keys(this.collisions.food)
    for(var i=0, l=foodIds.length; i<l; i++){
        this.collisions.food[foodIds[i]].destroy();
        this.vision.radius = this.vision.initialRadius;
    }

    if(this.age%5 === 0){
        this.hunt();
    }
}

Hunter.prototype.hunt = function(){
    var that = this;

    // stops hunting previous target
    if(this.hunting){
        this.hunting.hunted = false;
        this.hunting = false;
    }

    var candidateKeys = Object.keys(this.vision.collisions.food);

    var closestUnit, closestDistance
    for(var i=0,l=candidateKeys.length; i<l; i++){
        var unit = this.vision.collisions.food[candidateKeys[i]];
        if(unit.hunted){
            continue;
        }

        if(!closestUnit){
            closestUnit = unit;
        }else{

            // Don't calculate distanceFrom(closestUnit) until there is another possible closestUnit
            if(closestDistance === undefined){
                closestDistance = this.distanceFrom(closestUnit);
            }

            var contendingDistance = this.distanceFrom(unit);
            if(contendingDistance < closestDistance){
                closestDistance = contendingDistance;
                closestUnit = unit;
            }
        }
    }

    if(closestUnit){
        this.huntUnit(closestUnit)
        return;
    }

    // Stop hunting if no candidates
    this.vel.coords = [0,0];
    this.hunting = false;
    this.vision.radius += 10;
};

Hunter.prototype.huntUnit = function(unit){
    this.hunting = unit;
    unit.hunted = this;
    this.goto(unit.pos);
};

module.exports = Hunter;

