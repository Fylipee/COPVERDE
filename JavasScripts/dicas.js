const links = document.querySelectorAll('.REFE');

// Função para rolar suavemente até o destino
const scrollToElement = (element) => {
    const targetPosition = element.offsetTop - (window.innerHeight / 2) + (element.offsetHeight / 2);
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let startTime = null;

    const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        } else {
            focusElement(element);
        }
    };

    const ease = (t, b, c, d) => {
        const ts = (t /= d) * t;
        const tc = ts * t;
        return b + c * (tc + -2 * ts + 2 * t);
    };

    requestAnimationFrame(animation);
};

// Função para aplicar o efeito de foco no elemento
const focusElement = (element) => {
    element.classList.add('focus');
    setTimeout(() => {
        element.classList.remove('focus');
    }, 2000);
};

// Adiciona o evento de clique a todos os links
links.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = document.querySelector(link.getAttribute('href'));
        if (targetId) {
            scrollToElement(targetId);
        }
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


//Video
const playButton = document.getElementById('playVideoBtn');
const videoWrapper = document.getElementById('videoWrapper');
const closeButton = document.getElementById('closeVideoBtn');
const video = document.getElementById('videoCompostagem');

playButton.addEventListener('click', () => {
    videoWrapper.style.display = 'block';
    playButton.style.display = 'none';

    setTimeout(() => {
        video.play();
    }, 2000);
});

closeButton.addEventListener('click', () => {
    video.pause();
    videoWrapper.style.display = 'none';
    playButton.style.display = 'inline-block';
});