/*

    NEW PLAN SCRATCH THIS DIR

        Levels
            units level up traits by using skills
                cutting wood increases strength

            skills 'level up' based on traits
                for example, melee damage increased by strength



    // in _baseUnit.js
    this.mixins = new Mixins(this);

    // in each unit
    this.mixins
        .add(Mixin1, {
            priority: (number || function that returns a function)
        })
        .add(Mixin2, {

        });

    this.mixins
        .first()
        .run();

*/

function Mixins(owner){
    this.owner = owner;
    this.mixinGroup = [];
}

Mixins.prototype.add = function(mixin, mixinScope){
    this.mixinGroup.push(new mixin(this.owner, mixinScope));
    return this;
}

Mixins.prototype.first = function(){
    var topMixin;
    var highestPriorityValue = 0;

    _.each(this.mixinGroup, function(mixin){
        var priority = typeof mixin.priority === 'number' ? mixin.priority : mixin.priority();
        if(priority > highestPriorityValue){
            highestPriorityValue = priority;
            topMixin = mixin;
        }
    });

    return topMixin;
}


function Mixin(){
    _.defaults(this, {
        level: 2
    })
}


function WanderMixin(unit, scope){

    var scope = {};

    unit.wander = wander.bind(scope, unit);

    // return unit.on('think', function(){
    //     unit.wander();
    // });

    return {
        attempt: function,
        remove: function,
        vel: ,
        freq: ,
        leash: ,
    }
}

function wander(){
    this.vel = Vector.radial(Math.PI*2*Math.random(), this.maxVelocity);
};


module.exports = WanderMixin;