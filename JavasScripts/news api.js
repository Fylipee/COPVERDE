const API_KEY = "fac887160d7fdceea35ae023029c348c"; //* Chave Projeto
const API_KEY2 ="7e806a0d5f1aa9306dd4ea22b741923e"; //* Chave Fylipe
const API_KEY3 ="7afb3a834857e3d31a8a2f33cfe48d9c"; //* Chave "Bruno"
const url = 'https://gnews.io/api/v4/search?q=Compostagem&lang=pt&country=br&max=10&apikey=fac887160d7fdceea35ae023029c348c';
    

var req = new Request(url+API_KEY);
console.log(url)

async function getData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        //console.log(json);

        const Cards = document.getElementById("container");
        Cards.classList.add('cards');
        json.articles.forEach(item => {

        // Criação do elemento <a> para o card
        const cardLink = document.createElement('a');
        cardLink.href = item.url; 
        cardLink.target = "_blank"; 
        cardLink.classList.add('cards_item'); 

        // Criação do conteúdo do card
        const cardContent = document.createElement('div');
        cardContent.classList.add('card_content');

        // Criação do título
        const title = document.createElement("h2");
        title.textContent = item.title;
        title.classList.add('card_title');
        cardContent.appendChild(title);

        // Criação da descrição
        const description = document.createElement('p');
        description.textContent = item.description;
        description.classList.add('card_text');
        cardContent.appendChild(description);

        // Adiciona o conteúdo ao link
        cardLink.appendChild(cardContent);

        // Criação da imagem
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.title;
        img.classList.add('card_image');

        cardLink.appendChild(img);
        Cards.appendChild(cardLink);

        img.onerror = () => {
            cardLink.classList.add('hidden');
            setTimeout(() => {
              cardLink.remove();
            }, 300); 
          }
        
});
    } catch (error) {
        console.error(error.message);
        if (error.message == "Response status: 403") {
            // Tenta a segunda chave
            req = new Request(url + API_KEY2);
            getData(); // Chama novamente
        } else if (error.message == "Response status: 403" && req.url !== (url + API_KEY2)) {
            // Tenta a terceira chave
            req = new Request(url + API_KEY3);
            getData(); // Chama novamente
        } else {
            console.log("Precisa de mais uma chave");
        }
    }
}

getData();



 