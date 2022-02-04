// Save elements as variables
imgFront = document.getElementById('front-image');
imgBack = document.getElementById('back-image');
buttonFront = document.getElementById('front-button');
buttonBack = document.getElementById('back-button');

buttonFront.onclick = borderChange;
buttonBack.onclick = borderChange;


function borderChange(e) {
    buttonFront.style.border = "1px solid rgba(128, 128, 128, 0.44)"
    buttonBack.style.border = "1px solid rgba(128, 128, 128, 0.44)"
    
    e.target.style.border = "1px solid grey"
    
    if(e.target.id === "front-button") {
        imgFront.style.opacity = '100%';
        imgBack.style.opacity = '0%';
        console.log("front");
    } else {
        imgFront.style.opacity = '0%';
        imgBack.style.opacity = '100%';
        console.log("back");
    }
}