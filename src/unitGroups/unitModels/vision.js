var BaseUnit = require('./_baseUnit.js');

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

}

Vision.configs = {
    name: 'hunterVision',
    parentStage: this.stage,
    canCollideWith: ['food'],
    collisionBounds: this.collisionBounds,
    collisionCheckFrequency: 10,
    draw: false,
}

Vision.prototype = Object.create(BaseUnit.prototype);

Vision.prototype.plan = _.noop;

Vision.prototype.act = _.noop;

Vision.prototype.draw = _.noop;

Vision.prototype.step = _.noop;

module.exports = Vision;