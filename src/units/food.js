var BaseUnit = require('./_baseUnit.js')

function Food(){

    BaseUnit.call(this);
    _.extend(this, {
        type: ['food'],
        pos: new Vector({
            magnitude: Math.random()*300,
            radians: Math.random()*2*Math.PI,
        })
    })

    this.on('step', this.wander.bind(this));
}

Food.prototype = Object.create(BaseUnit.prototype)

Food.prototype.wander = function(units){
    if(this.age % 100 === 0){
        this.vel = new Vector({
            degrees: Math.random()*360,
            magnitude: 10,
        });
    }
};


module.exports = Food;