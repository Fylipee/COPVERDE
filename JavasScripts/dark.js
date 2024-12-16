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

//animações index remover - - - - 
if (window.location.pathname === '/index.html') {
    window.onload = function() {
        setTimeout(function() {
            document.querySelector('.loading').style.display = 'none';
        }, 1000);
    }
};

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