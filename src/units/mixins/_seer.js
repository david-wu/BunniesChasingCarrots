
function WanderClass(unit){

    unit.on('step', function(){
        unit.wander();
    });

    unit.wander = wander.bind(unit);
}

function wander(){
    this.vel = new Vector({
        radians: Math.PI*2*Math.random(),
        magnitude: this.maxVelocity,
    });
};

