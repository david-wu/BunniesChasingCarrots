function Vector(options){
    this.magnitude = options.magnitude || 0;
    this.radians = options.radians || 0;

    this.coords = options.coords || [Math.cos(this.radians)*this.magnitude, Math.sin(this.radians)*this.magnitude];
}


Vector.add = function(v1, v2){
    var coord1 = v1.coords;
    var coord2 = v2.coords;
    return new Vector({
        coords: [coord1[0]+coord2[0], coord1[1]+coord2[1]]
    });
};

Vector.subtract = function(v1,v2){
    return v1.add(v2.inverse());
};

Vector.prototype.setMagnitude = function(mag){
    var ratio = mag/Math.hypot.apply(null, this.coords);
    return new Vector({
        coords: _.map(this.coords, function(d){return d*ratio})
    })
}

Vector.prototype.magnitude = function(){
    if(this.magnitude){return this.magnitude;}
    return Math.hypot(this.coords);
}

Vector.prototype.applyLinearDrag = function(k){
    for(var i = 0; i < 2; i++){
        this.coords[i] *= (1-k);
    }
}

Vector.prototype.add = function(v2){
    return Vector.add(this, v2);
}

Vector.prototype.subtract = function(v2){
    return Vector.subtract(this, v2);
}

Vector.prototype.distanceFrom = function(v2){
    var v1Coord = this.coords;
    var v2Coord = v2.coords;
    var i, length;
    var distance = 0;
    for(i = 0, length = v1Coord.length; i < length; i++){
        distance += Math.pow(v2Coord[i] - v1Coord[i], 2);
    }
    return Math.pow(distance, 0.5);
};

Vector.prototype.inverse = function(){
    return new Vector({
        coords: _.map(this.coords, function(d){return -d;})
    });
}

module.exports = Vector;