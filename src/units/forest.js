var Food = require('./food.js');
var BaseUnit = require('./_baseUnit.js');
var UnitGroups = require('../unitGroups');

UnitGroups.addUnitGroup({
    name: 'forest',
    draw: false,
});


function Forest(options){
    BaseUnit.apply(this, arguments);
    _.extend(this, {
        radius: 300,
        color: 'green',
        opacity: 0.1,
        maxVelocity: 2,
        type: ['forest'],
        pos: Vector.radial(Math.random()*2*Math.PI, 200),
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
    var foodPos = this.pos.add(Vector.radial(Math.PI*2*Math.random(), this.radius*Math.random()));

    new Food({
        pos: foodPos,
        parent: this,
    });
}

module.exports = Forest;