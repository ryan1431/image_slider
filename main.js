// Save elements as variables
// n refers to the child number which will be set later
let n = 0;
let imgFront = document.getElementsByClassName('image-front');
let imgBack = document.getElementsByClassName('image-back');


let buttonFront = document.getElementById('front-button');
let buttonBack = document.getElementById('back-button');


let buttonMag = document.getElementById('mag-button');
let slider = document.getElementById('mag-slider-container');
let sliderRange = document.getElementById('mag-range-slider');

// main image container
let imgContainer = document.getElementsByClassName('img-magnifier-container');
imgContainer[0].onmouseover = activateGlass;

sliderRange.oninput = changeZoom;
buttonFront.onclick = photoChange;
buttonBack.onclick = photoChange;
buttonMag.onclick = toggleMagnify;
let toggle = 0;
let toggleEnable = true;
let magnifyActive = true;
/* Create magnifier glass: */
let glass = document.createElement("DIV");
glass.setAttribute("class", "img-magnifier-glass");

let zoom = 1.5;




function activateGlass(e) {
    console.log(e);
    if(magnifyActive) {
        magnify(e.target.closest('.slider').querySelector("[data-active='true']"), zoom);
        console.log(e.target.closest('.slider').querySelector("[data-active='true']").class);
    }
}




function photoChange(e) {
    buttonFront.style.border = "1px solid rgba(128, 128, 128, 0.44)"
    buttonBack.style.border = "1px solid rgba(128, 128, 128, 0.44)"
    
    e.target.style.border = "1px solid grey"
    
    console.log(e);


    if (e.target.id === 'front-button') {
        imgFront[n].style.opacity = "100%";
        imgBack[n].style.opacity = "0%";
        //glass.style.backgroundImage = "url('" + imgFront[n].src + "')";
        console.log(e.target);
        e.target.closest('.img-full-container').querySelector(".image-front").dataset.active = 'true';
        e.target.closest('.img-full-container').querySelector(".image-back").dataset.active = 'false';
    }
    else {
        imgFront[n].style.opacity = "0%";
        imgFront[n].zIndex = "-15";
        imgBack[n].style.opacity = "100%";
        console.log(e.target.closest('.img-full-container').querySelector(".image-front"));
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
        e.target.children[0].style.color = '#878a8e';
        glass.style.display = 'none';
        console.log(e);
        // prevent magnify function call 
        magnifyActive = false;
        // collapse slider
        slider.style.maxWidth = '0';
        slider.style.padding = '0';
        slider.style.margin = '0';
        slider.style.overflow = 'hidden';
        slider.style.transition = "max-width 0.1s ease-in"
        setTimeout(() => {
            slider.style.borderWidth = '0'
            e.target.style.borderTopRightRadius = '5px'
            e.target.style.borderBottomRightRadius = '5px'
            toggleEnable = true;
        }, 90);
    } else {                // turn ON
        toggleEnable = false;
        e.target.style.background = "#dcdcdc74";
        e.target.children[0].style.color = '#6a6d6f';
        glass.style.display = '';
        console.log('called');
        // allow magnify function call 
        magnifyActive = true;
        // expand slider
        slider.style.maxWidth = '';
        slider.style.padding = '';
        slider.style.margin = '';
        slider.style.overflow = '';
        e.target.style.borderTopRightRadius = '0'
        e.target.style.borderBottomRightRadius = '0'
        slider.style.border = '';
        slider.style.transition = "max-width 0.1s ease-out"
        setTimeout(() => {
            toggleEnable = true;
        }, 90)
    }
    }
}

// Change magnifying glass zoom
function changeZoom(e) {
    zoom = e.target.value;
    console.log(e.target.value);
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