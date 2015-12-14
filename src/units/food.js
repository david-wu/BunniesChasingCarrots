var UnitGroups = require('../unitGroups');
var BaseUnit = require('./_baseUnit.js')

UnitGroups.addUnitGroup({
    name: 'food',
});

function Food(options){
    BaseUnit.call(this, arguments);
    this.radius = 5;
    this.maxVelocity = 2;
    this.type = ['food'];
    this.spritePath = './carrot.png';
    this.pos = options.pos;
    this.parent = options.parent;

    UnitGroups.addUnit('food', this);
}

Food.prototype = Object.create(BaseUnit.prototype)

Food.prototype.act = function(){
    if(this.age % 100 === 0){
        this.wander(this.parent && this.parent.pos, 0.5)
    }
}

Food.prototype.wander = function(leashPos, leashStrength){
    this.vel = Vector.radial(Math.PI*2*Math.random(), this.maxVelocity);

    if(leashPos){
        this.vel = leashPos
            .subtract(this.pos)
            .setMagnitude(this.maxVelocity*leashStrength)
            .add(this.vel)
            .setMagnitude(this.maxVelocity)
    }
};


module.exports = Food;