_ = require('lodash');
Vector = require('./services/vector.js');
var UnitGroups = require('./unitGroups');
var Engine = require('./engine');
var Player = require('./player');

var unitGroups = new UnitGroups({
    mapBounds: [-1500, -1500, 1500, 1500],
});

var player = new Player({
    unitGroups: unitGroups,
});

new Engine(player).start();
