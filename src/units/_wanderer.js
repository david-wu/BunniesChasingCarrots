


function Wanderer(unit, scope){

    unit.wander = function(){
        var stopWander = wander.apply(unit, arguments)
    }

    unit.stopWander = function(){
        stopWander.apply(unit, arguments)
    }

}

function wander(){

    this.vel = new Vector({
        degrees: Math.random()*360,
        magnitude: this.maxVelocity,
    });
};


function stopWander(){

}