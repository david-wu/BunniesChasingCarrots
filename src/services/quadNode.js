

function QuadNode(options){
    _.extend(this, options);
    _.defaults(this, {
        bounds: [0,0,10,10],
        contentGroups: [],
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

QuadNode.prototype.allContentNodes = function(){
    if(this.contentGroups.length){
        return [this];
    }
    if(!this.children.length){
        return [];
    }

    return _.flatten(_.map(this.children, function(child){
        return child.allContentNodes();
    }));
}

// Divides into 4 nodes until each node contains less than 10 units or maximum depth is reached
QuadNode.prototype.divide = function(){

    this.createChildren();
    this.divideContents();

    // Max contents length and max depth is should be determined by:
    // Area of smallest quadNode's bounds and size of units
    _.each(this.children, function(child){
        if(child.contentGroups[0] && child.contentGroups[1]){
            if(child.contentGroups[0].length * child.contentGroups[1].length > 100 && child.depth<6){
                child.divide();
            }
        }
    });
};

QuadNode.prototype.createChildren = function(){
    var newDepth = this.depth+1;
    var bounds0 = this.bounds[0];
    var bounds1 = this.bounds[1];
    var bounds2 = this.bounds[2];
    var bounds3 = this.bounds[3];

    this.children = [
        new QuadNode({
            parent: this,
            depth: newDepth,
            bounds: [bounds0, bounds1, (bounds2+bounds0)/2, (bounds3+bounds1)/2],
        }),
        new QuadNode({
            parent: this,
            depth: newDepth,
            bounds: [(bounds2+bounds0)/2, bounds1, bounds2, (bounds3+bounds1)/2],
        }),
        new QuadNode({
            parent: this,
            depth: newDepth,
            bounds: [bounds0, (bounds3+bounds1)/2, (bounds2+bounds0)/2, bounds3],
        }),
        new QuadNode({
            parent: this,
            depth: newDepth,
            bounds: [(bounds2+bounds0)/2, (bounds3+bounds1)/2, bounds2, bounds3],
        }),
    ];
};

// Divides contents into the 4 quadNode children
QuadNode.prototype.divideContents = function(){
    if(this.children.length===0){return;}
    var that = this;

    _.each(this.contentGroups, function(contentGroup, index){
        _.each(contentGroup, function(unit){
            var unitBox = unit.hitBox();

            _.each(that.children, function(child){
                if(child.contains(unitBox)){
                    child.contentGroups[index] = child.contentGroups[index] || [];
                    child.contentGroups[index].push(unit);
                }
            });
        });
    });

    this.contentGroups = [];
};

QuadNode.prototype.contains = function(unitBox){
    if(unitBox[0] < this.bounds[2] && unitBox[2] > this.bounds[0]){
        if(unitBox[1] < this.bounds[3] && unitBox[3] > this.bounds[1]){
            return true;
        }
    }
};

module.exports = QuadNode;

