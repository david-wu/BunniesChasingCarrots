

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
    if(this.contents.length){
        return [this];
    }
    if(!this.children.length){
        return [this];
    }
    return _.flatten(_.map(this.children, function(child){
        return child.allChildren();
    }));
}

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
}

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

    // Divides until each node contains 10 or less units or maximum depth is reached
    _.each(this.children, function(child){
        if(child.contents.length > 10 && child.depth<10){
            child.divide();
        }
    });
};

QuadNode.prototype.divideContents = function(){
    if(!this.children.length){return;}
    var that = this;

    _.each(this.contents, function(unit){
        var unitBox = unit.hitBox()
        _.each(that.children, function(child){
            if(unitBox[0] < child.bounds[2] && unitBox[2] > child.bounds[0]){
                if(unitBox[1] < child.bounds[3] && unitBox[3] > child.bounds[1]){
                    child.contents.push(unit);
                    unit.quadNode = child;
                }
            }
        });
    });
    this.contents = [];
};

module.exports = QuadNode;

