function Emitter(obj){
    var scope = {
        _callbacks: {}
    };

    obj.emit = function(){
        return emit.apply(scope, arguments);
    };

    obj.on = function(tag, cb, promise){
        return on.apply(scope, arguments);
    };

    obj.removeCallback = function(tag, cb){
        return removeCallback.apply(scope, arguments);
    };

    return obj;
}

// if emit returned a promise? Too slow :(
function emit(tag){
    var i, l;

    // Long-hand for [].slice.call(arguments), then dropping first arg
    var args = [];
    for(i = 1, l = arguments.length; i < l; i++){
        args.push(arguments[i]);
    }

    var tagCallbacks = this._callbacks[tag] || [];
    for(i = 0, l = tagCallbacks.length; i < l; i++){
        tagCallbacks[i].apply(null, args);
    }
}

function on(tag, cb, promise){
    this._callbacks[tag] = this._callbacks[tag] || [];
    this._callbacks[tag].push(cb);
    if(promise){
        promise.then(removeCallback.bind(this, tag, cb));
    }
    return removeCallback.bind(this, tag, cb);
}

function removeCallback(tag, cb){
    var index = this._callbacks[tag].indexOf(cb);
    this._callbacks[tag].splice(index,1);
}

module.exports = Emitter
