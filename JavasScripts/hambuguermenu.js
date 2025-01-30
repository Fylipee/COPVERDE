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

document.addEventListener('DOMContentLoaded', () => {
  const isHomePage = window.location.pathname.endsWith('/index.html') || 
                     window.location.pathname === '/' || 
                     window.location.pathname === '';
  if (isHomePage) {
    const footer = document.querySelector('footer');
    const tradutor = document.getElementById('tradutor');

    if (footer && tradutor) {
      const updateVisibility = () => {
        const footerRect = footer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const footerPosition = footerRect.top - viewportHeight;

        tradutor.style.opacity = footerPosition < -50 ? '0' : '1';
        tradutor.style.pointerEvents = footerPosition < -50 ? 'none' : 'all';
        tradutor.style.transition = 'opacity 0.3s ease';
      };
      tradutor.style.opacity = '1';
      
      window.addEventListener('scroll', updateVisibility);
      window.addEventListener('resize', updateVisibility);
      updateVisibility();
    }
  }
});
