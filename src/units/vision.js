var UnitGroups = require('../unitGroups');
var BaseUnit = require('./_baseUnit.js');


UnitGroups.addUnitGroup({
    name: 'hunterVision',
    parentStage: this.stage,
    collisionBounds: this.collisionBounds,
    collisionCheckFrequency: 10,
    draw: false,
});

UnitGroups.groups.hunterVision.addCanCollideWith('food');


function Vision(options){
    BaseUnit.apply(this, arguments);
    var that = this;

    _.extend(this, {
        pos: undefined,
        color: 'blue',
        opacity: 0.05,
        initialRadius: 100,
        radius: 100,
    });
    _.extend(this, options);

    UnitGroups.addUnit('hunterVision', this)
}


Vision.prototype = Object.create(BaseUnit.prototype);

Vision.prototype.plan = _.noop;

Vision.prototype.act = _.noop;

Vision.prototype.draw = _.noop;

Vision.prototype.step = _.noop;

module.exports = Vision;