const btn = document.getElementById('menu-btn');
const nav = document.getElementById('menu');
const elem = document.querySelector('.main-carousel');
// const dots = Array.from(document.querySelectorAll('.dot'));

btn.addEventListener('click', () => {
  btn.classList.toggle('open');
  nav.classList.toggle('flex');
  nav.classList.toggle('hidden');
});

let init = false;
let swiper = null;

swiperInit();
window.addEventListener('resize', swiperInit);
function swiperInit() {
  if(window.innerWidth<768) {
    if(!init) {
      init = true;
      swiper = new Swiper('.swiper',{
        spaceBetween: 40,
        pagination:{
          el:'.swiper-pagination',
          bulletActiveClass:'dot--active',
          bulletClass:'dot'
        }
      });
    }
  } else if (init){
    swiper.destroy();
    init = false;
  }
}