function Vector(options){
    _.extend(this, options);
    _.defaults(this, {
        radians: 0,
        magnitude: 0,
    });

    if(this.degrees){
        this.radians = this.degrees/360*2*Math.PI;
        delete this.degrees
    }

    if(this.coords){
        this.magnitude = Math.hypot.apply(null, this.coords)
        this.radians = Math.atan2(this.coords[1], this.coords[0]);
        delete this.coords;
    }
}

Vector.add = function(v1, v2){
    var coord1 = v1.toCoord();
    var coord2 = v2.toCoord();
    var v =  new Vector({
        coords: [coord1[0]+coord2[0], coord1[1]+coord2[1]]
    });
    return v;
};

Vector.subtract = function(v1,v2){
    // var difference = new Vector(v2)
    // v2.radians = v2.radians+Math.PI;
    return v1.add(v2.inverse());
}

Vector.prototype.toCoord = function(){
    return [Math.cos(this.radians)*this.magnitude, Math.sin(this.radians)*this.magnitude];
};

Vector.prototype.add = function(v2){
    return Vector.add(this, v2);
}

Vector.prototype.subtract = function(v2){
    return Vector.subtract(this, v2);
}

Vector.prototype.distanceFrom = function(v2){
    return this.subtract(v2).magnitude;
}

Vector.prototype.inverse = function(){
    return new Vector({
        magnitude: this.magnitude,
        radians: this.radians+Math.PI,
    })
}

module.exports = Vector;