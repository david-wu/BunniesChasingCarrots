
function Renderer(bounds){
    var renderDims = [bounds[2]-bounds[0], bounds[3]-bounds[1]];
    var renderOptions = {
        antialias: false,
        transparent: true,
        resolution: 1,
    };
    var renderer = PIXI.autoDetectRenderer(renderDims[0], renderDims[1], renderOptions);
    document.body.appendChild(renderer.view);
    return renderer;
}

module.exports = Renderer;