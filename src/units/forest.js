var Food = require('./food.js');
var BaseUnit = require('./_baseUnit.js')

function Forest(){

    BaseUnit.apply(this, arguments);
    _.extend(this, {
        radius: 150,
        color: 'green',
        opacity: 0.1,
        maxVelocity: 2,
        type: ['forest'],
        pos: new Vector({
            magnitude: Math.random()*300,
            radians: Math.random()*2*Math.PI,
        })
    });

    this.on('step', this.spawnFood.bind(this));
}

Forest.prototype = Object.create(BaseUnit.prototype)

Forest.prototype.spawnFood = function(units){
    if(Math.random() < 0.03){
        var foodPos = this.pos.add(new Vector({
            magnitude: this.radius*Math.random(),
            degrees: 360*Math.random(),
        }))
        units.push(new Food(this.unitGroup, {
            pos: foodPos
        }));
    }
}

module.exports = Forest;