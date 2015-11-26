// Q = require('q');
_ = require('lodash');
Vector = require('./services/vector.js');

// var canvas = document.getElementById('content');
// canvas.width = window.innerWidth * 0.9;
// canvas.height = window.innerHeight * 0.9;
// var ctx = canvas.getContext("2d");

// var Engine = require('./engine/engine.js');
// var eng = new Engine(ctx, canvas);
// eng.start();




var renderer = PIXI.autoDetectRenderer(3000, 3000, {antialias: false, transparent: true, resolution: 1});
document.body.appendChild(renderer.view);


var Engine = require('./engine/engine.js');
var eng = new Engine(renderer);
eng.start();
