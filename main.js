let n,
    imgFront = document.getElementsByClassName('image-front'),
    imgBack = document.getElementsByClassName('image-back'),
    buttonFront = document.getElementsByClassName('front-button'),
    buttonBack = document.getElementsByClassName('back-button'),
    toggle = 0,
    toggleEnable = true,
    magnifyActive = true,
    zoom = [],
    glass = [],
    timeoutDur = 0,
    init = true;
    sliderContainer = document.getElementsByClassName('mag-slider-container');
//
// add event listeners for each button
for (let el of buttonFront) {
    el.addEventListener('click', photoChange);
}
for (let el of buttonBack) {
    el.addEventListener('click', photoChange);
}

let buttonMag = document.getElementsByClassName('mag-button');
for (let el of buttonMag) {
    el.addEventListener('click', toggleMagnify);
}

let sliderRange = document.getElementsByClassName('mag-range-slider');
for (let el of sliderRange) {
    el.addEventListener('input', changeZoom);
}

let allSliderContainers = document.getElementsByClassName('img-full-container');
for (let el of allSliderContainers) {
    el.addEventListener('mouseover', currentContainer);
    el.style.zIndex = 10;
}

// main image container
let imgContainer = document.getElementsByClassName('img-magnifier-container');
for (let i = 0; i < imgContainer.length; i++) {

    imgContainer[i].addEventListener('mouseover', activateGlass);
    imgContainer[i].addEventListener('mouseleave', deActivateGlass);
    zoom[i] = 1.5;
    glass[i] = document.createElement("DIV");
    glass[i].setAttribute("class", "img-magnifier-glass");
}

function currentContainer(e) {
    e = e.target.closest('.img-full-container');
    for (let i = 0; i < allSliderContainers.length; i++) {
        if(e === allSliderContainers[i] && n !== i) {
            n = i;
            console.log(n);
        }
    }
}

function activateGlass(e) {
    //console.clear();
    
    currentContainer(e); // set N value (that is all this does)
    if(e.target.closest('.img-full-container').querySelector(".mag-button").dataset.active === 'true') {
        console.log('activate' + ' ' + n);
        // magnify function ******
        magnify(e.target.closest('.img-magnifier-container').querySelector("[data-active='true']"), zoom[n]);
        console.log(e.target.closest('.img-full-container').querySelector('.img-magnifier-glass').style.opacity);
        console.log('activate glass');
        e.target.closest('.img-full-container').querySelector(".img-magnifier-glass").style.opacity = '1';
    }
}

function deActivateGlass(e) {
    if(e.target.closest('.img-full-container').querySelector(".mag-button").dataset.active === 'true') {
        console.log('deactivate glass');
        e.target.closest('.img-full-container').querySelector(".img-magnifier-glass").style.opacity = '0';
    }
    
}

function photoChange(e) {
    buttonFront[n].style.border = "1px solid rgba(128, 128, 128, 0.44)"
    buttonBack[n].style.border = "1px solid rgba(128, 128, 128, 0.44)"
    e.target.style.border = "1px solid grey"
    
    if (e.target.className === 'front-button') {
        imgFront[n].style.opacity = "100%";
        imgBack[n].style.opacity = "0%";
        e.target.closest('.img-full-container').querySelector(".image-front").dataset.active = 'true';
        e.target.closest('.img-full-container').querySelector(".image-back").dataset.active = 'false';
    }
    else {
        imgFront[n].style.opacity = "0%";
        imgFront[n].style.zIndex = "-10";
        //imgBack[n].style.zIndex = "10";
        //glass[n].style.zIndex = "11";
        imgBack[n].style.opacity = "100%";
        e.target.closest('.img-full-container').querySelector(".image-front").dataset.active = 'false';
        e.target.closest('.img-full-container').querySelector(".image-back").dataset.active = 'true';
    }
}

// Toggly magnifying glass //
function toggleMagnify(e) {
    if (e.target.dataset.active === 'true') {   //turn OFF
        console.log(e.target);
        //toggleEnable = false;
        e.target.dataset.active = 'false';
        e.target.style.background = "none";
        e.target.children[0].style.color = '#878a8e';
        glass[n].style.display = 'none';

        /*let mag = e.target.closest('.img-full-container').getElementsByClassName('img-magnifier-glass');
        for (let el of mag) {
            el.style.display = 'none';
        }*/
        // prevent magnify function call 
        //magnifyActive = false;
        // collapse sliderContainer
        sliderContainer[n].style.maxWidth = '0';
        sliderContainer[n].style.padding = '0';
        sliderContainer[n].style.margin = '0';
        sliderContainer[n].style.overflow = 'hidden';
        sliderContainer[n].style.transition = "max-width 0.1s ease-in"
        if(init) {
            sliderContainer[n].style.borderWidth = '0'
            e.target.style.borderTopRightRadius = '5px'
            e.target.style.borderBottomRightRadius = '5px'
        }
        else {
            setTimeout(() => {
                sliderContainer[n].style.borderWidth = '0'
                e.target.style.borderTopRightRadius = '5px'
                e.target.style.borderBottomRightRadius = '5px'
            }, timeoutDur);
        }
    } else {                // turn ON
        //toggleEnable = false;

        //button front, button back
        e.target.dataset.active = 'true';
        e.target.style.background = "#dcdcdc74";
        e.target.children[0].style.color = '#6a6d6f';
        glass[n].style.display = 'block';
        /*let mag = e.target.closest('.img-full-container').getElementsByClassName('img-magnifier-glass');
        for (let el of mag) {
            el.style.display = '';
        }*/
        // allow magnify function call 
        //magnifyActive = true;
        // expand sliderContainer[n]
        sliderContainer[n].style.maxWidth = '';
        sliderContainer[n].style.padding = '';
        sliderContainer[n].style.margin = '';
        sliderContainer[n].style.overflow = '';
        e.target.style.borderTopRightRadius = '0';
        e.target.style.borderBottomRightRadius = '0';
        sliderContainer[n].style.border = '';
        sliderContainer[n].style.transition = "max-width 0.1s ease-out";
    }
}

// Change magnifying glass zoom
function changeZoom(e) {
    zoom[n] = e.target.value;
    //console.log(e.target.value);
}

// Magnifying glass function //
function magnify(imgID, zoomAmt) {
    var w, h, bw;
    //console.log(n);
    /* Insert magnifier glass: */
    imgID.parentElement.insertBefore(glass[n], imgID);
  
    /* Set background properties for the magnifier glass: */
    glass[n].style.backgroundImage = "url('" + imgID.src + "')";
    glass[n].style.backgroundRepeat = "no-repeat";
    glass[n].style.backgroundSize = (imgID.width * zoomAmt) + "px " + (imgID.height * zoomAmt) + "px";
    bw = 3;
    w = glass[n].offsetWidth / 2;
    h = glass[n].offsetHeight / 2;
  
    /* Execute a function when someone moves the magnifier glass[n] over the image: */
    glass[n].addEventListener("mousemove", moveMagnifier);
    imgID.addEventListener("mousemove", moveMagnifier);
  
    /*and also for touch screens:*/
    glass[n].addEventListener("touchmove", moveMagnifier);
    imgID.addEventListener("touchmove", moveMagnifier);
    function moveMagnifier(e) {
      var pos, x, y;
      /* Prevent any other actions that may occur when moving over the image */
      e.preventDefault();
      /* Get the cursor's x and y positions: */
      pos = getCursorPos(e);
      x = pos.x;
      y = pos.y;
      /* Prevent the magnifier glass from being positioned outside the image: */
      if (x > imgID.width - (w / zoomAmt)) {x = imgID.width - (w / zoomAmt);}
      if (x < w / zoomAmt) {x = w / zoomAmt;}
      if (y > imgID.height - (h / zoomAmt)) {y = imgID.height - (h / zoomAmt);}
      if (y < h / zoomAmt) {y = h / zoomAmt;}
      /* Set the position of the magnifier glass: */
      glass[n].style.left = (x - w) + "px";
      glass[n].style.top = (y - h) + "px";
      /* Display what the magnifier glass "sees": */
      glass[n].style.backgroundPosition = "-" + ((x * zoomAmt) - w + bw) + "px -" + ((y * zoomAmt) - h + bw) + "px";
    }
    function getCursorPos(e) {
      var a, x = 0, y = 0;
      e = e || window.event;
      /* Get the x and y positions of the image: */
      a = imgID.getBoundingClientRect();
      /* Calculate the cursor's x and y coordinates, relative to the image: */
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /* Consider any page scrolling: */
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return {x : x, y : y};
    }
}



for (let i = 0; i < allSliderContainers.length; i++) {
    n = i;
    buttonMag[n].click();
}




setTimeout(() => {
    n = -1; 
    timeoutDur = 100;
    console.log('changed');
}, 200);


init = false;
/* bug 

switching image first then turning on magnifier causes glitch where sometimes it wont activate.
- if you switch images then come back, it works fine

- switching back to first image while magnifier is off, then turning it on, will not replicate the issue. (only happens with second image)


solution: 
position of magnifier when leaving field, since magnifier hover element is used and not image hover

thus, 

- on image over: 
    - check if magnifier dataset is active,
        - if so, set opacity to img-magnifier-glass
        - else, do nothing
..

*/