// Save elements as variables
// n refers to the child number which will be set later
let n = 0;
let imgFront = document.getElementsByClassName('image-front');
let imgBack = document.getElementsByClassName('image-back');

//
let buttonFront = document.getElementsByClassName('front-button');
let buttonBack = document.getElementsByClassName('back-button');
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


let sliderContainer = document.getElementsByClassName('mag-slider-container');
let sliderRange = document.getElementsByClassName('mag-range-slider');
for (let el of sliderRange) {
    el.addEventListener('input', changeZoom);
}

let allSliderContainers = document.getElementsByClassName('img-full-container');
for (let el of allSliderContainers) {
    el.addEventListener('mouseover', currentContainer);
}

            /* Create magnifier glass: */
// ******* needs to be created for each parent div ******* //
let glass = document.createElement("DIV");
glass.setAttribute("class", "img-magnifier-glass");


// main image container
let imgContainer = document.getElementsByClassName('img-magnifier-container');
imgContainer[n].onmouseover = activateGlass;

// set defaults
let toggle = 0;
let toggleEnable = true;
let magnifyActive = true;
let zoom = 1.5;


function currentContainer(e) {
    console.log('mouseover fired');
    console.log(e.target);
    console.log(e.target === allSliderContainers[0]);
    for (let i = 0; i < allSliderContainers.length; i++) {
        if(e.target === allSliderContainers[i]) {
            n = i;
        }
    }
}

function activateGlass(e) {
    //console.log(e);
    if(magnifyActive) {
        magnify(e.target.closest('.img-magnifier-container').querySelector("[data-active='true']"), zoom);
        //console.log(e.target.closest('.img-magnifier-container').querySelector("[data-active='true']").class);
    }
}




function photoChange(e) {
    buttonFront[n].style.border = "1px solid rgba(128, 128, 128, 0.44)"
    buttonBack[n].style.border = "1px solid rgba(128, 128, 128, 0.44)"
    
    e.target.style.border = "1px solid grey"
    
    //console.log(e);

    if (e.target.className === 'front-button') {
        imgFront[n].style.opacity = "100%";
        imgBack[n].style.opacity = "0%";
        //glass.style.backgroundImage = "url('" + imgFront[n].src + "')";
        //console.log(e.target);
        e.target.closest('.img-full-container').querySelector(".image-front").dataset.active = 'true';
        e.target.closest('.img-full-container').querySelector(".image-back").dataset.active = 'false';
    }
    else {
        imgFront[n].style.opacity = "0%";
        imgFront[n].zIndex = "-15";
        imgBack[n].style.opacity = "100%";
        //console.log(e.target.closest('.img-full-container').querySelector(".image-front"));
        //glass.style.backgroundImage = "url('" + imgBack[n].src + "')";
        e.target.closest('.img-full-container').querySelector(".image-front").dataset.active = 'false';
        e.target.closest('.img-full-container').querySelector(".image-back").dataset.active = 'true';
        
    }
}

// Toggly magnifying glass //
function toggleMagnify(e) {
    if(toggleEnable) {
        toggle++;
    if (!!(toggle % 2)) {   //turn OFF
        toggleEnable = false;
        e.target.style.background = "none";
        e.target.children[n].style.color = '#878a8e';
        glass.style.display = 'none';
        //console.log(e);
        // prevent magnify function call 
        magnifyActive = false;
        // collapse sliderContainer
        sliderContainer[n].style.maxWidth = '0';
        sliderContainer[n].style.padding = '0';
        sliderContainer[n].style.margin = '0';
        sliderContainer[n].style.overflow = 'hidden';
        sliderContainer[n].style.transition = "max-width 0.1s ease-in"
        setTimeout(() => {
            sliderContainer[n].style.borderWidth = '0'
            e.target.style.borderTopRightRadius = '5px'
            e.target.style.borderBottomRightRadius = '5px'
            toggleEnable = true;
        }, 90);
    } else {                // turn ON
        toggleEnable = false;
        e.target.style.background = "#dcdcdc74";
        e.target.children[n].style.color = '#6a6d6f';
        glass.style.display = '';
        // allow magnify function call 
        magnifyActive = true;
        // expand sliderContainer[n]
        sliderContainer[n].style.maxWidth = '';
        sliderContainer[n].style.padding = '';
        sliderContainer[n].style.margin = '';
        sliderContainer[n].style.overflow = '';
        e.target.style.borderTopRightRadius = '0';
        e.target.style.borderBottomRightRadius = '0';
        sliderContainer[n].style.border = '';
        sliderContainer[n].style.transition = "max-width 0.1s ease-out";
        setTimeout(() => {
            toggleEnable = true;
        }, 90)
    }
    }
}

// Change magnifying glass zoom
function changeZoom(e) {
    zoom = e.target.value;
    //console.log(e.target.value);
}

// Magnifying glass function //
function magnify(imgID, zoomAmt) {
    var w, h, bw;
  
    
  
    /* Insert magnifier glass: */
    imgID.parentElement.insertBefore(glass, imgID);
  
    /* Set background properties for the magnifier glass: */
    glass.style.backgroundImage = "url('" + imgID.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (imgID.width * zoomAmt) + "px " + (imgID.height * zoomAmt) + "px";
    bw = 3;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;
  
    /* Execute a function when someone moves the magnifier glass over the image: */
    glass.addEventListener("mousemove", moveMagnifier);
    imgID.addEventListener("mousemove", moveMagnifier);
  
    /*and also for touch screens:*/
    glass.addEventListener("touchmove", moveMagnifier);
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
      glass.style.left = (x - w) + "px";
      glass.style.top = (y - h) + "px";
      /* Display what the magnifier glass "sees": */
      glass.style.backgroundPosition = "-" + ((x * zoomAmt) - w + bw) + "px -" + ((y * zoomAmt) - h + bw) + "px";
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





/* Instructions 

1. create glass on mouseover, delete when mouse exits


*/