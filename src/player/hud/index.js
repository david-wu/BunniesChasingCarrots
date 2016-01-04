var Menu = require('./menu');


function Hud(options){
    var that = this;
    _.extend(this, options);

    this.stage = new PIXI.Container();

    this.items = [
        {
            name: 'pause',
            click: function(e){
                that.player.paused = !that.player.paused;
            },
        },
        {
            name: 'fullScreen',
            click: function(e){
                that.renderer.toggleScreen();
            },
        },
    ];
    this.items.dims = [this.renderer.width, 50];

    this.menu = new Menu(this.items);
    this.menu.drawItems();
    this.stage.addChild(this.menu.items._graphics);
}

Hud.prototype.draw = function(){
    this.items.dims = [this.renderer.width, 50];
    this.menu.drawItems();
}


module.exports = Hud;
