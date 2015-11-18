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
}

BaseUnit.prototype.destroy = function(){
    var index = this.unitGroup.indexOf(this);
    if(index !== -1){
        this.unitGroup.splice(index, 1);
    }
}

BaseUnit.prototype.step = function(){
    this.pos = this.pos.add(this.vel);
    this.vel.applyLinearDrag(this.drag);
    this.age++;
}

// Changes unit's velocity to go towards a position vector
BaseUnit.prototype.goto = function(pos){
    if(!pos){return;}
    this.vel = pos.subtract(this.pos);
    this.vel = this.vel.setMagnitude(this.maxVelocity)
}

// // Finds closestUnit by traversing the quadTree
// BaseUnit.prototype.closestUnit = function(unitFilter){
//     var that = this;
//     unitFilter = unitFilter || function(unit){
//         if(unit === that){return false;}
//         return true;
//     }

//     var candidates = [];
//     var currentNode = this.quadNode;
//     while(!candidates.length && currentNode){
//         candidates = _.filter(_.flatten(currentNode.allContents()), unitFilter);
//         currentNode = currentNode.parent;
//     }

//     if(!candidates.length){return;}
//     return _.min(candidates, function(unit){
//         return that.distanceFrom(unit);
//     })
// };

BaseUnit.prototype.closestUnit = function(units){
    var that = this;
    return _.min(units, function(unit){
        if(unit === that){return;}
        return that.distanceFrom(unit);
    });
};

BaseUnit.prototype.distanceFrom = function(unit){
    return this.pos.distanceFrom(unit.pos);
}

BaseUnit.prototype.hitBox = function(unit){
    var coords = this.pos.coords;
    return [coords[0]-this.radius, coords[1]-this.radius, coords[0]+this.radius, coords[1]+this.radius];
}

BaseUnit.prototype.draw = function(ctx, posShift){
    var posCoord = this.pos.coords;
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();
    ctx.arc(posCoord[0]-posShift[0], posCoord[1]-posShift[1], this.radius, 0, 2 * Math.PI, false);
    ctx.fill();
}

module.exports = BaseUnit;