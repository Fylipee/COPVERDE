document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById("tema_site");
    const icon = button.querySelector("i");
    const body = document.body;
    const fundoMd = document.getElementById("modal-content");

    button.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        // Transições suaves
        body.style.transition = "background-color 1s, color 1s";
        fundoMd.style.transition = "background-color 1s, color 1s";

        if (body.classList.contains("dark-mode")) {
            fundoMd.style.backgroundColor = 'black';
            icon.classList.replace('ri-moon-line', 'ri-sun-fill');
            icon.style.color = 'white';
        } else {
            fundoMd.style.backgroundColor = '#eeeeee';
            icon.classList.replace('ri-sun-fill', 'ri-moon-line');
            icon.style.color = 'black';
        }
    });
});
