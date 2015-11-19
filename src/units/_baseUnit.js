var Emitter = require('../services/emitter.js');

function BaseUnit(unitGroup){
    _.defaults(this,{
        pos: new Vector({magnitude:0, radians:0}),
        vel: new Vector({magnitude:0, radians:0}),
        opacity: 1,
        maxVelocity: 2,
        drag: 0.1,
        radius: 2,
        color: 'green',
        age: 0,
        attributes: [],
        commands: [],
    });
    Emitter(this);
    this.unitGroup = unitGroup;
    this.unitGroup.push(this);
    this.on('step', this.step.bind(this));
    this.on('destroy', this.destroy.bind(this));
    // this.on('collision', this.reverseVel.bind(this));

}

BaseUnit.prototype.step = function(){
    if(!this.pos){return;}
    this.pos = this.pos.add(this.vel);
    this.vel.applyLinearDrag(this.drag);
    this.age++;
}

BaseUnit.prototype.destroy = function(){
    var index = this.unitGroup.indexOf(this);
    if(index !== -1){
        this.unitGroup.splice(index, 1);
    }
}

BaseUnit.prototype.reverseVel = function(pos){
    this.vel = new Vector({
        coords: _.map(this.vel.coords, function(d){return -d;})
    });
}

// Changes unit's velocity to go towards a position vector
BaseUnit.prototype.goto = function(pos){
    if(!pos){return;}
    this.vel = pos.subtract(this.pos);
    this.vel = this.vel.setMagnitude(this.maxVelocity)
}

BaseUnit.prototype.closestUnit = function(units){
    var that = this;
    return _.min(units, function(unit){
        if(unit === that){return;}
        return that.distanceFrom(unit);
    });
};

BaseUnit.prototype.distanceFrom = function(unit){
    var pos1 = this.pos || this.parent.pos;
    var pos2 = unit.pos || unit.parent.pos;
    return pos1.distanceFrom(pos2);
}

BaseUnit.prototype.hitBox = function(unit){
    var pos = this.pos || this.parent.pos;
    var coords = pos.coords;
    return [coords[0]-this.radius, coords[1]-this.radius, coords[0]+this.radius, coords[1]+this.radius];
}

BaseUnit.prototype.draw = function(ctx, posShift){
    var pos = this.pos || this.parent.pos;
    var posCoord = pos.coords;
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();
    ctx.arc(posCoord[0]-posShift[0], posCoord[1]-posShift[1], this.radius, 0, 2 * Math.PI, false);
    ctx.fill();
}

module.exports = BaseUnit;