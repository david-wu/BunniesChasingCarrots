var BaseUnit = require('./_baseUnit.js')

function Food(unitGroups, options){
    BaseUnit.call(this, arguments);
    _.extend(this, {
        maxVelocity: 2,
        type: ['food'],
    });
    _.extend(this, options)

    this.unitGroup = unitGroups.foods;
    this.unitGroup.push(this);

    // var that = this;
    // this.on('step', function(){
    //     that.wander(that.parent && that.parent.pos, 0.5)
    // });
}

Food.prototype = Object.create(BaseUnit.prototype)

Food.prototype.act = function(){
    if(this.age % 100 === 0){
        this.wander(this.parent && this.parent.pos, 0.5)
    }
}

Food.prototype.wander = function(leashPos, leashStrength){
    this.vel = new Vector({
        radians: Math.PI*2*Math.random(),
        magnitude: this.maxVelocity,
    });

    if(leashPos){
        this.vel = leashPos.subtract(this.pos).setMagnitude(this.maxVelocity*leashStrength).add(this.vel).setMagnitude(this.maxVelocity)
    }
};


module.exports = Food;