

function Renderer(){
    var renderOptions = {
        antialias: false,
        resolution: 1,
    };

    var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, renderOptions);
    renderer.backgroundColor = 0x000000;
    renderer.fullScreen = fullScreen;
    renderer.windowScreen = windowScreen;
    renderer.toggleScreen = toggleScreen;
    renderer.fullScreenEl = fullScreenEl;
    renderer.resize = resize.bind(null, renderer);
    resize(renderer);

    // setInterval(function(){
    //     resize(renderer)
    // },500);
    // window.addEventListener('resize', resize.bind(null, renderer), false);

    document.body.appendChild(renderer.view);
    document.body.style.overflow = 'hidden';
    document.body.style.margin = 0;

    return renderer;
}


function resize(renderer){
    renderer.width = window.innerWidth;
    renderer.height = window.innerHeight;
    renderer.view.width = renderer.width;
    renderer.view.height = renderer.height;
}

function toggleScreen(element){
    if(fullScreenEl()){
        windowScreen()
    }else{
        fullScreen(element)
    }
}

function fullScreenEl(){
    return document.fullscreenElement ||  document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
}

function windowScreen(){
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

function fullScreen(element){
    element = element || document.documentElement;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
}

module.exports = Renderer;