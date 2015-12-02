var UnitGroups = require('../engine/unitGroups.js');
var BaseUnit = require('./_baseUnit.js');

function Vision(options){
    BaseUnit.apply(this, arguments);
    var that = this;
    _.extend(this, {
        pos: undefined,
        color: 'blue',
        opacity: 0.05,
        initialRadius: 50,
        radius: 50,
    });
    _.extend(this, options);

    UnitGroups.addUnit('hunterVision', this)
}


Vision.prototype = Object.create(BaseUnit.prototype);

Vision.prototype.draw = _.noop;

Vision.prototype.step = _.noop;

module.exports = Vision;