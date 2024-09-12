//Menu hambúrguer //
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click",   
 mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");   

}

// Close the menu when clicking outside or on specific links
document.addEventListener("click", (event) => {
  // Check if click is outside the hamburger or menu area
  if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    return; // Early exit if clicked outside
  }

  // Close menu when clicking on "NOTÍCIAS" or "REDES SOCIAIS" links
  const clickedLink = event.target.closest(".nav-link"); // Get closest ancestor with class "nav-link"
  if (clickedLink && (clickedLink.textContent === "NOTÍCIAS" || clickedLink.textContent === "REDES SOCIAIS")) {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }
});
