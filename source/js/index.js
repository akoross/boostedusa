const navIcon = document.querySelector('.nav-header__icon');
const navHeaderLinks = document.querySelectorAll('.nav-header__link');
if (navIcon) {
  const navList = document.querySelector('.nav-header__list');
  navIcon.addEventListener('click', () => {
    document.body.classList.toggle('lock');
    navIcon.classList.toggle('active');
    navList.classList.toggle('active');
  });
  navHeaderLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navIcon.classList.toggle('active');
      navList.classList.toggle('active');
    });
  });
}

const testWebP = (callback) => {
  const webP = new Image();
  webP.onload = webP.onerror = () => {
    callback(webP.height == 2);
  };
  webP.src =
    'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
};

// const result =

// export default result;

testWebP((support) => {
  if (support == true) {
    document.querySelector('body').classList.add('webp');
  } else {
    document.querySelector('body').classList.add('no-webp');
  }
});
