_ = require('lodash');
Vector = require('./services/vector.js');
var UnitGroups = require('./unitGroups');
var Player = require('./player');
var Engine = require('./engine');


var unitGroups = new UnitGroups({
    mapBounds: [-1500, -1500, 1500, 1500],
});

var player = new Player({
    unitGroups: unitGroups,
});

var engine = new Engine(player).start();
