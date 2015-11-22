var BaseUnit = require('./_baseUnit.js')

function Veggie(unitGroups, options){
    BaseUnit.call(this, arguments);
    _.extend(this, {
        maxVelocity: 2,
        type: ['food'],
        pos: new Vector({
            magnitude: Math.random()*300,
            radians: Math.random()*2*Math.PI,
        }),
        color: 'orange',
        area: 10,
    });
    _.extend(this, options)

    this.unitGroup = unitGroups.foods;
    this.unitGroup.push(this);

    this.on('step', this.wander.bind(this));
}

Veggie.prototype = Object.create(BaseUnit.prototype);

Veggie.prototype.wander = function(units){

    if(this.age % 100 === 0){
        this.setArea(this.area+=20);
    }
};


module.exports = Veggie;