

function QuadNode(options){
    _.extend(this, options);
    _.defaults(this, {
        bounds: [0,0,10,10],
        contentGroups: [],
        contents: [],
        children: [],
        depth: 0,
    });
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

    this.createChildren();
    this.divideContents();

    // Max contents length and max depth is should be determined by:
    // Area of smallest quadNode's bounds and size of units
    _.each(this.children, function(child){
        if(child.contents.length > 20 && child.depth<4){
            child.divide();
        }
    });
};

QuadNode.prototype.createChildren = function(){
    var newDepth = this.depth+1;
    this.children = [
        new QuadNode({
            parent: this,
            depth: newDepth,
            bounds: [this.bounds[0], this.bounds[1], (this.bounds[2]+this.bounds[0])/2, (this.bounds[3]+this.bounds[1])/2],
        }),
        new QuadNode({
            parent: this,
            depth: newDepth,
            bounds: [(this.bounds[2]+this.bounds[0])/2, this.bounds[1], this.bounds[2], (this.bounds[3]+this.bounds[1])/2],
        }),
        new QuadNode({
            parent: this,
            depth: newDepth,
            bounds: [this.bounds[0], (this.bounds[3]+this.bounds[1])/2, (this.bounds[2]+this.bounds[0])/2, this.bounds[3]],
        }),
        new QuadNode({
            parent: this,
            depth: newDepth,
            bounds: [(this.bounds[2]+this.bounds[0])/2, (this.bounds[3]+this.bounds[1])/2, this.bounds[2], this.bounds[3]],
        }),
    ];
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

