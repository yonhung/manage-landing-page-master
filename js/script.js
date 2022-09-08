const btn = document.getElementById('menu-btn');
const nav = document.getElementById('menu');
const elem = document.querySelector('.main-carousel');
const dots = Array.from(document.querySelectorAll('.dot'));

btn.addEventListener('click', () => {
  btn.classList.toggle('open');
  nav.classList.toggle('flex');
  nav.classList.toggle('hidden');
});

const slider = document.querySelector('.slider-container');
const slides = Array.from(document.querySelectorAll('.slide'));
const slideWidth =
  slides[0].clientWidth + slides[0].getBoundingClientRect().left;

let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationId = 0,
  currentIndex = 0;

slides.forEach((slide, index) => {
  const slideImage = slide.querySelector('img');
  slideImage.addEventListener('dragstart', (e) => e.preventDefault());

  // Touch events
  slide.addEventListener('touchstart', touchStart(index));
  slide.addEventListener('touchend', touchEnd);
  slide.addEventListener('touchmove', touchMove);
});

function touchStart(index) {
  return function (event) {
    currentIndex = index;
    startPos = getPosX(event);
    isDragging = true;

    animationId = requestAnimationFrame(animation);
    slider.classList.add('grabbing');
  };
}

function touchMove(event) {
  if (isDragging) {
    const currenPosition = getPosX(event);
    const touchOffset = currenPosition - startPos;
    currentTranslate = prevTranslate + touchOffset;
    if (
      (currentIndex === 0 && touchOffset > 100) ||
      (currentIndex === slides.length - 1 && touchOffset < -100)
    )
      currentTranslate = prevTranslate;
  }
}

function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationId);

  const moveBy = currentTranslate - prevTranslate;
  if (moveBy < -50 && currentIndex < slides.length - 1) {
    dots[currentIndex].classList.remove('dot--active');
    currentIndex += 1;
  }
  if (moveBy > 50 && currentIndex > 0) {
    dots[currentIndex].classList.remove('dot--active');
    currentIndex -= 1;
  }
  dots[currentIndex].classList.add('dot--active');
  setPositionByIndex();
  slider.classList.remove('grabbing');
}

function getPosX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
  setSliderPosition();
  if (isDragging) {
    requestAnimationFrame(animation);
  }
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -slideWidth;
  prevTranslate = currentTranslate;
  setSliderPosition();
}
