// Save elements as variables
let imgFront = document.getElementById('front-image');
let imgBack = document.getElementById('back-image');
let buttonFront = document.getElementById('front-button');
let buttonBack = document.getElementById('back-button');
let buttonMag = document.getElementById('mag-button');
let slider = document.getElementById('mag-slider-container');
let sliderRange = document.getElementById('mag-range-slider');

sliderRange.oninput = changeZoom;
buttonFront.onclick = borderChange;
buttonBack.onclick = borderChange;
buttonMag.onclick = toggleMagnify;
let toggle = 0;
let toggleEnable = true;
/* Create magnifier glass: */
let glass = document.createElement("DIV");
glass.setAttribute("class", "img-magnifier-glass");
let zoom = 1.5;

function borderChange(e) {
    buttonFront.style.border = "1px solid rgba(128, 128, 128, 0.44)"
    buttonBack.style.border = "1px solid rgba(128, 128, 128, 0.44)"
    
    e.target.style.border = "1px solid grey"
    
    console.log(e);


    if (e.target.id === 'front-button') {
        imgFront.style.opacity = "100%";
        imgBack.style.opacity = "0%";
        glass.style.backgroundImage = "url('" + imgFront.src + "')";
    }
    else {
        imgFront.style.opacity = "0%";
        imgFront.zIndex = "-15";
        imgBack.style.opacity = "100%";
        glass.style.backgroundImage = "url('" + imgBack.src + "')";
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
function magnify(imgID, zoom) {
    var img, w, h, bw;
    img = document.getElementById(imgID);
  
    
  
    /* Insert magnifier glass: */
    img.parentElement.insertBefore(glass, img);
  
    /* Set background properties for the magnifier glass: */
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
    bw = 3;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;
  
    /* Execute a function when someone moves the magnifier glass over the image: */
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);
  
    /*and also for touch screens:*/
    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);
    function moveMagnifier(e) {
      var pos, x, y;
      /* Prevent any other actions that may occur when moving over the image */
      e.preventDefault();
      /* Get the cursor's x and y positions: */
      pos = getCursorPos(e);
      x = pos.x;
      y = pos.y;
      /* Prevent the magnifier glass from being positioned outside the image: */
      if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
      if (x < w / zoom) {x = w / zoom;}
      if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
      if (y < h / zoom) {y = h / zoom;}
      /* Set the position of the magnifier glass: */
      glass.style.left = (x - w) + "px";
      glass.style.top = (y - h) + "px";
      /* Display what the magnifier glass "sees": */
      glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
    }
  
    function getCursorPos(e) {
      var a, x = 0, y = 0;
      e = e || window.event;
      /* Get the x and y positions of the image: */
      a = img.getBoundingClientRect();
      /* Calculate the cursor's x and y coordinates, relative to the image: */
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /* Consider any page scrolling: */
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return {x : x, y : y};
    }
}

magnify("front-image", zoom);