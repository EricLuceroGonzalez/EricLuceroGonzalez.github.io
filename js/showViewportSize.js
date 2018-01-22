window.onresize = displayWindowSize;
window.onload = displayWindowSize;

function displayWindowSize() {
    // your size calculation code here
    var myWidth = window.innerWidth;
    var myHeight = window.innerHeight;
    document.getElementById("dimensions").innerHTML = myWidth + "x" + myHeight;
};

window.addEventListener('load', function(){
 
    var box1 = document.getElementById('box1')
    var statusdiv = document.getElementById('statusdiv')
    var startx = 0
    var dist = 0
 
    box1.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0] // reference first touch point (ie: first finger)
        startx = parseInt(touchobj.clientX) // get x position of touch point relative to left edge of browser
        statusdiv.innerHTML = 'Status: touchstart<br> ClientX: ' + startx + 'px'
        statusdiv.style.backgroundColor = 'black';
        e.preventDefault()
    }, false)
 
    box1.addEventListener('touchmove', function(e){
        var touchobj = e.changedTouches[0] // reference first touch point for this event
        var dist = parseInt(touchobj.clientX) - startx
        statusdiv.innerHTML = 'Status: touchmove<br> Horizontal distance traveled: ' + dist + 'px'
        statusdiv.style.backgroundColor = 'blue';
        e.preventDefault()
    }, false)
 
    box1.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0] // reference first touch point for this event
        statusdiv.innerHTML = 'Status: touchend<br> Resting x coordinate: ' + touchobj.clientX + 'px'
        statusdiv.style.backgroundColor = 'yellow';
        e.preventDefault()
    }, false)
 
}, false)