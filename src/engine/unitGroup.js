
var QuadNode = require('../services/quadNode.js');

function UnitGroup(options){
    _.extend(this, options);
    _.defaults(this, {
        units: [],
        canCollideWith: [],
        collisionBounds: [],
        collisionCheckFrequency: 1,
        collisionCheckCount: 0,
        container: new PIXI.ParticleContainer(),
        drawLevel: 0,
    });

    this.validate();
    this.parentStage.addChild(this.container);
}

UnitGroup.prototype.validate = function(){
    if(!this.parentStage){
        console.log('unitGroup is missing parentStage', this);
    }
}

UnitGroup.prototype.addCanCollideWith = function(unitGroups, frequencyFactor){
    if(!(unitGroups instanceof Array)){
        unitGroups = [unitGroups];
    }
    frequencyFactor = frequencyFactor || 1;

    this.canCollideWith.push.apply(this.canCollideWith, unitGroups);

    return this.removeCanCollideWidth.bind(this, unitGroups);
}

UnitGroup.prototype.removeCanCollideWidth = function(unitGroups){
    var that = this;
    if(!(unitGroups instanceof Array)){
        unitGroups = [unitGroups];
    }

    _.each(unitGroups, function(unitGroup){
        var index = that.canCollideWith.indexOf(unitGroup);
        if(index !== -1){
            that.canCollideWith.splice(index, 1);
        }
        that.clearCollisionsWithGroup(unitGroup);
    });
};


// Updates unit.collisions and emits 'collision' events
UnitGroup.prototype.checkCollisions = function(){
    if(this.collisionCheckCount++ % this.collisionCheckFrequency !== 0){return;}
    var i,l;
    for(i=0, l=this.canCollideWith.length; i<l; i++){
        this.checkCollisionWithGroup(this.canCollideWith[i]);
    }
};

// Triggers physical laws like updating vel, pos, drag
UnitGroup.prototype.step = function(){
    var i,l;
    for(i=0,l=this.units.length; i<l; i++){
        this.units[i].step();
    }
};

// Triggers unit logic like hunting, wandering
UnitGroup.prototype.act = function(){
    var i,l;
    for(i=0,l=this.units.length; i<l; i++){
        this.units[i].act();
    }
};

// Draws
UnitGroup.prototype.draw = function(offset){
    var i,l;
    for(i=0,l=this.units.length; i<l; i++){
        this.units[i].draw(this.container, offset);
    }
};

// Faster to only check unitGroups that can collide with this
UnitGroup.prototype.checkCollisionWithGroup = function(unitGroup){

    this.clearCollisionsWithGroup(unitGroup);

    var qn = new QuadNode({
        contentGroups: [this.units, unitGroup.units],
        bounds: this.collisionBounds,
    });

    var contentNodes = qn.allContentNodes();

    var m, n, contentNode;
    for(m=0, n=contentNodes.length; m<n; m++){
        contentNode = contentNodes[m];

        var contentGroup1 = contentNode.contentGroups[0];
        var contentGroup2 = contentNode.contentGroups[1];

        var i, j, iLength, jLength;
        var unit1;
        var unit2;
        for(var i = 0, iLength = contentGroup1.length; i < iLength; i++){
            for(var j = 0, jLength = contentGroup2.length; j < jLength; j++){
                unit1 = contentGroup1[i];
                unit2 = contentGroup2[j];
                if(unit1.distanceFrom(unit2) < (unit1.radius + unit2.radius)){
                    unit1.emit('collision', unit2);
                    unit1.collisions[unitGroup.name][unit2.id] = unit2;
                }
            }
        }
    }
}

// Typically used to clear out current collisions with another unitGroup
UnitGroup.prototype.clearCollisionsWithGroup = function(unitGroup){
    _.each(this.units, function(unit){
        unit.collisions[unitGroup.name] = {}
    });
}

UnitGroup.prototype.drawPrep = function(){
    // override
};

UnitGroup.prototype.drawFinish = function(){
    // override
};

UnitGroup.prototype.add = function(unit){
    unit.group = this;
    this.units.push(unit);

    unit.on('destroy', function(){
        unit.group.remove(unit);
    });

    return this;
};

UnitGroup.prototype.remove = function(unit){
    var index = this.units.indexOf(unit);
    if(index !== -1){
        this.units.splice(index, 1);
    }
};

module.exports = UnitGroup;

