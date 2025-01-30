document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById("tema_site");
    const iconremix = button.querySelector("i");
    const toggleBntIcon = document.querySelector('.toggle_bnt i');
    const body = document.body;
    const fundoMd = document.getElementById("modal-content");
    const dropdownMenu = document.querySelector('.dropdown_menu');
    const linkLogo = document.querySelector('.navbar .logo a');

    // Recupera a preferência de tema do localStorage
    const temaSalvo = localStorage.getItem('modoEscuro');
    if (temaSalvo === 'ativo') {
        body.classList.add("dark-mode");
        dropdownMenu.classList.add("dark-mode");
        fundoMd.style.backgroundColor = '#121212';
        iconremix.classList.replace('ri-moon-line', 'ri-sun-fill');
        iconremix.style.color = 'white';
        toggleBntIcon.style.color = 'white';
        linkLogo.style.color = 'white';
    } else {
        body.classList.remove("dark-mode");
        dropdownMenu.classList.remove("dark-mode");
        fundoMd.style.backgroundColor = '#eeeeee';
        iconremix.classList.replace('ri-sun-fill', 'ri-moon-line');
        iconremix.style.color = 'black';
        toggleBntIcon.style.color = 'black';
        linkLogo.style.color = 'black';
    }

    button.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        dropdownMenu.classList.toggle("dark-mode");

        body.style.transition = "background-color 1s, color 1s";
        fundoMd.style.transition = "background-color 1s, color 1s";

        if (body.classList.contains("dark-mode")) {
            fundoMd.style.backgroundColor = '#121212';
            iconremix.classList.replace('ri-moon-line', 'ri-sun-fill');
            iconremix.style.color = 'white';
            toggleBntIcon.style.color = 'white';
            linkLogo.style.color = 'white';
            
            localStorage.setItem('modoEscuro', 'ativo');
        } else {
            fundoMd.style.backgroundColor = '#eeeeee';
            iconremix.classList.replace('ri-sun-fill', 'ri-moon-line');
            iconremix.style.color = 'black';
            toggleBntIcon.style.color = 'black';
            linkLogo.style.color = 'black';
            
            localStorage.setItem('modoEscuro', 'inativo');
        }
    });
});

