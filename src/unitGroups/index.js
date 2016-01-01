var UnitModels = require('./unitModels');
var UnitGroup = require('./unitGroup.js');

function UnitGroups(options){
    this.collisionBounds = options.mapBounds.slice();
    this.groups = {};
    this.groupsArr = [];
    this.mapCenter = [0, 0];
    this.stage = new PIXI.Container();

    this.initModels(UnitModels);
}

UnitGroups.prototype.initModels = function(models){
    var that = this;
    _.each(UnitModels, function(unitModel){
        that.addUnitGroup(unitModel.configs);
    });
};

UnitGroups.prototype.createUnit = function(unitClassName, options){
    options.unitGroups = options.unitGroups || this;
    var unitModel = UnitModels[unitClassName];

    if(typeof unitModel !== 'function'){debugger;}
    var unit = new unitModel(options);
    this.addUnit(unitModel.configs.name, unit);
    return unit;
}

UnitGroups.prototype.setCollisionBounds = function(bounds){
    for(var i = 0, l = bounds.length; i < l; i++){
        this.collisionBounds[i] = bounds[i];
    }
    return this;
};

UnitGroups.prototype.tick = function(){
    var width = this.collisionBounds[2]-this.collisionBounds[0];
    var height = this.collisionBounds[3]-this.collisionBounds[1];
    var offset = [this.mapCenter[0] - (width/2), this.mapCenter[1] - (height/2)];
    for(var i=0, l=this.groupsArr.length; i<l; i++){
        var group = this.groupsArr[i];
        if(group.checkCollisions){
            group.checkCollisions();
        }
        if(group.act){
            group.act();
        }
        if(group.step){
            group.step();
        }
        if(group.draw){
            group.draw(offset);
        }
    }
    // this.renderer.render(this.stage);
};

UnitGroups.prototype.addUnitGroup = function(options){
    options.parent = this;
    options.parentStage = options.parentStage || this.stage;
    options.collisionBounds = options.collisionBounds || this.collisionBounds;

    this.groups[options.name] = new UnitGroup(options);
    this.groups[options.name].addCanCollideWith(options.canCollideWith);

    return this.groupsArr.push(this.groups[options.name]);
};

UnitGroups.prototype.addUnit = function(groupName, unit){
    return this.groups[groupName].add(unit);
};

UnitGroups.prototype.convertNamesToGroups = function(array){
    for(var i=0, l=array.length; i<l; i++){
        if(typeof array[i] === 'string'){
            array[i] = this.groups[array[i]];
        }
    }
};

module.exports = UnitGroups;

