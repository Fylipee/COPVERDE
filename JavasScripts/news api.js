const API_KEY = "fac887160d7fdceea35ae023029c348c"; //* Chave 1;
const API_KEY2 = "7e806a0d5f1aa9306dd4ea22b741923e"; //* Chave 2;
const API_KEY3 = "7afb3a834857e3d31a8a2f33cfe48d9c"; //* Chave 3;
const API_KEY4 = "5d67c65eab96a678f0d648136f613966"; //* Chave 4;
const API_KEY5 = "05d5bff0264675462b8f08b43d6e8ec6"; //* Chave 5;
const API_KEY6 = "07bc4af133a5c0f3de0e1642cc3259f2"; //* Chave 6;

//adicionar um timer de troca ou criar um novo html com as noticias...
const url = 'https://gnews.io/api/v4/search?q=Compostagem&lang=pt&country=br&max=9&apikey=';
const url2 = 'https://gnews.io/api/v4/search?q=Sustentabilidade&lang=pt&country=br&max=9&apikey=';
const url3 = 'https://gnews.io/api/v4/search?q=Energias&lang=pt&country=br&max=9&apikey=';
const url4 = 'https://gnews.io/api/v4/search?q=Biodiversidade&lang=pt&country=br&max=9&apikey=';


let attempts = 0; // Contador de tentativas;

async function getData() {
    try {
        const apiKeyToUse = pegachave(); // Pega a chave da API a ser usada;
        const req = new Request(url + apiKeyToUse);
        
        const response = await fetch(req);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        const Cards = document.getElementById("container");
        Cards.classList.add('cards');

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
            img.dataset.src = item.image;  
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

            // Adicionando a animação ao card
            setTimeout(() => {
                cardLink.classList.add('show');
            }, 50); 

            
            const loadImageWhenVisible = () => {
                if (isElementInViewport(cardLink)) {
                    img.src = img.dataset.src; 
                    window.removeEventListener('scroll', loadImageWhenVisible);  
                }
            };

            window.addEventListener('scroll', loadImageWhenVisible); 
            loadImageWhenVisible();
        });
    } catch (error) {
        console.error(error.message);
        if (error.message.includes("403")) {
            attempts++; // Incrementa o contador de tentativas;
            if (attempts < 6) {
                console.log(`Tentativa ${attempts}: Trocando pra outra chave`)
                getData();
            } else {
                alert("Todas as chaves de API falharam. Por favor, verifique as chaves.");
            }
        } else {
            console.error("Erro desconhecido:", error);
        }
    }
}

// Função para verificar se um elemento está visível na tela
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function pegachave() {
    if (attempts === 0) return API_KEY;
    if (attempts === 1) return API_KEY2;
    if (attempts === 2) return API_KEY3;
    if (attempts === 3) return API_KEY4;
    if (attempts === 4) return API_KEY5;
    return API_KEY6;
}

getData();