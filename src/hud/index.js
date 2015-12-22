
function Hud(rootStage, width, height){

    this.width = width;
    this.height = height;
    this.stage = new PIXI.Container();


    var graphics = new PIXI.Graphics();
    graphics.beginFill(0xFFFF00);
    graphics.lineStyle(5, 0xFF0000);
    graphics.drawRect(0, 0, 300, 200);
    this.stage.addChild(graphics);
}


Hud.prototype.draw = function(){

}





module.exports = Hud;