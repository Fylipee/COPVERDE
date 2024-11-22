// Seleciona todos os links com a classe 'REFE';
const links = document.querySelectorAll('.REFE');

links.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();

        // Obtém o ID de destino do href do link;
        const targetId = document.querySelector(this.getAttribute('href'));

        // Função para rolar suavemente até o destino;
        function scrollToElement(element) {
            const targetPosition = element.offsetTop - (window.innerHeight / 2) + (element.offsetHeight / 2);
            let startPosition = window.pageYOffset; // Posição atual da página;
            let distance = targetPosition - startPosition; // Distância a percorrer;
            let duration = 3000;
            let startTime = null;

            // Função de animação para a rolagem suave;
            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                let timeElapsed = currentTime - startTime;
                let run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
                else focusElement(element);
            }
            // Função de "Facilidade" para controlar o comportamento da rolagem;
            function ease(t, b, c, d) {
                let ts = (t /= d) * t;
                let tc = ts * t;
                return b + c * (tc + -3 * ts + 3 * t);
            }
            requestAnimationFrame(animation);
        }
        // Função para aplicar o efeito de foco no elemento;
        function focusElement(element) {
            element.classList.add('focus');
            setTimeout(() => {
                element.classList.remove('focus');
            }, 2000);
        }
        scrollToElement(targetId);
    });
});

//Visibilidade pro "visite o forum!";
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.10
});
const btnLink = document.querySelector('#bntt');
observer.observe(btnLink);