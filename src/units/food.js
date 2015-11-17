var BaseUnit = require('./_baseUnit.js')

function Food(unitGroup, options){
    BaseUnit.call(this, unitGroup);
    _.extend(this, {
        maxVelocity: 2,
        type: ['food'],
        pos: new Vector({
            magnitude: Math.random()*300,
            radians: Math.random()*2*Math.PI,
        })
    });
    _.extend(this, options)

    this.on('step', this.wander.bind(this));
}

Food.prototype = Object.create(BaseUnit.prototype)

Food.prototype.wander = function(units){
    if(this.age % 100 === 0){
        this.vel = new Vector({
            degrees: Math.random()*360,
            magnitude: this.maxVelocity,
        });
    }
};


module.exports = Food;