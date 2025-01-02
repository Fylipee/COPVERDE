document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById("tema_site");
    const iconremix = button.querySelector("i");
    const toggleBntIcon = document.querySelector('.toggle_bnt i');
    const body = document.body;
    const fundoMd = document.getElementById("modal-content");
    const dropdownMenu = document.querySelector('.dropdown_menu');

    button.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        dropdownMenu.classList.toggle("dark-mode");

        // Transições suaves
        body.style.transition = "background-color 1s, color 1s";
        fundoMd.style.transition = "background-color 1s, color 1s";

        if (body.classList.contains("dark-mode")) {
            fundoMd.style.backgroundColor = 'black';
            iconremix.classList.replace('ri-moon-line', 'ri-sun-fill');
            iconremix.style.color = 'white';
            toggleBntIcon.style.color = 'white';
        } else {
            fundoMd.style.backgroundColor = '#eeeeee';
            iconremix.classList.replace('ri-sun-fill', 'ri-moon-line');
            iconremix.style.color = 'black';
            toggleBntIcon.style.color = 'black';
        }
    });
});


