var Food = require('./food.js');
var Forest = require('./forest.js');
var Hunter = require('./hunter.js');
var Vision = require('./vision.js');
// var UserSelectionBox = require('./userSelectionBox.js');


module.exports = _.indexBy([Food, Forest, Hunter, Vision], function(d){
    return d.configs.name;
});