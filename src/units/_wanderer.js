


function Wanderer(unit){

    var scope = unit || {};
    _.defaults(scope, {
        age: 0,
    });

    unit.wander = function(){
        if(scope.age % 100 === 0){
            wander.apply(scope, arguments)
        }
    }

}

function wander(units){
    this.vel = new Vector({
        degrees: Math.random()*360,
        magnitude: this.maxVelocity,
    });
};
