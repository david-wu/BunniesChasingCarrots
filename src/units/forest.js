var Food = require('./food.js');
var BaseUnit = require('./_baseUnit.js');
var UnitGroups = require('../services/unitGroups.js');


function Forest(options){
    BaseUnit.apply(this, arguments);
    _.extend(this, {
        radius: 300,
        color: 'green',
        opacity: 0.1,
        maxVelocity: 2,
        type: ['forest'],
        pos: new Vector({
            magnitude: 200,
            radians: Math.random()*2*Math.PI,
        }),
    });
    _.extend(this, options)

    UnitGroups.addUnit('forest', this)
}

Forest.prototype = Object.create(BaseUnit.prototype)

Forest.prototype.act = function(){
    if(this.age%10 === 0){
        this.spawnFood();
    }
}

Forest.prototype.step = function(){
    this.age++;
}

// Randomly spawns a food within forest
Forest.prototype.spawnFood = function(units){
    var foodPos = this.pos.add(new Vector({
        magnitude: this.radius*Math.random(),
        radians: Math.PI*2*Math.random(),
    }));

    new Food({
        pos: foodPos,
        parent: this,
    });
}

module.exports = Forest;