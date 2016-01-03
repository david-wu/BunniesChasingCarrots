// var BaseUnit = require('./_baseUnit.js');

function UserSelectionBox(options){
    // BaseUnit.call(this, arguments);
    _.extend(this, {
        bounds: [0,0,0,0],
        selection: [],
        stage: new PIXI.Container(),
    });
    _.extend(this, options);


    this.renderer.view.onmousedown = this.mouseDown.bind(this);
    this.renderer.view.onmousemove = this.mouseMove.bind(this);
    this.renderer.view.onmouseup = this.mouseUp.bind(this);

}

UserSelectionBox.prototype.getMousePos = function(e){
    var posx, posy;
    if (!e) var e = window.event;
    if (e.pageX || e.pageY){
        posx = e.pageX;
        posy = e.pageY;
    }else if(e.clientX || e.clientY){
        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return [posx - e.target.offsetLeft - this.renderer.width/2, posy - this.renderer.height/2 - e.target.offsetTop];
}

UserSelectionBox.prototype.mouseDown = function(e){
    var mousePos = this.getMousePos(e);
    this.anchor = mousePos;

    this.bounds[0] = mousePos[0]
    this.bounds[1] = mousePos[1]
    this.bounds[2] = mousePos[0]
    this.bounds[3] = mousePos[1]
}

UserSelectionBox.prototype.mouseMove = function(e){
    var mousePos = this.getMousePos(e);
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


UserSelectionBox.prototype.draw = function(){
    var that = this;
    var posShift = [this.renderer.width/2,this.renderer.height/2]

    if(!this.sprite){
        this.sprite = new PIXI.Graphics();
        this.sprite.beginFill(0xFFFF00)
        this.sprite.drawRect(0, 0, 1, 1);
        this.sprite.alpha = 0.2
        this.stage.addChild(this.sprite);
    }

    this.sprite.position.x = this.bounds[0] + posShift[0];
    this.sprite.position.y = this.bounds[1] + posShift[1];
    this.sprite.width = this.bounds[2] - this.bounds[0]
    this.sprite.height = this.bounds[3] - this.bounds[1]
}

UserSelectionBox.prototype.getCollisions = function(){
    var that = this;
    var candidates = this.unitGroups.groups.hunter.units;

    return _.filter(candidates, function(hunter){
        return that.checkCollision(hunter);
    });
};

UserSelectionBox.prototype.checkCollision = function(unit){
    var unitBox = unit.hitBox();
    if(unitBox[0] < this.bounds[2] && unitBox[2] > this.bounds[0]){
        if(unitBox[1] < this.bounds[3] && unitBox[3] > this.bounds[1]){
            return true;
        }
    }
}


module.exports = UserSelectionBox;

