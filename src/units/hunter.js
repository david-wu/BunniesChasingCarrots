var BaseUnit = require('./_baseUnit.js');



function Hunter(){
    BaseUnit.apply(this, arguments);
    _.extend(this, {
        color: 'red',
        radius: 3,
        drag: 0,
        maxVelocity: 0.5,
        pos: new Vector({
            magnitude: Math.random()*100,
            radians: Math.random()*2*Math.PI,
        }),
    });

    this.on('step', this.hunt.bind(this));
    this.on('collision', function(unit){
        if(_.includes(unit.type, 'food')){
            unit.emit('destroy')
        }
    });

    var that = this;
    this.sees = [];
    this.vision = new BaseUnit(this.unitGroup)
    _.extend(this.vision, {
        pos: undefined,
        parent: this,
        color: 'blue',
        opacity: 0.05,
        radius: 50,
    });
    this.vision.on('collision', function(unit){
        if(_.includes(unit.type, 'food')){
            that.sees.push(unit);
        }
    });
}

Hunter.prototype = Object.create(BaseUnit.prototype);

Hunter.prototype.hunt = function(){
    if(this.age%10!==0){return;}
    var that = this;

    // stops hunting previous target
    if(this.hunting){
        this.hunting.hunted = false;
        this.hunting = false;
    }

    var allFoodCandidates = _.filter(this.sees, function(unit){
        return _.includes(unit.type, 'food');
    });
    var unclaimedFoodCandidates = _.reject(allFoodCandidates, 'hunted');

    // Stop hunting if no candidates
    if(!allFoodCandidates.length){
        this.vel = new Vector({magnitude: 0});
        this.hunting = false;
        return;
    }

    // Prefer hunting unclaimedFoodCandidates
    if(unclaimedFoodCandidates.length){
        this.huntUnit(this.closestUnit(unclaimedFoodCandidates));
    }else{
        // this.huntUnit(this.closestUnit(allFoodCandidates));
    }
    this.sees = [];
};

Hunter.prototype.wander = function(){}

Hunter.prototype.huntUnit = function(unit){
    this.hunting = unit;
    unit.hunted = this;
    this.goto(unit.pos);
};

module.exports = Hunter;

