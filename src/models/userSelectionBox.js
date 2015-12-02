var BaseUnit = require('../units/_baseUnit.js');
var UnitGroups = require('../engine/unitGroups.js');


function UserSelectionBox(options){
    BaseUnit.call(this, arguments);
    _.extend(this, {
        radius: 50,
        maxVelocity: 2,
        spritePath: './carrot.png',
    });
    _.extend(this, options)


    this.unitGroup = UnitGroups.groups.userSelectionBox;
    if(!this.unitGroup){
        UnitGroups.addUnitGroup({
            name: 'userSelectionBox',
        })
        this.unitGroup = UnitGroups.groups.userSelectionBox;
    }
    this.unitGroup.add(this)

    this.beginCollisionDetection();



    var that = this;
    setInterval(function(){
        console.log(that.getCollisions())
    },1000)
    setTimeout(function(){
        that.stopCollisionDetection();
    },10000)

}

UserSelectionBox.prototype = Object.create(BaseUnit.prototype);
UserSelectionBox.prototype.constructor = BaseUnit;

UserSelectionBox.prototype.beginCollisionDetection = function(){
    this.stopCollisionDetection();

    var collisionsGroups = ['food', 'hunter'];

    var collisionsGroups = _.map(collisionsGroups, function(groupName){
        return UnitGroups.groups[groupName];
    });

    this._stopDetection = this.unitGroup.addCanCollideWith(collisionsGroups, 1);
};

UserSelectionBox.prototype.stopCollisionDetection = function(){
    if(this._stopDetection){
        this._stopDetection();
        delete this._stopDetection;
    }
};

UserSelectionBox.prototype.getCollisions = function(){
    return _(this.collisions)
        .values()
        .map(function(group){return _.values(group)})
        .flatten()
        .value();
};

// UserSelectionBox.prototype.hitBox = function(){
//     return [1,1,1,1];
// };

// UserSelectionBox.prototype.draw = function(){
// }

module.exports = UserSelectionBox;