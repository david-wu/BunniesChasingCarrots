_ = require('lodash');
Vector = require('./services/vector.js');
var Renderer = require('./renderer');
var UnitGroups = require('./unitGroups');
var Hud = require('./hud');
var Engine = require('./engine');
var Player = require('./player');

var configs = {
    mapBounds: [-1500, -1500, 1500, 1500],
};

var renderer = new Renderer(configs.mapBounds);
var unitGroups = new UnitGroups(configs.mapBounds)
var hud = new Hud();

var eng = new Engine(renderer, unitGroups, hud);
eng.start();

var player = new Player(unitGroups, hud);
