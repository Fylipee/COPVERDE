//Menu hambúrguer //
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");

    navMenu.style.position = "fixed";
}

// Fechar o menu //
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

/* window.onclick = closeMenu(event) {
     if (event.target == navLink) {
         navMenu.style.display = "none";
     }
 }*/