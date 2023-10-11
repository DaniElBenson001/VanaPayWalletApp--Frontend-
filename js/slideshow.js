var slidePosition;

function currentSlide(n){
    slideShow(slidePosition = n);
}

function slideShow(n){
    
    var i;
    var slides = document.getElementsByClassName("containers");
    var circles = document.getElementsByClassName("dots");

    if (n > slides.length) {slidePosition = 1}
    if (n < 1) {slidePosition = slides.length}

    for(i = 0; i < slides.length; i++){
        slides[i].style.display = "none";
    }
    for (i = 0; i < circles.length; i++) {
        circles[i].className = circles[i].className.replace("enable", "");
    }
    
    slides[slidePosition-1].style.display = "block";
    circles[slidePosition-1].className += "enable";
}

function slideShow(){
    var i;
    var slides = document.getElementsByClassName("containers");
    for(i = 0; i < slides.length; i++){
        slides[i].style.display = "none";
    }

    slidePosition++;
    if (slidePosition > slides.length) {slidePosition = 1}
    slides[slidePosition-1].style.display = "block";
    setTimeout(slideShow, 10000);
}

window.addEventListener('load', function(){
    slideShow();
});

var slidePosition = 0;

slideShow();