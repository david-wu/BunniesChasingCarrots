_ = require('lodash');
Vector = require('./services/vector.js');

var rootStage = new PIXI.Container();
var renderer = new Renderer();
document.body.appendChild(renderer.view);

// TODO: make UnitGroups not a singleton
// creating units will need to be through a UnitGroup instance
// the unit would then be linked to unitGroup
// Also, unitGroups shouldn't need renderer
// Engine should set collisionCheck dimensions
var UnitGroups = require('./unitGroups');
UnitGroups.setParentStage(rootStage);
UnitGroups.setRenderer(renderer);

var Hud = require('./hud');
var hud = new Hud(rootStage);

var Engine = require('./engine');
var eng = new Engine(rootStage, renderer);
eng.start(UnitGroups);


function Renderer(){
    var renderDims = [3000, 3000];
    var renderOptions = {
        antialias: false,
        transparent: true,
        resolution: 1,
    };
    return PIXI.autoDetectRenderer(renderDims[0], renderDims[1], renderOptions);
}



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
