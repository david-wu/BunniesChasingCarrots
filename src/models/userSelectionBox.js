var BaseUnit = require('../units/_baseUnit.js');
var UnitGroups = require('../services/unitGroups.js');


function UserSelectionBox(options){
    BaseUnit.call(this, arguments);
    _.extend(this, {
        radius: 1,
        maxVelocity: 2,
        spritePath: './carrot.png',
    });
    _.extend(this, options)

    this.selection = [];

    this.on('collision', function(unit){
        // console.log(unit)
    });

    UnitGroups.addUnit('userSelectionBox', this);
}

UserSelectionBox.prototype = Object.create(BaseUnit.prototype)

// UserSelectionBox.prototype.draw = function(){
    // console.log('draw')
// }

module.exports = UserSelectionBox;