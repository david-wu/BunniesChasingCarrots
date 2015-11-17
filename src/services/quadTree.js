




function QuadNode(options){
    _.defaults(this, {
        bounds: [0,0,10,10],
        contents: [],
        children: [],
    });
    _.extend(this, options);
}

QuadNode.prototype.allChildren = function(){
    var allChildren

    if(this.contents.length){
        return [this];
    }
    if(!this.children.length){
        return [];
    }

    return _.flatten(_.map(this.children, function(child){
        return child.allChildren();
    }))
}

QuadNode.prototype.divide = function(){
    this.children = [
        new QuadNode({
            bounds: [this.bounds[0], this.bounds[1], (this.bounds[2]+this.bounds[0])/2, (this.bounds[3]+this.bounds[1])/2],
        }),
        new QuadNode({
            bounds: [(this.bounds[2]+this.bounds[0])/2, this.bounds[1], this.bounds[2], (this.bounds[3]+this.bounds[1])/2],
        }),
        new QuadNode({
            bounds: [this.bounds[0], (this.bounds[3]+this.bounds[1])/2, (this.bounds[2]+this.bounds[0])/2, this.bounds[3]],
        }),
        new QuadNode({
            bounds: [(this.bounds[2]+this.bounds[0])/2, (this.bounds[3]+this.bounds[1])/2, this.bounds[2], this.bounds[3]],
        }),
    ];
    this.splitContents();
    _.each(this.children, function(child){
        if(child.contents.length > 10){
            child.divide();
        }
    })
}

QuadNode.prototype.splitContents = function(){
    if(!this.children.length){return;}
    var that = this;

    _.each(this.contents, function(unit){
        var unitBox = unit.hitBox()
        _.each(that.children, function(child){
            if(unitBox[0] < child.bounds[2] && unitBox[2] > child.bounds[0]){
                if(unitBox[1] < child.bounds[3] && unitBox[3] > child.bounds[1]){
                    child.contents.push(unit);
                }
            }
        })
    });
    this.contents = [];
}

function QuadTree(bounds){

}

module.exports = QuadNode;