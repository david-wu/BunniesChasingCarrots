var BaseUnit = require('./_baseUnit.js');

function HunterVision(options){
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

HunterVision.configs = {
    name: 'hunterVision',
    parentStage: this.stage,
    canCollideWith: ['food'],
    collisionBounds: this.collisionBounds,
    collisionCheckFrequency: 10,
    draw: false,
}

HunterVision.prototype = Object.create(BaseUnit.prototype);

HunterVision.prototype.plan = _.noop;

HunterVision.prototype.act = _.noop;

HunterVision.prototype.draw = _.noop;

HunterVision.prototype.step = _.noop;

module.exports = HunterVision;