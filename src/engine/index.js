
// This can be swapped out for a socket engine for PvP

function Engine(player){
    this.player = player;
}

Engine.prototype.start = function(){
    this.tick();
    return this;
};

Engine.prototype.tick = function(){
    this.player.tick();
    requestAnimationFrame(this.tick.bind(this));
};

module.exports = Engine;
