_ = require('lodash');
Vector = require('./services/vector.js');

var Renderer = require('./renderer');
var UnitGroups = require('./unitGroups');
var Hud = require('./hud');
var Engine = require('./engine');

var configs = {
    mapBounds: [-1500, -1500, 1500, 1500],
};

var renderer = new Renderer(configs.mapBounds);
var unitGroups = new UnitGroups(configs.mapBounds)
var hud = new Hud();
var eng = new Engine(renderer, unitGroups, hud);
eng.start(unitGroups);





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
