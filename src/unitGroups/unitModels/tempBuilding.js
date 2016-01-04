var BaseUnit = require('./_baseUnit.js')


function TempBuilding(options){
    BaseUnit.call(this, arguments);
    _.extend(this, {
        radius: 20,
        maxVelocity: 0,
        type: ['tempBuilding'],
        spritePath: './tempBuilding.png',
        tint: 0xFFFFFF,
    });
    _.extend(this, options);
}

TempBuilding.configs = {
    name: 'tempBuilding',
    container: new PIXI.Container(),
    collisionCheckFrequency: 2,
    canCollideWith: ['hunter'],
};

TempBuilding.prototype = Object.create(BaseUnit.prototype);

TempBuilding.prototype.act = function(){


};



module.exports = TempBuilding;