'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const nav = document.querySelector('.nav')
const navLink = document.querySelectorAll('.nav__link')
const navLinks = document.querySelector('.nav__links')

const btnScrollTo = document.querySelector(".btn--scroll-to")

const tabs = document.querySelectorAll(".operations__tab")
const tabsContainer = document.querySelector(".operations__tab-container")
const tabsContent = document.querySelectorAll(".operations__content")

const header = document.querySelector(".header")
const section = document.querySelectorAll('.section')
const section1 = document.querySelector("#section--1")

const featuresImg = document.querySelectorAll('img[data-src]')
const slides = document.querySelectorAll('.slide')

const sliderbtnRight = document.querySelector('.slider__btn--right')
const sliderbtnLeft = document.querySelector('.slider__btn--left')

const dots = document.querySelector('.dots')
const menuBtn = document.querySelector('.menu-btn')

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((b) => {
  b.addEventListener('click', openModal);
})

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

menuBtn.addEventListener('click' , function(e) {
  menuBtn.classList.toggle('menu-btn-active')
  menuBtn.classList.toggle('fixed')
  navLinks.classList.toggle('hide')
})

btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();
  section1.scrollIntoView({ behavior: 'smooth' })
})

navLinks.addEventListener('click', (e) => {
  e.preventDefault()
  if (e.target.classList.contains('nav__link') && !e.target.classList.contains('btn--show-modal')) {
    document.querySelector(e.target.getAttribute('href')).scrollIntoView({ behavior: 'smooth' })
    navLinks.classList.add('hide')
  }

})

tabsContainer.addEventListener('click', (e) => {
  const clicked = e.target.closest('.operations__tab')

  if (!clicked) return;

  tabs.forEach((tab) => tab.classList.remove('operations__tab--active'))
  tabsContent.forEach(tabC => tabC.classList.remove('operations__content--active'))
  document
    .querySelector(`.operations__tab--${clicked.getAttribute('data-tab')
      }`)
    .classList
    .add('operations__tab--active')
  document
    .querySelector(`.operations__content--${clicked.getAttribute('data-tab')
      }`)
    .classList
    .add('operations__content--active')
})

nav.addEventListener('mouseover', function (e) {
  const hovered = e.target.closest('.nav__link')
  if (!hovered) return;
  navLink.forEach(link => link.style.opacity = 0.5)
  e.target.closest('.nav').querySelector('img').style.opacity = 0.5
  hovered.style.opacity = 1
})
nav.addEventListener('mouseout', function (e) {
  const hovered = e.target.closest('.nav__link')
  if (!hovered) return;
  navLink.forEach(link => link.style.opacity = 1)
  e.target.closest('.nav').querySelector('img').style.opacity = 1
})

const headerObs = new IntersectionObserver((en, ob) => {
  en.forEach(enn => {
    window.addEventListener('scroll', () => {
      if (!enn.isIntersecting) nav.classList.add('sticky')
      else nav.classList.remove('sticky')
    })
  })
}, { root: null, threshold: [0, 0.2] , rootMargin : `-${nav.getBoundingClientRect().height}px`})
headerObs.observe(header)

section.forEach(sec => {
  sec.classList.add('section--hidden')
})
section.forEach(sec => {
  const sectionObs = new IntersectionObserver((en, ob) => {
    en.forEach(enn => {
      if(enn.isIntersecting) sec.classList.remove('section--hidden')
    })
  }, { root: null, threshold: [0, 0.2] , rootMargin : `-200px`})
  sectionObs.observe(sec)
})

featuresImg.forEach(img => {
  const imgObs = new IntersectionObserver((en , ob) => {
    en.forEach(enn => {
      if(enn.isIntersecting) {
        img.setAttribute('src' , img.getAttribute('data-src'))
        img.addEventListener('load' , () => {
          img.classList.remove('lazy-img')
        })
      }
    })
  }, { root: null , threshold: 0 , rootMargin: '200px'})
  imgObs.observe(img)
})

slides.forEach((slide , i) => {
  slide.style.transform = `translateX(${100 * i}%)`
  
})

let move = 0;

const activeDot = (slid) => {
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'))
  document.querySelector(`.dots__dot[data-slide="${slid}"]`).classList.add('dots__dot--active')
}

const goTo = (slid) => {
  slides.forEach((slide , i) => {
    slide.style.transform = `translateX(${100 * (i - slid)}%)`
  })
}
sliderbtnRight.addEventListener('click' , () => {
  if(slides.length -1 == move) move = 0;
  else move++;
  goTo(move)
  activeDot(move)
})
sliderbtnLeft.addEventListener('click' , () => {
  if(move == 0) move = slides.length - 1;
  else move--;
  goTo(move)
  activeDot(move)
})
const creatDot = function() {
  slides.forEach((_ , i) => {
    dots.insertAdjacentHTML('beforeend' , `<button class="dots__dot" data-slide="${i}"></button>`)
  })
}
creatDot()

activeDot(0);

dots.addEventListener('click' , (e) => {
  if(e.target.classList.contains('dots__dot')){
    e.target.classList.add('dots__dot--active')
    goTo(+e.target.getAttribute('data-slide'))
    activeDot(+e.target.getAttribute('data-slide'))
  }
})