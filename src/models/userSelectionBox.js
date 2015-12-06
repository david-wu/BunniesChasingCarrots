var BaseUnit = require('../units/_baseUnit.js');
var UnitGroups = require('../engine/unitGroups.js');

UnitGroups.addUnitGroup({
    name: 'userSelectionBox',
    container: new PIXI.Container(),
});

function UserSelectionBox(options){
    BaseUnit.call(this, arguments);
    _.extend(this, {
        bounds: [0,0,0,0],
        selection: [],
    });
    _.extend(this, options);


    UnitGroups.addUnit('userSelectionBox', this);
    this.beginCollisionDetection();


    UnitGroups.renderer.view.onmousedown = this.mouseDown.bind(this);
    UnitGroups.renderer.view.onmousemove = this.mouseMove.bind(this);
    UnitGroups.renderer.view.onmouseup = this.mouseUp.bind(this);

}

function getMousePos(e) {
    var posx, posy;
    if (!e) var e = window.event;
    if (e.pageX || e.pageY){
        posx = e.pageX;
        posy = e.pageY;
    }else if(e.clientX || e.clientY){
        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return [posx - e.target.offsetLeft - UnitGroups.renderer.width/2, posy - UnitGroups.renderer.height/2 - e.target.offsetTop];
}

UserSelectionBox.prototype = Object.create(BaseUnit.prototype);
UserSelectionBox.prototype.constructor = BaseUnit;

UserSelectionBox.prototype.mouseDown = function(e){
    var mousePos = getMousePos(e);
    this.anchor = mousePos;

    this.bounds[0] = mousePos[0]
    this.bounds[1] = mousePos[1]
    this.bounds[2] = mousePos[0]
    this.bounds[3] = mousePos[1]
}

UserSelectionBox.prototype.mouseMove = function(e){
    var mousePos = getMousePos(e);
    if(e.buttons){

        if(mousePos[0] < this.anchor[0]){
            this.bounds[0] = mousePos[0]
            this.bounds[2] = this.anchor[0]
        }else{
            this.bounds[2] = mousePos[0]
            this.bounds[0] = this.anchor[0]
        }

        if(mousePos[1] < this.anchor[1]){
            this.bounds[1] = mousePos[1]
            this.bounds[3] = this.anchor[1]
        }else{
            this.bounds[3] = mousePos[1]
            this.bounds[1] = this.anchor[1]
        }
    }
}

UserSelectionBox.prototype.mouseUp = function(e){
    _.each(this.selection, function(unit){
        unit.selected = false;
    })

    this.selection = this.getCollisions();
    _.each(this.selection, function(unit){
        unit.selected = true;
    })

    this.bounds = [0,0,0,0];
    console.log(this.selection)
}


UserSelectionBox.prototype.command = function(){
    _.each(this.selection, function(unit){
        unit.goto(new Vector({coords:[0,0]}))
        unit.act = _.noop;
        setTimeout(function(){
            delete unit.act;
        },2000)
    })
}

UserSelectionBox.prototype.draw = function(stage, posShift){
    var that = this;
    var pos = this.pos || this.parent.pos;
    var posCoord = pos.coords;

    if(!this.sprite){

        this.sprite = new PIXI.Graphics();
        // this.sprite.beginFill(0xFFFF00)
        this.sprite.lineStyle(1, 0x00FF00);
        this.sprite.drawRect(0, 0, 1, 1);
        this.sprite.alpha = 0.2

        stage.addChild(this.sprite);

    }

    this.sprite.position.x = this.bounds[0] - posShift[0];
    this.sprite.position.y = this.bounds[1] - posShift[1];

    this.sprite.width = this.bounds[2] - this.bounds[0]
    this.sprite.height = this.bounds[3] - this.bounds[1]

}

UserSelectionBox.prototype.beginCollisionDetection = function(){
    this.stopCollisionDetection();
    this._stopDetection = UnitGroups.groups.userSelectionBox.addCanCollideWith(['hunter'], 1);
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

UserSelectionBox.prototype.hitBox = function(){
    return this.bounds;
};

UserSelectionBox.prototype.checkCollision = function(unit){
    var unitBox = unit.hitBox();
    if(unitBox[0] < this.bounds[2] && unitBox[2] > this.bounds[0]){
        if(unitBox[1] < this.bounds[3] && unitBox[3] > this.bounds[1]){
            this.triggerCollision(unit)
        }
    }
}


module.exports = new UserSelectionBox();

