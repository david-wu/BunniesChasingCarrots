var Food = require('./food.js');
var BaseUnit = require('./_baseUnit.js');
var User = require('../models/user.js');

function Forest(unitGroups, options){

    BaseUnit.apply(this, arguments);
    _.extend(this, {
        radius: 100,
        color: 'green',
        opacity: 0.1,
        maxVelocity: 2,
        type: ['forest'],
        pos: new Vector({
            magnitude: 500,
            radians: Math.random()*2*Math.PI,
        }),
    });
    _.extend(this, options)
    this.unitGroup = this.unitGroups.forests;
    this.unitGroup.push(this);

    var that = this;
    this.on('step', function(){
        if(that.age%66===0){
            that.spawnFood();
            User.resources.foods--;
        }
    });
}

Forest.prototype = Object.create(BaseUnit.prototype)

// Forest.prototype.step = function(){
//     if(Math.random() < 1){
//         this.spawnFood()
//     }
// }

Forest.prototype.spawnFood = function(units){
    // Randomly spawns a food within this.radius
    var foodPos = this.pos.add(new Vector({
        magnitude: this.radius*Math.random(),
        degrees: 360*Math.random(),
    }))
    this.unitGroups.foods.push(new Food(this.unitGroups, {
        pos: foodPos
    }));
}

module.exports = Forest;