

function Menu(items){
    this.items = items;
}

Menu.prototype.drawItems = function(items){
    var that = this;

    var childMargins = {
        left: 20,
        right: 5,
        top: 20,
        bottom: 5,
    };

    var childDims = {
        width: 100,
        height: 50,
    };

    var childPos = {
        x: function(i){
            return childMargins.left + (i * (childMargins.left + childDims.width + childMargins.right));
        },
        y: function(i){
            return childMargins.top;
        },
    };


    _.each(this.items, function(item, i){
        if(!item.graphics){
            var box = new PIXI.Graphics()
                .beginFill(0x0000FF)
                .lineStyle(5, 0x000000)
                .drawRect(0, 0, childDims.width, childDims.height);
            box.interactive = true;
            box.mousedown = function(){
                item.click();
            }

            var text = new PIXI.Text(item.name, {
                fill: 0xFFFFFF,
            });

            item._graphics = {
                container: new PIXI.Container(),
                box: box,
                text: text,
            };
            item._graphics.container.addChild(box);
            item._graphics.container.addChild(text);
        }

        item._graphics.box.width = childDims.width;
        item._graphics.box.height = childDims.height;
        item._graphics.container.position.x = childPos.x(i);
        item._graphics.container.position.y = childPos.y(i);
    });

    if(!this.items.graphics){
        this.items.graphics = new PIXI.Graphics()
            .beginFill(0x00FF00)
            .lineStyle(5, 0xFF0000)
            .drawRect(0, 0, this.items.dims[0], this.items.dims[1]);
    }

    _.each(this.items, function(item){
        that.items.graphics.addChild(item._graphics.container);
    });


    return this.items.graphics;
}


module.exports = Menu;