

_ = require('lodash');
Vector = require('./services/vector.js');

var rootStage = new PIXI.Container();
var rendererDimensions = [3000, 3000];
var renderer = PIXI.autoDetectRenderer(rendererDimensions[0], rendererDimensions[1], {antialias: false, transparent: true, resolution: 1});
document.body.appendChild(renderer.view);




// TODO: make UnitGroups not a singleton
// creating units will need to be through a UnitGroup instance
// the unit would then be linked to unitGroup
var UnitGroups = require('./unitGroups');
UnitGroups.setParentStage(rootStage);
UnitGroups.setRenderer(renderer);

// var Hud = require('./hud');
// var hud = new Hud(rootStage);

var Engine = require('./engine');
var eng = new Engine(rootStage, renderer);

eng.start(UnitGroups);

