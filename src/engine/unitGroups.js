/*
    UnitGroups is a singleton that manages unitGroup instances
    Requires a PIXI renderer to be set
    Units are added into UnitGroups
    Engine runs UnitGroup's collision, step, act, and draw functions
*/

var UnitGroup = require('./unitGroup.js');

function UnitGroups(){
    this.groups = {};
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

UnitGroups.prototype.tick = function(){
    this.checkCollisions();
    this.plan();
    this.act();
    this.step();
    this.draw();
};

UnitGroups.prototype.checkCollisions = function(){
    var groupKeys = Object.keys(this.groups);
    for(var i=0, l=groupKeys.length; i<l; i++){
        var group = this.groups[groupKeys[i]];
        if(group.checkCollisions){
            group.checkCollisions();
        }
    }
};

UnitGroups.prototype.plan = function(){

};

UnitGroups.prototype.act = function(){
    var groupKeys = Object.keys(this.groups);
    for(var i=0, l=groupKeys.length; i<l; i++){
        var group = this.groups[groupKeys[i]];
        if(group.act){
            group.act();
        }
    }
};

UnitGroups.prototype.step = function(){
    var groupKeys = Object.keys(this.groups);
    for(var i=0, l=groupKeys.length; i<l; i++){
        var group = this.groups[groupKeys[i]];
        if(group.step){
            group.step();
        }
    }
};

UnitGroups.prototype.draw = function(){
    var offset = [this.mapCenter[0] - (this.renderer.width/2), this.mapCenter[1] - (this.renderer.height/2)];
    var groupKeys = Object.keys(this.groups);
    for(var i=0,l=groupKeys.length; i<l; i++){
        var group = this.groups[groupKeys[i]];
        if(group.draw){
            group.draw(offset);
        }
    }
    this.renderer.render(this.stage);
};


UnitGroups.prototype.addUnitGroup = function(options){
    options.parent = this;
    options.parentStage = options.parentStage || this.stage;
    options.collisionBounds = options.collisionBounds || this.collisionBounds;

    this.groups[options.name] = new UnitGroup(options);
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

module.exports = new UnitGroups();

