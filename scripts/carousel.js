
const scrollToSlide=(slideId)=> {
    const slide = document.getElementById(slideId);
    if (slide) {
        // slide carousel pages
        const carousel = document.querySelector('.carousel');
        if (carousel) {
            carousel.scrollLeft = slide.offsetLeft;
        }
    }
}

// auto play carousel
let currentSlide = 1;
const totalSlides = 3;
let autoPlayInterval;

const autoPlayCarousel=()=>{
    currentSlide = currentSlide >= totalSlides ? 1 : currentSlide + 1;
    
    const carousel = document.querySelector('.carousel');
    const slide = document.getElementById(`slide${currentSlide}`);
    
    if (carousel && slide) {
        // for sliding without jumping to the carousel every time
        carousel.scrollLeft = slide.offsetLeft;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // auto play after every 5 seconds
    autoPlayInterval = setInterval(autoPlayCarousel, 5000);
    
    // pause on hover
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(autoPlayCarousel, 5000);
        });
    }
});
