_ = require('lodash');
Vector = require('./services/vector.js');

var canvas = document.getElementById('content');
canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.9;
var ctx = canvas.getContext("2d");

var Engine = require('./engine/engine.js');
var eng = new Engine(ctx, canvas);
eng.start();
