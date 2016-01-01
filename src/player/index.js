

var Renderer = require('../renderer');
var Hud = require('../hud');

function Player(options){
    _.extend(this, options);
    this.renderer = new Renderer();
    this.hud = new Hud(this.renderer, this.unitGroups);

    this.rootContainer = new PIXI.Container();
    this.rootContainer.addChild(this.unitGroups.stage);
    this.rootContainer.addChild(this.hud.stage);

    this.createInitialUnits();
}

Player.prototype.createInitialUnits = function(){
    this.createTestEcosystem(5, 250);
    this.createTestEcosystem(10, 500);
    // this.createTestEcosystem(20, 750);
    // this.createTestEcosystem(40, 1000);
    // this.createTestEcosystem(80, 1250);
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
    });
};


Player.prototype.tick = function(){
    this.unitGroups.tick();
    this.renderer.render(this.rootContainer);
}



module.exports = Player;

