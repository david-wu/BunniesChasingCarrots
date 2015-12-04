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

Vector.prototype.magnitude = function(){
    if(this.magnitude){return this.magnitude;}
    return Math.hypot(this.coords);
}

// Optional second vector parameter for recycling
Vector.prototype.setMagnitude = function(mag, v){
    var ratio = mag/Math.hypot.apply(null, this.coords);

    if(v === undefined){
        var newCoords = [];
        for(var i=0,l=this.coords.length; i<l; i++){
            newCoords[i] = this.coords[i]*ratio;
        }

        return new Vector({
            coords: newCoords,
        });
    }else{
        for(var i=0,l=this.coords.length; i<l; i++){
            v.coords[i] = this.coords[i]*ratio;
        }
    }

}

Vector.prototype.applyLinearDrag = function(k){
    for(var i = 0; i < 2; i++){
        this.coords[i] *= (1-k);
    }
}

// Optional second vector parameter for recycling
Vector.prototype.add = function(v2, v){
    if(v === undefined){
        return Vector.add(this, v2);
    }else{
        v.coords[0] = this.coords[0] + v2.coords[0];
        v.coords[1] = this.coords[1] + v2.coords[1];
    }
}

// Optional second vector parameter for recycling
Vector.prototype.subtract = function(v2, v){
    if(v === undefined){
        return Vector.subtract(this, v2);
    }else{
        v.coords[0] = this.coords[0] - v2.coords[0];
        v.coords[1] = this.coords[1] - v2.coords[1];
        return v;
    }
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
    var newCoords = []
    for(var i=0,l=this.coords.length; i<l; i++){
        newCoords[i] = -this.coords[i];
    }
    return new Vector({
        coords: newCoords,
    })
}

module.exports = Vector;