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
