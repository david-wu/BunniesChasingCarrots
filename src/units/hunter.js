var BaseUnit = require('./_baseUnit.js');



function Hunter(){
    BaseUnit.call(this);
    _.extend(this, {
        color: 'red',
        radius: 15,
        drag: 0,
        maxVelocity: 2,
        pos: new Vector({
            magnitude: Math.random()*100,
            radians: Math.random()*2*Math.PI,
        }),
    });

    this.on('step', this.hunt.bind(this));
}


Hunter.prototype = Object.create(BaseUnit.prototype);


Hunter.prototype.hunt = function(units){
    var that = this;

    if(this.hunting){
        this.hunting.hunted = false;
    }

    var foodCandidates = _.filter(units, function(unit){
        return _.includes(unit.type, 'food') && !unit.hunted
    });
    var closestFood = this.closestUnit(foodCandidates);
    closestFood.hunted = true;
    this.hunting = closestFood;

    this.goto(closestFood.pos);

    if(this.pos.subtract(closestFood.pos).magnitude < 1){
        console.log('destroyed', closestFood)
        closestFood.emit('destroy');
        this.hunting = false;
    }

}

module.exports = Hunter;

