var Renderer = require('./renderer');
var Hud = require('./hud');
var UserSelectionBox = require('./userSelectionBox.js')

function Player(options){
    this.renderer = new Renderer();
    this.unitGroups = options.unitGroups;

    this.userSelectionBox = new UserSelectionBox({
        renderer: this.renderer,
        unitGroups: this.unitGroups,
    });

    this.hud = new Hud({
        player: this,
        renderer: this.renderer,
        userSelectionBox: this.userSelectionBox,
    });

    this.rootContainer = new PIXI.Container();
    this.rootContainer.addChild(this.unitGroups.stage);
    this.rootContainer.addChild(this.hud.stage);
    this.rootContainer.addChild(this.userSelectionBox.stage);

    this.viewBounds = [-750, -750, 750, 750];

    this.createInitialUnits();
    this.attachViewScroller();
    this.paused = false;
}

Player.prototype.tick = function(){
    this.transformUnitGroups();
    if(!this.paused){
        this.unitGroups.tick();
    }
    this.userSelectionBox.draw();
    this.hud.draw();
    this.renderer.render(this.rootContainer);
}

Player.prototype.attachViewScroller = function(){
    var that = this;

    var scroll = {};
    var zoom = {};
    document.onkeydown = function(e){
        if(e.keyCode === 87){
            scroll.up = true;
        }else if(e.keyCode === 65){
            scroll.left = true;
        }else if(e.keyCode === 83){
            scroll.down = true;
        }else if(e.keyCode === 68){
            scroll.right = true;
        }else if(e.keyCode === 81){
            zoom.out = true;
        }else if(e.keyCode === 69){
            zoom.in = true;
        }
    };
    document.onkeyup = function(e){
        if(e.keyCode === 87){
            scroll.up = false;
        }else if(e.keyCode === 65){
            scroll.left = false;
        }else if(e.keyCode === 83){
            scroll.down = false;
        }else if(e.keyCode === 68){
            scroll.right = false;
        }else if(e.keyCode === 81){
            zoom.out = false;
        }else if(e.keyCode === 69){
            zoom.in = false;
        }
    };

    setInterval(function(){
        var verticalScrollAmount = (that.viewBounds[3]-that.viewBounds[1])*0.01;
        var horizontalScrollAmount = (that.viewBounds[2]-that.viewBounds[0])*0.01;

        if(scroll.up){
            that.viewBounds[1]-=verticalScrollAmount;
            that.viewBounds[3]-=verticalScrollAmount;
        }
        if(scroll.down){
            that.viewBounds[1]+=verticalScrollAmount;
            that.viewBounds[3]+=verticalScrollAmount;
        }
        if(scroll.left){
            that.viewBounds[0]-=horizontalScrollAmount;
            that.viewBounds[2]-=horizontalScrollAmount;
        }
        if(scroll.right){
            that.viewBounds[0]+=horizontalScrollAmount;
            that.viewBounds[2]+=horizontalScrollAmount;
        }
        if(zoom.in){
            that.viewBounds[1]+=verticalScrollAmount;
            that.viewBounds[3]-=verticalScrollAmount;
            that.viewBounds[0]+=horizontalScrollAmount;
            that.viewBounds[2]-=horizontalScrollAmount;
        }
        if(zoom.out){
            that.viewBounds[1]-=verticalScrollAmount;
            that.viewBounds[3]+=verticalScrollAmount;
            that.viewBounds[0]-=horizontalScrollAmount;
            that.viewBounds[2]+=horizontalScrollAmount;
        }

    }, 16)
}

Player.prototype.createInitialUnits = function(){
    // this.createTestEcosystem(5, 250);
    // this.createTestEcosystem(10, 500);
    this.createTestEcosystem(20, 750);
    // this.createTestEcosystem(30, 1000);
    // this.createTestEcosystem(40, 1250);
};

Player.prototype.createTestEcosystem = function(count, radius){
    var that = this;
    _.times(count, function(i){
        var forest = that.unitGroups.createUnit('forest', {
            pos: Vector.radial(i*2*Math.PI/count, radius),
        });
        _.times(8, function(){
            that.unitGroups.createUnit('hunter', {
                pos: forest.pos.add(Vector.radial(Math.random()*2*Math.PI, Math.random()*forest.radius)),
            });
        });
        that.unitGroups.createUnit('tempBuilding', {
            pos: forest.pos,
        })

    });
};

Player.prototype.transformUnitGroups = function(){
    var xScale = this.renderer.width/(this.viewBounds[2]-this.viewBounds[0]);
    var yScale = this.renderer.height/(this.viewBounds[3]-this.viewBounds[1]);

    this.unitGroups.stage.scale.x = xScale;
    this.unitGroups.stage.scale.y = yScale;

    this.unitGroups.stage.position.x = -this.viewBounds[0]*xScale;
    this.unitGroups.stage.position.y = -this.viewBounds[1]*yScale;
}




module.exports = Player;

