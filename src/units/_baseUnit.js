var Emitter = require('../services/emitter.js');

var unitId = 0;

function BaseUnit(){
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
}

BaseUnit.prototype.step = function(){
    if(!this.pos){return;}
    this.pos = this.pos.add(this.vel);
    this.vel.applyLinearDrag(this.drag);
    this.age++;
};

BaseUnit.prototype.act = function(){

}

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

        stage.addChild(this.sprite);
    }


    this.sprite.position.x = posCoord[0]-posShift[0];
    this.sprite.position.y = posCoord[1]-posShift[1];

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



