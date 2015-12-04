/*
    UnitGroups is a singleton/global that manages unitGroup instances
    Units are automatically added into UnitGroups
    Engine runs collision, step, act, and draw steps
    Requires a PIXI renderer to be set
*/

var UnitGroup = require('./unitGroup.js');

function UnitGroups(){
    this.groups = {};
    this.groupsByDrawOrder = [];
    this.mapCenter = [0, 0];
    this.collisionBounds = [0, 0, 0, 0];

    this.stage = new PIXI.Container();
}

UnitGroups.prototype.setRenderer = function(renderer){
  this.renderer = renderer;
  this.modifyCollisionBounds([-this.renderer.width/2, -this.renderer.height/2, this.renderer.width/2, this.renderer.height/2]);
};

UnitGroups.prototype.modifyCollisionBounds = function(bounds){
    for(var i = 0, l = bounds.length; i < l; i++){
        this.collisionBounds[i] = bounds[i];
    }
};

UnitGroups.prototype.addUnitGroup = function(options){
    options.parent = this;
    options.parentStage = options.parentStage || this.stage;
    options.collisionBounds = options.collisionBounds || this.collisionBounds;

    this.groups[options.name] = new UnitGroup(options);
};

UnitGroups.prototype.convertNamesToGroups = function(array){
    for(var i=0, l=array.length; i<l; i++){
        if(typeof array[i] === 'string'){
            array[i] = this.groups[array[i]];
        }
    }
};

UnitGroups.prototype.addUnit = function(groupName, unit){
    return this.groups[groupName].add(unit);
};

UnitGroups.prototype.tick = function(){
    this.checkCollisions();
    this.step();
    this.act();
    this.draw();
}

UnitGroups.prototype.checkCollisions= function(){
    var groupKeys = Object.keys(this.groups);
    for(var i=0, l=groupKeys.length; i<l; i++){
        var group = this.groups[groupKeys[i]]
        if(group){group.checkCollisions();}
    }
};

UnitGroups.prototype.step = function(){
    var groupKeys = Object.keys(this.groups);
    for(var i=0,l=groupKeys.length; i<l; i++){
        var group = this.groups[groupKeys[i]];
        if(group.step){group.step();}
    }
};

UnitGroups.prototype.act = function(){
    var groupKeys = Object.keys(this.groups);
    for(var i=0,l=groupKeys.length; i<l; i++){
        var group = this.groups[groupKeys[i]];
        if(group.act){group.act();}
    }
};

UnitGroups.prototype.draw = function(){
    var offset = [this.mapCenter[0] - (this.renderer.width/2), this.mapCenter[1] - (this.renderer.height/2)];

    var groupKeys = Object.keys(this.groups);
    for(var i=0,l=groupKeys.length; i<l; i++){
        var group = this.groups[groupKeys[i]];
        if(group.draw){group.draw(offset);}
    }
    this.renderer.render(this.stage);
};

module.exports = new UnitGroups();

