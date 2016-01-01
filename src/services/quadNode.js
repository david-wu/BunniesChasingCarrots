
// Optimum depends on:
// Area of smallest quadNode's bounds and size of units
var maxDepth = 6;
var maxCalculationsPerQuadNode = 100;

function QuadNode(options){
    this.tree = options.tree;
    this.bounds = options.bounds;

    this.contentGroups = options.contentGroups || [[],[]];
    this.children = options.children || [];
    this.depth = options.depth || 0;
}

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
    if(this.depth > maxDepth){return;}

    this.children = this.createChildren();
    this.divideContents();

    // Recursively divides each child while they have too much content
    var i, l, child, childContentGroup;
    for(i=0, l=4; i<l; i++){
        child = this.children[i]
        childContentGroup = child.contentGroups;
        if(childContentGroup[0] && childContentGroup[1]){
            if(childContentGroup[0].length * childContentGroup[1].length > maxCalculationsPerQuadNode){
                child.divide();
            }
        }
    };
    return this;
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

    if(this.children.length === 0){return;}

    var i, l, contentGroup;
    var j, k, unit;
    var m, n, child;
    for(i=0,l=2; i<l; i++){
        contentGroup = this.contentGroups[i];

        for(j=0,k=contentGroup.length; j < k; j++){
            unit = contentGroup[j];
            unit.boxBounds = unit.boxBounds || unit.hitBox();

            if(unit.boxBounds[0] < this.children[0].bounds[2] && unit.boxBounds[1] < this.children[0].bounds[3]){
                this.children[0].contentGroups[i].push(unit);
            }
            if(unit.boxBounds[2] > this.children[1].bounds[0] && unit.boxBounds[1] < this.children[1].bounds[3]){
                this.children[1].contentGroups[i].push(unit);
            }
            if(unit.boxBounds[0] < this.children[2].bounds[2] && unit.boxBounds[3] > this.children[2].bounds[1]){
                this.children[2].contentGroups[i].push(unit);
            }
            if(unit.boxBounds[2] > this.children[3].bounds[0] && unit.boxBounds[3] > this.children[3].bounds[1]){
                this.children[3].contentGroups[i].push(unit);
            }
        }
    }

    this.contentGroups.length = 0;
};

function QuadTree(qnOptions){
    qnOptions.tree = this;
    this.root = new QuadNode(qnOptions);

    return this.root;
}

module.exports = QuadTree;

