var unitId = 0;


function BaseUnit(){
    _.extend(this, {
        id: unitId++,
        age: 0,
        radius: 2,
        pos: new Vector([0, 0]),
        vel: new Vector([0, 0]),
        maxVelocity: 2,
        drag: 0.1,
        collisions: {},
    });
}

// Runs physical laws like updating vel, pos, drag
BaseUnit.prototype.step = function(){
    if(!this.pos){return;}
    this.pos.add(this.vel, this.pos);
    this.vel.applyLinearDrag(this.drag);
    this.age++;
};

// An approximation 'box' around object for detecting potential collisions (also for quadTree)
BaseUnit.prototype.hitBox = function(){
    var pos = this.pos || this.parent.pos;
    var coords = pos.coords;
    return [coords[0]-this.radius, coords[1]-this.radius, coords[0]+this.radius, coords[1]+this.radius];
};

// Detects if hitboxes collide
BaseUnit.prototype.checkCollisionCheap = function(unit){
    this.boxBounds = this.boxBounds || this.hitBox();
    unit.boxBounds = unit.boxBounds || unit.hitBox();

    if(unit.boxBounds[0] < this.boxBounds[2] && unit.boxBounds[2] > this.boxBounds[0]){
        if(unit.boxBounds[1] < this.boxBounds[3] && unit.boxBounds[3] > this.boxBounds[1]){
            this.collisions[unit.group.name][unit.id] = unit;
        }
    }
};

// A more expensive method to detect collision within radius
// Can make this much faster.
// distance from requires square root, store the radiuses squared.
BaseUnit.prototype.checkCollision = function(unit){
    if(this.distanceFrom(unit) < (this.radius + unit.radius)){
        this.collisions[unit.group.name][unit.id] = unit;
    }
};

BaseUnit.prototype.distanceFrom = function(unit){
    var pos1 = this.pos || this.parent.pos;
    var pos2 = unit.pos || unit.parent.pos;
    return pos1.distanceFrom(pos2);
};

BaseUnit.prototype.draw = function(stage){
    var that = this;
    var pos = this.pos || this.parent.pos;
    var posCoord = pos.coords;
    this.stage = stage;

    if(!this.sprite){
        if(!this.spritePath){return;}
        this.sprite = new PIXI.Sprite.fromImage(this.spritePath);

        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.sprite.tint = this.tint || 0xFFFFFF;
        stage.addChild(this.sprite);
    }

    if(this.selected){
        this.sprite.tint = 0x00FF00
    }else{
        this.sprite.tint = this.tint;
    }
    this.sprite.position.x = posCoord[0];
    this.sprite.position.y = posCoord[1];
    this.sprite.width = this.radius*2;
    this.sprite.height = this.radius*2;
}

BaseUnit.prototype.destroy = function(){
    if(this.stage){
        var index = this.stage.children.indexOf(this.sprite)
        if(index !== -1){
            this.stage.children.splice(index,1)
        }
    }

    if(this.group){
        this.group.remove(this);
    }
}

BaseUnit.prototype.reverseVel = function(pos){
    this.vel = new Vector(_.map(this.vel.coords, function(d){return -d;}));
};

// Changes unit's velocity to go towards a position vector
BaseUnit.prototype.goto = function(pos){
    if(!pos){return;}

    pos.subtract(this.pos, this.vel)
    this.vel.setMagnitude(this.maxVelocity, this.vel);
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



