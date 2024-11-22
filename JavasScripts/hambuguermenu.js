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

cards.forEach(compostagem => {
  const icon = compostagem.querySelector('.compostagem-title i');
  
  compostagem.addEventListener('click', () => {
    // Alterna a classe 'expanded' no card;
    compostagem.classList.toggle('expanded');

    // Verifica se o card está expandido e troca o ícone;
    if (compostagem.classList.contains('expanded')) {
      icon.classList.remove('ri-add-line');
      icon.classList.add('ri-subtract-line');
    } else {
      icon.classList.remove('ri-subtract-line');
      icon.classList.add('ri-add-line');
    }
  });
});

// Esconder o Tradutor (sobreposição no footer! no modo mobile);
const footer = document.querySelector('footer');
const esconder = document.getElementById('tradutor');
  
  window.addEventListener('scroll', () => {
      const posfooter = footer.getBoundingClientRect();
      if (posfooter.top <= window.innerHeight && posfooter.top >= 0) {
          esconder.style.display = 'none'; 
      } else {
          esconder.style.display = 'block'; 
      }
  });
  
  //Indicador que tem um tradutor
  if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
    const seta = document.getElementById('animação');
    
    // Garante que a animação só aconteça se o elemento existir
    if (seta) {
        setTimeout(() => {
            seta.classList.add('sumir');
        }, 5000);
    };
};

