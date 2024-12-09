document.addEventListener('DOMContentLoaded', () => {
const buttton = document.getElementById("tema_site");
const body = document.body;
const fundomd = document.getElementById("modal-content")

buttton.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
    if (body.classList.contains("dark-mode")) {
        fundomd.style.backgroundColor = 'black'
        body.style.transition ="background-color 1.5s, color 1.5s"
        fundomd.style.transition ="background-color 1.5s, color 1.5s"
        buttton.textContent = "Alternar para Modo Claro"; //trocar pra icon
    } else {
        buttton.textContent = "Alternar para Modo Escuro";
        fundomd.style.backgroundColor = '#eeeeee'
        body.style.transition ="background-color 1.5s, color 1.5s"
        fundomd.style.transition ="background-color 1.5s, color 1.5s"
    }
 })
});