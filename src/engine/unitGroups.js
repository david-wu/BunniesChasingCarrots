
var UnitGroup = require('./unitGroup.js');


function UnitGroups(){
    this.collisionBounds = [];
    this.groups = {}
    this.groupsByDrawOrder = [];

    this.setStage(new PIXI.Container());
}

UnitGroups.prototype.setRenderer = function(renderer){

  // create the root of the scene graph
  // this.stage = new PIXI.Container();

  this.renderer = renderer;

  this.setCollisionBounds([-(this.renderer.width/2),-(this.renderer.height/2),(this.renderer.width/2),(this.renderer.height/2)]);
  this.initializeGroups();


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
    });

    this.addUnitGroup({
        name: 'hunter',
        container: new PIXI.Container(),
    });

    this.addUnitGroup({
        name: 'forest',
        draw: false,
    });

    this.groups.hunterVision.addCanCollideWith(this.groups.food, 3);
    this.groups.hunter.addCanCollideWith(this.groups.food);

};

UnitGroups.prototype.addUnit = function(groupName, unit){
    return this.groups[groupName].add(unit);
};

UnitGroups.prototype.addUnitGroup = function(options){
    options.parentStage = options.parentStage || this.stage;
    options.collisionBounds = options.collisionBounds || this.collisionBounds;

    var unitGroup = new UnitGroup(options);
    this.groups[options.name] = unitGroup;
};

UnitGroups.prototype.checkCollisions= function(){
    _.each(this.groups, function(group){
        if(group.checkCollisions){group.checkCollisions();}
    });
};

UnitGroups.prototype.step = function(){
    _.each(this.groups, function(group,key){
        if(group.step){group.step();}
    });
};

UnitGroups.prototype.act = function(){
    _.each(this.groups, function(group,key){
        if(group.act){group.act();}
    });
};

UnitGroups.prototype.draw = function(offset){
    _.each(this.groups, function(group){
        if(group.draw){group.draw(offset);}
    });
};

module.exports = new UnitGroups();