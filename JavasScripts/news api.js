const API_KEY = "fac887160d7fdceea35ae023029c348c" ; // Chave 1;
const API_KEY2 = "7e806a0d5f1aa9306dd4ea22b741923e"; // Chave 2;
const API_KEY3 = "7afb3a834857e3d31a8a2f33cfe48d9c"; // Chave 3;
const API_KEY4 = "5d67c65eab96a678f0d648136f613966"; // Chave 4;
const API_KEY5 = "05d5bff0264675462b8f08b43d6e8ec6"; // Chave 5;
const API_KEY6 = "07bc4af133a5c0f3de0e1642cc3259f2"; // Chave 6;

const url1 = 'https://gnews.io/api/v4/search?q=Compostagem&lang=pt&country=br&max=9&apikey=';
const url2 = 'https://gnews.io/api/v4/search?q=Sustentabilidade&lang=pt&country=br&max=9&apikey=';
const url3 = 'https://gnews.io/api/v4/search?q=Energias&lang=pt&country=br&max=9&apikey=';
const url4 = 'https://gnews.io/api/v4/search?q=Biodiversidade&lang=pt&country=br&max=9&apikey=';

let currentUrl = url1;  // Define a URL inicial (Compostagem)

let attempts = 0; // Contador de tentativas

// Função para obter as notícias
async function getData() {
    try {
        const apiKeyToUse = pegachave(); // Pega a chave da API a ser usada;
        const req = new Request(currentUrl + apiKeyToUse);
        
        const response = await fetch(req);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        const Cards = document.getElementById("container");
        Cards.classList.add('cards');
        Cards.innerHTML = ''; // Limpa os cards antigos antes de carregar novos

        json.articles.forEach(item => {
            // Criação do elemento <a> para o card;
            const cardLink = document.createElement('a');
            cardLink.href = item.url; 
            cardLink.target = "_blank"; 
            cardLink.classList.add('cards_item'); 

            // Criação do conteúdo do card;
            const cardContent = document.createElement('div');
            cardContent.classList.add('card_content');

            // Criação do título;
            const title = document.createElement("h2");
            title.textContent = item.title + '!';
            title.classList.add('card_title');
            cardContent.appendChild(title);

            // Criação da descrição;
            const description = document.createElement('p');
            description.textContent = item.description + '.';
            description.classList.add('card_text');
            cardContent.appendChild(description);

            // Adiciona o conteúdo ao link;
            cardLink.appendChild(cardContent);

            // Criação da imagem;
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.title;
            img.classList.add('card_image');
            img.loading = 'lazy';

            cardLink.appendChild(img);
            Cards.appendChild(cardLink);

            img.onerror = () => {
                cardLink.classList.add('hidden');
                setTimeout(() => {
                    cardLink.remove();
                }, 300); 
            };
        });
    } catch (error) {
        console.error(error.message);
        if (error.message.includes("403")) {
            attempts++; // Incrementa o contador de tentativas;
            if (attempts < 6) {
                console.log(`Tentativa ${attempts}: Trocando pra outra chave`) //monitoramento das chaves;
                getData(); // Tenta novamente com uma chave diferente;
            } else {
                alert("Todas as chaves de API falharam. Por favor, verifique as chaves.");
            }
        } else {
            console.error("Erro desconhecido:", error);
        }
    }
}

// Função para pegar a chave da API
function pegachave() {
    if (attempts === 0) return API_KEY;
    if (attempts === 1) return API_KEY2;
    if (attempts === 2) return API_KEY3;
    if (attempts === 3) return API_KEY4;
    if (attempts === 4) return API_KEY5;
    return API_KEY6;
}

// Evento de clique para o botão do dropdown
const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownContent = document.querySelector('.dropdown-content');


dropdownBtn.addEventListener('click', (event) => {
    event.stopPropagation();

    if (dropdownContent.style.display === 'block') {
        dropdownContent.style.display = 'none'; 
    } else {
        dropdownContent.style.display = 'block';
    }
});

// Evento de clique para os itens do dropdown
const dropdownLinks = document.querySelectorAll('.dropdown-content a');

dropdownLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const selectedText = link.textContent;

        // Define a URL de acordo com a opção selecionada
        switch (selectedText) {
            case 'Compostagem':
                currentUrl = url1;
                break;
            case 'Sustentabilidade':
                currentUrl = url2;
                break;
            case 'Energias':
                currentUrl = url3;
                break;
            case 'Biodiversidade':
                currentUrl = url4;
                break;
            default:
                currentUrl = url1;
        }

        getData();

        dropdownContent.style.display = 'none';
    });
});

document.addEventListener('click', (event) => {
    if (!dropdownBtn.contains(event.target) && !dropdownContent.contains(event.target)) {
        dropdownContent.style.display = 'none'; 
    }
});

getData();


const dropdownBtnp = document.querySelector('.dropdown-btn');
const icon = dropdownBtnp.querySelector('i');

dropdownBtnp.addEventListener('mouseenter', () => {
  icon.classList.remove('ri-arrow-down-s-line');
  icon.classList.add('ri-arrow-up-s-line');
});

dropdownBtnp.addEventListener('mouseleave', () => {
  icon.classList.remove('ri-arrow-up-s-line');
  icon.classList.add('ri-arrow-down-s-line');
});