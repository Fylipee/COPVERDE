//Menu hambúrguer //
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click",   
 mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");   

}

// Evento de fechar o hamburguer
document.addEventListener("click", (event) => {
  // checa se ele está clicando no menu ainda.
  if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    return; //se clicou fora irá fechar.
  }

  // se clicar em noticias ou rede socias o menu irá fechar.
  const clickedLink = event.target.closest(".nav-link"); // Get closest ancestor with class "nav-link"
  if (clickedLink && (clickedLink.textContent === "NOTÍCIAS" || clickedLink.textContent === "REDES SOCIAIS")) {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }
});
