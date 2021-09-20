const navIcon = document.querySelector(".nav-header__icon");
const navHeaderLinks = document.querySelectorAll(".nav-header__link");
if (navIcon) {
  const navList = document.querySelector(".nav-header__list");
  navIcon.addEventListener("click", () => {
    document.body.classList.toggle("lock");
    navIcon.classList.toggle("nav-header__icon--active");
    navList.classList.toggle("nav-header__list--active");
  });
  navHeaderLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navIcon.classList.toggle("nav-header__icon--active");
      navList.classList.toggle("nav-header__list--active");
    });
  });
}

const testWebP = (callback) => {
  const webP = new Image();
  webP.onload = webP.onerror = () => {
    callback(webP.height == 2);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
};

// const result =

// export default result;

testWebP((support) => {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});

//------------Slider-SWIPER---------------

const swiper = new Swiper(".swiper", {
  speed: 400,
  loop: true,
  // centerInsufficientSlides: true,
  // centeredSlides: true,
  // centeredSlides: true,
  centeredSlidesBounds: true,
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    // when window width is >= 440px
    440: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    // when window width is >= 840px
    840: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    // when window width is >= 1040px
    1040: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    // when window width is >= 1240px
    1240: {
      slidesPerView: 6,
      spaceBetween: 20,
    },
    // when window width is >= 1440px
    1440: {
      slidesPerView: 7,
      spaceBetween: 20,
    },
  },
});
