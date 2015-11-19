

function QuadNode(options){
    _.defaults(this, {
        bounds: [0,0,10,10],
        contents: [],
        children: [],
        depth: 0,
    });
    _.extend(this, options);
}

QuadNode.prototype.allChildren = function(){
    if(!this.children.length){
        return [this];
    }
    return _.flatten(_.map(this.children, function(child){
        return child.allChildren();
    }));
};

QuadNode.prototype.allContents = function(){
    if(this.contents.length){
        return [this.contents];
    }
    if(!this.children.length){
        return [];
    }
    return _.flatten(_.map(this.children, function(child){
        return child.allContents();
    }));
};

// Divides into 4 nodes until each node contains less than 10 units or maximum depth is reached
QuadNode.prototype.divide = function(){
    this.children = [
        new QuadNode({
            parent: this,
            depth: this.depth+1,
            bounds: [this.bounds[0], this.bounds[1], (this.bounds[2]+this.bounds[0])/2, (this.bounds[3]+this.bounds[1])/2],
        }),
        new QuadNode({
            parent: this,
            depth: this.depth+1,
            bounds: [(this.bounds[2]+this.bounds[0])/2, this.bounds[1], this.bounds[2], (this.bounds[3]+this.bounds[1])/2],
        }),
        new QuadNode({
            parent: this,
            depth: this.depth+1,
            bounds: [this.bounds[0], (this.bounds[3]+this.bounds[1])/2, (this.bounds[2]+this.bounds[0])/2, this.bounds[3]],
        }),
        new QuadNode({
            parent: this,
            depth: this.depth+1,
            bounds: [(this.bounds[2]+this.bounds[0])/2, (this.bounds[3]+this.bounds[1])/2, this.bounds[2], this.bounds[3]],
        }),
    ];

    this.divideContents();

    // Max contents length and max depth is should be determined by:
    // Size of resulting smallest quadNode vs size of units
    _.each(this.children, function(child){
        if(child.contents.length > 20 && child.depth<5){
            child.divide();
        }
    });
};

// Divides contents into the 4 quadNode children
QuadNode.prototype.divideContents = function(){
    if(!this.children.length){return;}
    var that = this;

    _.each(this.contents, function(unit){
        var unitBox = unit.hitBox()
        _.each(that.children, function(child){
            if(child.contains(unitBox)){
                child.contents.push(unit);
            }
        });
    });
    this.contents = [];
};

QuadNode.prototype.contains = function(unitBox){
    if(unitBox[0] < this.bounds[2] && unitBox[2] > this.bounds[0]){
        if(unitBox[1] < this.bounds[3] && unitBox[3] > this.bounds[1]){
            return true;
        }
    }
};

module.exports = QuadNode;

