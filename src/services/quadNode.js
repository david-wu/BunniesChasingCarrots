// Optimum depends on:
// Area of smallest quadNode's bounds and size of units
var maxDepth = 6;
var maxCalculationsPerQuadNode = 100;

function QuadNode(options){
    _.extend(this, options);
    _.defaults(this, {
        contentGroups: [],
        children: [],
        depth: 0,
    });
}

// Used for quadTree demo
QuadNode.prototype.allChildren = function(){
    if(!this.children.length){
        return [this];
    }

    return this.children[0].allChildren()
        .concat(
            this.children[1].allChildren(),
            this.children[2].allChildren(),
            this.children[3].allChildren()
        );
};

// Gets relevant quadNodes for collision checking
QuadNode.prototype.allContentNodes = function(){
    if(this.contentGroups[0] && this.contentGroups[1]){
        return [this];
    }
    if(!this.children.length){
        return [];
    }

    return this.children[0].allContentNodes()
        .concat(
            this.children[1].allContentNodes(),
            this.children[2].allContentNodes(),
            this.children[3].allContentNodes()
        );
}

// Divides content into 4 nodes
QuadNode.prototype.divide = function(){

    this.children = this.createChildren();
    this.divideContents();

    _.each(this.children, function(child){
        if(child.contentGroups[0] && child.contentGroups[1]){
            if(child.contentGroups[0].length * child.contentGroups[1].length > maxCalculationsPerQuadNode && child.depth < maxDepth){
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

    return [
        new QuadNode({
            tree: this.tree,
            depth: newDepth,
            bounds: [bounds0, bounds1, (bounds2 + bounds0) / 2, (bounds3 + bounds1) / 2],
        }),
        new QuadNode({
            tree: this.tree,
            depth: newDepth,
            bounds: [(bounds2 + bounds0) / 2, bounds1, bounds2, (bounds3 + bounds1) / 2],
        }),
        new QuadNode({
            tree: this.tree,
            depth: newDepth,
            bounds: [bounds0, (bounds3 + bounds1) / 2, (bounds2 + bounds0) / 2, bounds3],
        }),
        new QuadNode({
            tree: this.tree,
            depth: newDepth,
            bounds: [(bounds2 + bounds0) / 2, (bounds3+bounds1) / 2, bounds2, bounds3],
        }),
    ];
};

// Divides contents into the quadNode's children
QuadNode.prototype.divideContents = function(){
    var that = this;
    var hitCache = this.tree.hitBoxCache

    if(this.children.length === 0){return;}

    _.each(this.contentGroups, function(contentGroup, index){
        _.each(contentGroup, function(unit){
            hitCache[unit.id] = hitCache[unit.id] || unit.hitBox();

            _.each(that.children, function(child){
                if(child.contains(hitCache[unit.id])){
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

function QuadTree(qnOptions){
    this.hitBoxCache = {};
    qnOptions.tree = this;
    this.root = new QuadNode(qnOptions);
    this.root.divide();

    return this.root;
}

module.exports = QuadTree;


