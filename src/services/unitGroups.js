
var UnitGroup = require('./unitGroup.js');


function UnitGroups(options){
    var that = this;

    this.absoluteBounds = [];
    var defaultUnitGroupOptions = {
        collisionBounds: this.absoluteBounds
    };
    _.defaults(this, {
        groups: {
            hunterVision: new UnitGroup(defaultUnitGroupOptions),
            food: new UnitGroup(defaultUnitGroupOptions),
            hunter: new UnitGroup(defaultUnitGroupOptions),
            forest: new UnitGroup(defaultUnitGroupOptions),
        },
    });
    _.extend(this, options);

    this.groups.hunterVision.addCanCollideWith(this.groups.food);
    this.groups.hunter.addCanCollideWith(this.groups.food);
}

// Overrites array with values given in bounds
UnitGroups.prototype.setAbsoluteBounds = function(bounds){
    for(var i = 0, l = bounds.length; i<l; i++){
        this.absoluteBounds[i] = bounds[i]
    }
}

UnitGroups.prototype.addUnit = function(groupName, unit){
    var group = this.groups[groupName] || this.addUnitGroup({name: groupName})
    group.add(unit);
};

UnitGroups.prototype.addUnitGroup = function(unitGroup){
    return this.groups[unitGroup.name] = new UnitGroup(unitGroup);
}

UnitGroups.prototype.checkCollisions= function(){
    _.each(this.groups, function(group){
        group.checkCollisions();
    })
}

UnitGroups.prototype.draw = function(stage, offSet){
    _.each(this.groups, function(group,key){
        if(key === 'forest'){return}
        _.each(group.units, function(unit){
            unit.draw(stage, offSet);
        })
    })
}

UnitGroups.prototype.step = function(){
    _.each(this.groups, function(group,key){
        _.each(group.units, function(unit){
            if(unit){
                unit.step();
                unit.act();
            }
        })
    })
}

module.exports = new UnitGroups();