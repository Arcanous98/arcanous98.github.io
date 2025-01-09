(function () {
  var slides = Array.from(document.querySelectorAll('.slide'));

  var slideWidth = slides[0].getBoundingClientRect().width;
  var currentIndex = 0;

  function setSlidePosition() {
    slides.forEach(function (slide, index) {
      var slideOffset = index - currentIndex;
      slide.style.transform = 'translateX(' + slideWidth * slideOffset + 'px)';
    });
  }

  setSlidePosition();

  function moveToSlide(targetIndex) {
    currentIndex = targetIndex;
    setSlidePosition();
  }

  // Add event listeners for previous and next buttons
  var prevButton = document.querySelector('.prev-button');
  var nextButton = document.querySelector('.next-button');

  prevButton.addEventListener('click', function () {
    if (currentIndex > 0) {
      moveToSlide(currentIndex - 1);
    }
  });

  nextButton.addEventListener('click', function () {
    if (currentIndex < slides.length - 1) {
      moveToSlide(currentIndex + 1);
    }
  });
})();
