// Optimum depends on:
// Area of smallest quadNode's bounds and size of units
var maxDepth = 5;
var maxCalculationsPerQuadNode = 200;

function QuadNode(options){
    this.tree = options.tree;
    this.bounds = options.bounds;

    this.contentGroups = options.contentGroups || [];
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

    var i, l, contentGroup;
    var j, k, unit;
    var m, n, child;
    for(i=0,l=2; i<l; i++){
        contentGroup = this.contentGroups[i];

        for(j=0,k=contentGroup.length; j < k; j++){
            unit = contentGroup[j];
            hitCache[unit.id] = hitCache[unit.id] || unit.hitBox();

            for(m=0,n=4; m < n; m++){
                child = this.children[m];
                if(child.contains(hitCache[unit.id])){
                    child.contentGroups[i] = child.contentGroups[i] || [];
                    child.contentGroups[i].push(unit);
                }
            }
        }
    }

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


