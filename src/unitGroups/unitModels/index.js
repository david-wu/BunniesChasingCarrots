var Food = require('./food.js');
var Forest = require('./forest.js');
var Hunter = require('./hunter.js');
var HunterVision = require('./hunterVision.js');
// var UserSelectionBox = require('./userSelectionBox.js');


module.exports = _.indexBy([Food, Forest, Hunter, HunterVision], function(d){
    return d.configs.name;
});