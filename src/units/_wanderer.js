


function WanderType(unit, scope){

    return unit.on('step', function(){
        unit.wander();
    });

    unit.wander = function(){
        var stopWander = wander.apply(unit, arguments)
    }

    unit.stopWander = function(){
        stopWander.apply(unit, arguments)
    }

}

function wander(){

    this.vel = new Vector({
        radians: Math.PI*2*Math.random(),
        magnitude: this.maxVelocity,
    });
};


function stopWander(){

}