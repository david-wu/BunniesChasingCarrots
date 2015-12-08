

_ = require('lodash');
Vector = require('./services/vector.js');


var renderer = PIXI.autoDetectRenderer(3000, 3000, {antialias: false, transparent: true, resolution: 1});
document.body.appendChild(renderer.view);

var UnitGroups = require('./engine/unitGroups.js');
UnitGroups.setRenderer(renderer);

var Engine = require('./engine/engine.js');
var eng = new Engine();
eng.start(UnitGroups);

