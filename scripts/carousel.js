
  let currentSlide = 1;
  const totalSlides = 3;
  const slideInterval = 5000; // 5 seconds

  function nextSlide() {
    currentSlide = currentSlide >= totalSlides ? 1 : currentSlide + 1;
    window.location.hash = `slide${currentSlide}`;
  }

  // Start auto-slide
  let autoSlide = setInterval(nextSlide, slideInterval);

  // Pause on hover
  const carousel = document.querySelector('.carousel');
  carousel.addEventListener('mouseenter', () => {
    clearInterval(autoSlide);
  });

  // Resume on mouse leave
  carousel.addEventListener('mouseleave', () => {
    autoSlide = setInterval(nextSlide, slideInterval);
  });

