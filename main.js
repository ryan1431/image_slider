let n,
    imgButtons = document.querySelectorAll(":is([class$='imgbutton'], [class$='imgbutton-default'])"),
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
for (let el of imgButtons) {
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
    glass[i].style.left = "10%";
    glass[i].style.top = "10%";
}

function currentContainer(e) {
    e = e.target.closest('.img-full-container');
    for (let i = 0; i < allSliderContainers.length; i++) {
        if(e === allSliderContainers[i] && n !== i) {
            n = i;
        }
    }
}

function activateGlass(e) {
    // first get value of global 'n'
    currentContainer(e); 

    // then call magnify :
    if(e.target.closest('.img-full-container').querySelector(".mag-button").dataset.active === 'true') {
        magnify(e.target.closest('.img-magnifier-container').querySelector("[data-active='true']"), zoom[n]);
        e.target.closest('.img-full-container').querySelector(".img-magnifier-glass").style.opacity = '1';
    }
}

function deActivateGlass(e) {
    if(e.target.closest('.img-full-container').querySelector(".mag-button").dataset.active === 'true') {
        e.target.closest('.img-full-container').querySelector(".img-magnifier-glass").style.opacity = '0';
    }
    
}

function photoChange(e) {
    // find relative container
    let container = e.target.closest('.img-full-container');
    let currentImages = container.querySelectorAll(".img-magnifier-container [class*='image']");
    let currentButtons = container.querySelectorAll(".img_buttons [class*='imgbutton']");
    let clicked = e.target;
    let currentTarget = clicked.className.split('-')[0];
    let targetImage;
    // give all buttons default style
    for (let el of currentButtons) {
        el.style.border = '1px solid rgba(128, 128, 128, 0.44)';
    }
    // grey border on clicked button
    clicked.style.border = "1px solid grey";

    // make all images invisible
    for (let el of currentImages) {
        el.style.opacity = '0%';
        el.dataset.active = 'false';
        el.style.pointerEvents = "none";
        el.style.zIndex = "-2";
        // identify correlating image to button image
        if(el.className.split('-')[0] === currentTarget) {
            targetImage = el;
        }
    }
    // set correlating image to show & be active
    targetImage.style.opacity = "100%";
    targetImage.dataset.active = "true";
    targetImage.style.pointerEvents = "";
    targetImage.style.zIndex = "-1";
    targetImage.closest(".img-magnifier-container").querySelector(".img-magnifier-glass").style.zIndex = "0";
}

// Toggly magnifying glass //
function toggleMagnify(e) {
    if (e.target.dataset.active === 'true') {   //turn OFF
        e.target.dataset.active = 'false';
        e.target.style.background = "none";
        e.target.children[0].style.color = '#878a8e';
        glass[n].style.display = 'none';
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
        e.target.dataset.active = 'true';
        e.target.style.background = "#dcdcdc74";
        e.target.children[0].style.color = '#6a6d6f';
        glass[n].style.display = 'block';
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
}

// Magnifying glass function //
function magnify(imgID, zoomAmt) {
    var w, h, bw;

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

// Init mag buttons to OFF
for (let i = 0; i < allSliderContainers.length; i++) {
    n = i;
    buttonMag[n].click();
}

// Init n value
setTimeout(() => {
    n = -1; 
    timeoutDur = 100;
}, 200);

// Prevent further init changes
init = false;