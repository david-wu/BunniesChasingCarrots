var UnitModels = require('./unitModels');
var UnitGroup = require('./services/unitGroup.js');

function UnitGroups(options){
    this.groups = {};
    this.collisionBounds = options.mapBounds.slice();
    this.stage = new PIXI.Container();
    this.initModels();
}

UnitGroups.prototype.tick = function(){
    _.each(this.groups, function(group){
        group.tick();
    });
};

UnitGroups.prototype.initModels = function(){
    var that = this;
    _.each(UnitModels, function(unitModel){
        that.createUnitGroup(unitModel.configs);
    });
};

UnitGroups.prototype.createUnitGroup = function(options){
    options.parent = this;
    this.addUnitGroup(new UnitGroup(options));
};

UnitGroups.prototype.addUnitGroup = function(unitGroup){
    this.groups[unitGroup.name] = unitGroup;
};

UnitGroups.prototype.createUnit = function(unitClassName, options){
    options.unitGroups = this;
    var UnitModel = UnitModels[unitClassName];
    var unit = new UnitModel(options);
    this.addUnit(UnitModel.configs.name, unit);
    return unit;
};

UnitGroups.prototype.addUnit = function(groupName, unit){
    return this.groups[groupName].add(unit);
};

module.exports = UnitGroups;

