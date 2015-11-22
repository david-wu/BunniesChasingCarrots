

function User(){
    _.defaults(this, {
        resources: {
            foods: 10,
            woods: 10,
        }
    });
}

User.prototype.drawResources = function(ctx){
    ctx.font = "48px serif";
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'blue';
    ctx.fillText('Foods:' + this.resources.foods, 10, 50);
};


module.exports = new User();