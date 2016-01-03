
var QuadNode = require('../../services/quadNode.js');

function UnitGroup(options){
    UnitGroup.validate(options);
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

    this.parentStage.addChild(this.container);
}

UnitGroup.validate = function(options){
    if(!options.parentStage){
        console.log('unitGroup requires parentStage');
    }
}

UnitGroup.prototype.addCanCollideWith = function(unitGroups, frequencyFactor){
    if(!unitGroups){return;}
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

// Updates unit.collisions array and emits 'collision' events
// A posisble problem is that a unitGroup can only has a single collisionCheckFrequency
// Different groups it can collide with don't have its own collisionCheckFrequency
UnitGroup.prototype.checkCollisions = function(){
    if(this.collisionCheckCount++ % this.collisionCheckFrequency !== 0){return;}

    this.parent.convertNamesToGroups(this.canCollideWith);

    for(var i=0, l=this.canCollideWith.length; i<l; i++){
        this.checkCollisionWithGroup(this.canCollideWith[i]);
    }
};

// Runs physical laws like updating vel, pos, drag
UnitGroup.prototype.step = function(){
    for(var i=0, l=this.units.length; i<l; i++){
        this.units[i].step();
    }
};

// Runs unit logic like hunting, wandering
UnitGroup.prototype.act = function(){
    for(var i=0, l=this.units.length; i<l; i++){
        this.units[i].act();
    }
};

UnitGroup.prototype.draw = function(){
    for(var i=0, l=this.units.length; i<l; i++){
        this.units[i].draw(this.container);
    }
};

// Checks for collisions with units of another unitGroup
UnitGroup.prototype.checkCollisionWithGroup = function(unitGroup){

    this.clearCollisionsWithGroup(unitGroup);

    var quadNodes = this.getQuadNodes(unitGroup);
    for(var m = 0, n = quadNodes.length; m < n; m++){

        var group1 = quadNodes[m].contentGroups[0];
        var group2 = quadNodes[m].contentGroups[1];
        for(var i = 0, iLength = group1.length; i < iLength; i++){
            for(var j = 0, jLength = group2.length; j < jLength; j++){
                // group1[i].checkCollision(group2[j])
                group1[i].checkCollisionCheap(group2[j])
            }
        }
    }
}

UnitGroup.prototype.getQuadNodes = function(unitGroup){
    return new QuadNode({
        contentGroups: [this.units, unitGroup.units],
        bounds: this.collisionBounds,
    }).divide().allContentNodes();
};

// Clears out stale collisions and boxBounds with another unitGroup
UnitGroup.prototype.clearCollisionsWithGroup = function(unitGroup){
    for(var i=0, l=this.units.length; i<l; i++){
        this.units[i].collisions[unitGroup.name] = {};
        this.units[i].boxBounds = undefined;
    }

    for(var j=0, k=unitGroup.units.length; j<k; j++){
        unitGroup.units[j].boxBounds = undefined;
    }

};

UnitGroup.prototype.add = function(unit){
    unit.group = this;
    this.units.push(unit);

    return this;
};

UnitGroup.prototype.remove = function(unit){
    var index = this.units.indexOf(unit);
    if(index !== -1){
        this.units.splice(index, 1);
    }
};

UnitGroup.prototype.toString = function(){
    return this.name;
};

module.exports = UnitGroup;

