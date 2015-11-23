var Food = require('./food.js');
var BaseUnit = require('./_baseUnit.js');

function Forest(unitGroups, options){
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
    this.unitGroup = this.unitGroups.forests;
    this.unitGroup.push(this);

    var that = this;
    this.on('step', function(){
        if(that.age%3 === 0){
            that.spawnFood();
        }
    });
}

Forest.prototype = Object.create(BaseUnit.prototype)

Forest.prototype.step = function(){
    this.age++;
}

// Randomly spawns a food within forest
Forest.prototype.spawnFood = function(units){
    var foodPos = this.pos.add(new Vector({
        magnitude: this.radius*Math.random(),
        radians: Math.PI*2*Math.random(),
    }));

    new Food(this.unitGroups, {
        pos: foodPos,
        parent: this,
    });
}

module.exports = Forest;