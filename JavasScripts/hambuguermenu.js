const toggleBnt = document.querySelector('.toggle_bnt');
const toggleBntIcon = document.querySelector('.toggle_bnt i');
const dropDownMenu = document.querySelector('.dropdown_menu');

toggleBnt.onclick = function() {
  dropDownMenu.classList.toggle('open');


  const isOpen = dropDownMenu.classList.contains('open');

  toggleBntIcon.classList = isOpen
    ? 'fa-solid fa-x'
    : 'fa-solid fa-bars';
};

document.addEventListener('click', function(event) {
  const isClickInsideMenu = dropDownMenu.contains(event.target);
  const isClickInsideToggle = toggleBnt.contains(event.target);

  if (!isClickInsideMenu && !isClickInsideToggle) {
    dropDownMenu.classList.remove('open');
    toggleBntIcon.classList = 'fa-solid fa-bars';
  }
});


const cards = document.querySelectorAll('.compostagem');
if (window.location.pathname.endsWith('/index.html') || window.location.pathname === '/') {
    cards.forEach(compostagem => {
        const icon = compostagem.querySelector('.compostagem-title i');
        compostagem.addEventListener('click', () => {
            const isExpanded = compostagem.classList.toggle('expanded')
            if (isExpanded) {
                compostagem.classList.add('highlight');
            } else {
                compostagem.classList.remove('highlight');
            }
            icon.classList = isExpanded ? 'ri-subtract-line' : 'ri-add-line';
        });
    });
}

const footer = document.querySelector('footer');
const esconder = document.getElementById('tradutor');
const seta = document.getElementById('animação');

if (window.location.pathname === '/index.html') {

  setTimeout(() => {
    window.addEventListener('scroll', () => {
      const posfooter = footer.getBoundingClientRect();
      esconder.style.display = posfooter.top <= 0 ? 'none' : 'block';
    });
  }, 500);

  if (seta) {
    setTimeout(() => {
      seta.classList.add('sumir');
    }, 5000);
  }
}

