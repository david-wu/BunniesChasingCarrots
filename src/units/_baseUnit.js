var Emitter = require('../services/emitter.js');

var unitId = 0;
function BaseUnit(unitGroups){
    this.id = unitId++;

    _.defaults(this, {
        pos: new Vector({coords:[0, 0]}),
        vel: new Vector({coords:[0, 0]}),
        opacity: 1,
        maxVelocity: 2,
        drag: 0.1,
        radius: 2,
        color: 'green',
        age: 0,
        attributes: [],
        commands: [],
    });
    Emitter(this);

    this.graphics = new PIXI.Graphics();
    this.unitGroups = unitGroups;

    var that = this;
    this.on('step', this.step.bind(this));
    this.on('destroy', function baseDestroy(){
        that.destroy();
    });
}

BaseUnit.prototype.step = function(){
    if(!this.pos){return;}
    this.pos = this.pos.add(this.vel);
    this.vel.applyLinearDrag(this.drag);
    this.age++;
};

BaseUnit.prototype.act = function(){

}

BaseUnit.prototype.destroy = function(){
    return
    // var index = this.unitGroup.indexOf(this);
    if(index !== -1){
        this.unitGroup.splice(index, 1);
    }
};

BaseUnit.prototype.closestUnit = function(units){
    var that = this;
    return _.min(units, function(unit){
        if(unit === that){return;}
        return that.distanceFrom(unit);
    });
};

BaseUnit.prototype.distanceFrom = function(unit){
    var pos1 = this.pos || this.parent.pos;
    var pos2 = unit.pos || unit.parent.pos;
    return pos1.distanceFrom(pos2);
};

BaseUnit.prototype.hitBox = function(){
    var pos = this.pos || this.parent.pos;
    var coords = pos.coords;
    return [coords[0]-this.radius, coords[1]-this.radius, coords[0]+this.radius, coords[1]+this.radius];
};

// var graphics = new PIXI.Graphics();
// var texture = PIXI.Texture.fromImage('./silver_coin.png');

// var circle = new PIXI.Graphics();
// circle.beginFill(0x9966FF);
// circle.drawCircle(0, 0, 32);
// circle.endFill();
BaseUnit.prototype.draw = function(stage, posShift){
    var that = this;
    var pos = this.pos || this.parent.pos;
    var posCoord = pos.coords;

    if(!this.sprite){
        this.sprite = new PIXI.Sprite.fromImage('./silver_coin.png');
        this.on('destroy', function(){
            var index = stage.children.indexOf(that.sprite)
            if(index !== -1){
                stage.children.splice(index,1)
            }
        });
        this.sprite.cacheAsBitmapboolean = true;
        this.sprite.width = this.radius*2;
        this.sprite.height = this.radius*2;
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;

// this.sprite = new PIXI.Graphics();
// this.sprite.beginFill(0xFF0000);
// this.sprite.drawCircle(30, 30, 32);
// this.sprite.endFill();


        stage.addChild(this.sprite);
    }


    this.sprite.position.x = posCoord[0]-posShift[0];
    this.sprite.position.y = posCoord[1]-posShift[1];


    // draw a circle
//     this.graphics.lineStyle(0);
//     this.graphics.beginFill(0xFFFF0B, 0.5);
//     this.graphics.drawCircle(posCoord[0]-posShift[0], posCoord[1]-posShift[1], this.radius);
//     this.graphics.endFill();
// return this.graphics
    // ctx.fillStyle = this.color;
    // ctx.globalAlpha = this.opacity;
    // ctx.beginPath();
    // ctx.arc(posCoord[0]-posShift[0], posCoord[1]-posShift[1], this.radius, 0, Math.PI*2, false);
    // ctx.fill();
};

BaseUnit.prototype.reverseVel = function(pos){
    this.vel = new Vector({
        coords: _.map(this.vel.coords, function(d){return -d;})
    });
};

// Changes unit's velocity to go towards a position vector
BaseUnit.prototype.goto = function(pos){
    if(!pos){return;}
    this.vel = pos.subtract(this.pos).setMagnitude(this.maxVelocity);
};

BaseUnit.prototype.fleeFrom = function(pos){
    this.vel = pos.subtract(this.pos).inverse().setMagnitude(this.maxVelocity);
};

// Sets radius to make area equal
BaseUnit.prototype.setArea = function(area){
    this.area = area;
    this.radius = Math.pow(area/Math.PI, 0.5);
};

module.exports = BaseUnit;



