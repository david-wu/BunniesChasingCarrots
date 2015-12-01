
var UnitGroup = require('./unitGroup.js');


function UnitGroups(){
    this.collisionBounds = [];
    this.groups = {}
    this.groupsByDrawOrder = [];
}

// Overrites array with values given in bounds
UnitGroups.prototype.setCollisionBounds = function(bounds){
    for(var i = 0, l = bounds.length; i<l; i++){
        this.collisionBounds[i] = bounds[i];
    }
};

UnitGroups.prototype.setStage = function(stage){
    this.stage = stage;
};

UnitGroups.prototype.initializeGroups = function(){

    this.addUnitGroup({
        name: 'hunterVision',
        parentStage: this.stage,
        collisionBounds: this.collisionBounds,
        collisionCheckFrequency: 10,
        draw: false,
    });

    this.addUnitGroup({
        name: 'food',
        parentStage: this.stage,
        collisionBounds: this.collisionBounds,
    });

    this.addUnitGroup({
        name: 'hunter',
        parentStage: this.stage,
        collisionBounds: this.collisionBounds,
        container: new PIXI.Container(),
    });

    this.addUnitGroup({
        name: 'forest',
        parentStage: this.stage,
        collisionBounds: this.collisionBounds,
        draw: false,
    });

    this.addUnitGroup({
        name: 'userSelectionBox',
        parentStage: this.stage,
        collisionBounds: this.collisionBounds,
    });

    this.groups.hunterVision.addCanCollideWith(this.groups.food);
    this.groups.hunter.addCanCollideWith(this.groups.food);
    this.groups.userSelectionBox.addCanCollideWith([this.groups.hunter, this.groups.food]);
};

UnitGroups.prototype.addUnit = function(groupName, unit){
    return this.groups[groupName].add(unit);
};

UnitGroups.prototype.addUnitGroup = function(unitGroupOptions){
    var unitGroup = new UnitGroup(unitGroupOptions);
    this.groups[unitGroupOptions.name] = unitGroup;
};

UnitGroups.prototype.checkCollisions= function(){
    _.each(this.groups, function(group){
        group.checkCollisions();
    });
};

UnitGroups.prototype.draw = function(offset){
    _.each(this.groups, function(group){
        if(group.draw){
            group.draw(offset);
        }
    });
};

UnitGroups.prototype.step = function(){
    _.each(this.groups, function(group,key){
        _.each(group.units, function(unit){
            if(unit){
                unit.step();
                unit.act();
            }
        });
    });
}

module.exports = new UnitGroups();