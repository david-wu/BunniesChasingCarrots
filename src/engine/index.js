
function Engine(renderer, unitGroups, hud){
    this.renderer = renderer;
    this.unitGroups = unitGroups;
    this.hud = hud;

    this.rootContainer = new PIXI.Container();
    this.rootContainer.addChild(this.unitGroups.stage);
    this.rootContainer.addChild(this.hud.stage);


    this.createInitialUnits();
}

Engine.prototype.createInitialUnits = function(){
    this.createTestEcosystem(4, 250);
    this.createTestEcosystem(9, 500);
    // this.createTestEcosystem(16, 750);
    // this.createTestEcosystem(25, 1000);
    // this.createTestEcosystem(36, 1250);
};

Engine.prototype.createTestEcosystem = function(count, radius){
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

Engine.prototype.start = function(){
    this.tick();
};

Engine.prototype.tick = function(){
    // this.unitGroups.stage.position.x++;

    this.unitGroups.tick();
    this.renderer.render(this.rootContainer);
    requestAnimationFrame(this.tick.bind(this));
};

module.exports = Engine;
