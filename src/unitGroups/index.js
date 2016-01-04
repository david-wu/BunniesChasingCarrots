var UnitModels = require('./unitModels');
var UnitGroup = require('./services/unitGroup.js');

function UnitGroups(options){
    this.groups = {};
    this.collisionBounds = options.collisionBounds;
    this.stage = new PIXI.Container();
    this.initModels();
}

UnitGroups.prototype.tick = function(){
    _.each(this.groups, function(group){
        group.tick();
    });
};

UnitGroups.prototype.addUnitGroup = function(unitGroup){
    this.groups[unitGroup.name] = unitGroup;
};

UnitGroups.prototype.addUnit = function(groupName, unit){
    this.groups[groupName].add(unit);
};

UnitGroups.prototype.createUnitGroup = function(options){
    options.parent = this;
    var unitGroup = new UnitGroup(options);
    this.addUnitGroup(unitGroup);
    return unitGroup;
};

UnitGroups.prototype.createUnit = function(unitClassName, options){
    options.unitGroups = this;
    var UnitModel = UnitModels[unitClassName];
    var unit = new UnitModel(options);
    this.addUnit(UnitModel.configs.name, unit);
    return unit;
};

UnitGroups.prototype.initModels = function(){
    var that = this;
    _.each(UnitModels, function(unitModel){
        that.createUnitGroup(unitModel.configs);
    });
};

module.exports = UnitGroups;

