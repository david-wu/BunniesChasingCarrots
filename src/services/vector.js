function Vector(options){
    _.extend(this, options);
    _.defaults(this, {
        radians: 0,
        magnitude: 0,
    });

    if(this.degrees){
        this.radians = this.degrees/360*2*Math.PI;
    }

    this.coords = this.coords || [Math.cos(this.radians)*this.magnitude, Math.sin(this.radians)*this.magnitude];
}


Vector.add = function(v1, v2){
    var coord1 = v1.coords;
    var coord2 = v2.coords;
    var v =  new Vector({
        coords: [coord1[0]+coord2[0], coord1[1]+coord2[1]]
    });
    return v;
};

Vector.subtract = function(v1,v2){
    return v1.add(v2.inverse());
};

Vector.prototype.setMagnitude = function(mag){
    var ratio = mag/Math.hypot.apply(null, this.coords);
    if(!ratio){debugger;return}
    return new Vector({
        coords: _.map(this.coords, function(d){return d*ratio})
    })
}

Vector.prototype.magnitude = function(){
    if(this.magnitude){return this.magnitude;}
    return Math.hypot(this.coords);
}

Vector.prototype.applyLinearDrag = function(k){
    for(var i = 0; i < this.coords.length; i++){
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

    var coords = [];
    for(var i = 0, length=v1Coord.length; i < length; i++){
        coords.push(v2Coord[i]-v1Coord[i]);
    }
    return Math.hypot.apply(null, coords)
}

Vector.prototype.inverse = function(){
    return new Vector({
        coords: _.map(this.coords, function(d){return -d;})
    });
}

module.exports = Vector;