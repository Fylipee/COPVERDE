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

if (window.location.pathname === '/index.html') {
  cards.forEach(compostagem => {
    const icon = compostagem.querySelector('.compostagem-title i');
    // Função para alternar o ícone ao passar o mouse
    const toggleIconOnHover = () => {
      icon.classList.remove('ri-add-line');
      icon.classList.add('ri-subtract-line');
    };
    // Função para restaurar o ícone quando o mouse sai
    const restoreIconOnHoverOut = () => {
      icon.classList.remove('ri-subtract-line');
      icon.classList.add('ri-add-line');
    };
    // Adiciona os eventos de hover
    compostagem.addEventListener('mouseenter', toggleIconOnHover);
    compostagem.addEventListener('mouseleave', restoreIconOnHoverOut);
    // Verifica o estado inicial do ícone ao carregar a página
    if (!compostagem.classList.contains('expanded')) {
      icon.classList.remove('ri-subtract-line');
      icon.classList.add('ri-add-line');
    }
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

