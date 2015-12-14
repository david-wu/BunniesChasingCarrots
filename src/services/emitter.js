
function Emitter(obj){
    var callbacks = {};

    obj.emit = emit.bind(null, callbacks);
    obj.on = on.bind(null, callbacks);
    obj.removeCallback = removeCallback.bind(null, callbacks);

    return obj;
}

// if emit returned a promise? Too slow :(
function emit(callbacks, tag, payload){
    var i, l;
    var tagCallbacks = callbacks[tag];

    if(tagCallbacks === undefined){return}

    for(i = 0, l = tagCallbacks.length; i < l; i++){
        tagCallbacks[i](payload);
    }
}

function on(callbacks, tag, cb, promise){
    callbacks[tag] = callbacks[tag] || [];
    callbacks[tag].push(cb);
    if(promise){
        promise.then(removeCallback.bind(null, tag, cb));
    }

    return removeCallback.bind(null, callbacks, tag, cb);
}

function removeCallback(callbacks, tag, cb){
    var index = callbacks[tag].indexOf(cb);
    callbacks[tag].splice(index,1);
}

module.exports = Emitter
