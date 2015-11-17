var Emitter = require('../services/emitter.js');
var Vector = require('../services/vector.js');

function BaseUnit(){
    _.defaults(this,{
        pos: new Vector({magnitude:0, radians:0}),
        vel: new Vector({magnitude:0, radians:0}),
        maxVelocity: 10,
        drag: 0.1,
        radius: 10,
        color: 'green',
        age: 0,
    });
    Emitter(this);

    this.on('step', this.step.bind(this))
}

BaseUnit.prototype.step = function(){
    this.pos = this.pos.add(this.vel);
    this.vel.magnitude = this.vel.magnitude * (1-this.drag);
    this.age++;
}

// Changes unit's velocity to go towards a position vector
BaseUnit.prototype.goto = function(pos){
    this.vel = pos.subtract(this.pos);

    // Slows down to not overshoot
    if(this.vel.magnitude < this.maxVelocity*10){
        this.vel.magnitude /= 10;
    }else{
        this.vel.magnitude = this.maxVelocity;
    }
}

BaseUnit.prototype.closestUnit = function(units){
    var that = this;
    return _.min(units, function(unit){
        if(unit === that){return;}
        return that.pos.distanceFrom(unit.pos);
    });
};

BaseUnit.prototype.draw = function(ctx, posShift){
    var posCoord = this.pos.toCoord();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(posCoord[0]-posShift[0], posCoord[1]-posShift[1], this.radius, 0, 2 * Math.PI, false);
    ctx.fill();
}

module.exports = BaseUnit;