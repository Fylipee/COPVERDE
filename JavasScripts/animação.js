// Parallax effect index.html
document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
      const hero = document.querySelector('.hero');
      
      if (hero) {
        hero.classList.add('parallax');
      }
    }
  });
  
// Animação de entrada dos elementos index.html
if (window.location.pathname === '/index.html' || window.location.pathname === '/')
    {
        function handleIntersection(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }
        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.5
        });
        document.querySelectorAll('.oquee h2, .oquee p, .textp li, .tracinho2').forEach(element => {
            observer.observe(element);
        });
    }


    document.addEventListener("DOMContentLoaded", () => {
        const cards = document.querySelectorAll('.compostagem');
        
        cards.forEach((compostagem) => {
            const icon = compostagem.querySelector('.compostagem-title i');
            
            compostagem.classList.remove('expanded', 'highlight');
            icon.classList = 'ri-add-line';
    
            compostagem.addEventListener('click', () => {
                const expanded = compostagem.classList.toggle('expanded');
                compostagem.classList.toggle('highlight', expanded);
                icon.classList = expanded ? 'ri-subtract-line' : 'ri-add-line';
            });
        });
    });