var Menu = require('./menu');


function Hud(options){
    _.extend(this, options);

    this.stage = new PIXI.Container();


    this.menu = this.drawMenu();
    this.stage.addChild(this.menu.items.graphics);
}

Hud.prototype.drawMenu = function(){
    var that = this;
    var items = [
        {
            name: 'Move',
            click: function(e){
                console.log('move!',e);
            },
        },
        {
            name: 'stop',
            click: function(e){
                console.log('stop!',e);
            },
        },
        {
            name: 'FullScreen',
            click: function(e){
                console.log('fullscreen')
                that.renderer.toggleScreen();
            },
        },
    ];
    items.dims = [this.renderer.width, 200];

    var menu = new Menu(items);
    menu.drawItems();
    return menu;
}


Hud.prototype.fullScreen = function(){

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
