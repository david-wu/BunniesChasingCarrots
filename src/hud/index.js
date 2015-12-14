
function Hud(rootStage, width, height){

    console.log('hud')

    this.width = width;
    this.height = height;
    this.stage = new PIXI.Container();

    this.rootStage.


    var graphics = new PIXI.Graphics();
    graphics.beginFill(0xFFFF00);
    graphics.lineStyle(5, 0xFF0000);
    graphics.drawRect(0, 0, 300, 200);
    this.stage.addChild(graphics);
}


Hud.prototype.draw = function(){
    console.log('drawing')
    // this.renderer.render(this.stage);

}





module.exports = Hud;