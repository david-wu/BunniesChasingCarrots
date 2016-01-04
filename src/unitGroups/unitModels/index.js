var Food = require('./food.js');
var Forest = require('./forest.js');
var Hunter = require('./hunter.js');
var HunterVision = require('./hunterVision.js');
var TempBuilding = require('./tempBuilding.js');

module.exports = _.indexBy([TempBuilding, HunterVision, Food, Forest, Hunter], function(d){
    return d.configs.name;
});