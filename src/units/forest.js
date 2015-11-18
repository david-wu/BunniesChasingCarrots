var Food = require('./food.js');
var BaseUnit = require('./_baseUnit.js')

function Forest(unitGroup, options){

    BaseUnit.apply(this, arguments);
    _.extend(this, {
        radius: 300,
        color: 'green',
        opacity: 0.1,
        maxVelocity: 2,
        type: ['forest'],
        pos: new Vector({
            coords: [0,0],
        }),
    });
    _.extend(this, options)

    this.on('step', this.spawnFood.bind(this));
}

Forest.prototype = Object.create(BaseUnit.prototype)

Forest.prototype.spawnFood = function(units){
    // if(Math.random() < 0.5){
        var foodPos = this.pos.add(new Vector({
            magnitude: this.radius*Math.random(),
            degrees: 360*Math.random(),
        }))
        units.push(new Food(this.unitGroup, {
            pos: foodPos
        }));
    // }
}

module.exports = Forest;