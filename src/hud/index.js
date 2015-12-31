
function Hud(rootStage, width, height){

    this.width = width;
    this.height = height;
    this.stage = new PIXI.Container();


    var graphics = new PIXI.Graphics();
    graphics.beginFill(0xFFFF00);
    graphics.lineStyle(5, 0xFF0000);
    graphics.drawRect(0, 0, 300, 200);

    graphics.interactive = true;
    graphics.mouseover = function(d){
        console.log('m', d)
    }
    this.stage.addChild(graphics);
}


Hud.prototype.draw = function(){

}





module.exports = Hud;





// window.addEventListener('resize', resize, false); resize();
// function resize() {
//     renderer.view.width = window.innerWidth;
//     renderer.view.height = window.innerHeight;
// }

// document.addEventListener('keydown', function(e) {
//   if (e.keyCode == 13) {
//     toggleFullScreen(renderer.view);
//   }
// }, false);

// function toggleFullScreen(element) {
//   if(fullScreenEl()){
//     disableFullScreen();
//   }else{
//     enableFullScreen(element);
//   }
// }

// function fullScreenEl(){
//     return document.fullscreenElement ||  document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
// }

// function enableFullScreen(element){
//     element = element || document.documentElement;
//     if (element.requestFullscreen) {
//         element.requestFullscreen();
//     } else if (element.msRequestFullscreen) {
//         element.msRequestFullscreen();
//     } else if (element.mozRequestFullScreen) {
//         element.mozRequestFullScreen();
//     } else if (element.webkitRequestFullscreen) {
//         element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
//     }
// }

// function disableFullScreen(){
//     if (document.exitFullscreen) {
//         document.exitFullscreen();
//     } else if (document.msExitFullscreen) {
//         document.msExitFullscreen();
//     } else if (document.mozCancelFullScreen) {
//         document.mozCancelFullScreen();
//     } else if (document.webkitExitFullscreen) {
//         document.webkitExitFullscreen();
//     }
// }
