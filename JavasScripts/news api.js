const API_KEY = "fac887160d7fdceea35ae023029c348c"; //* Chave Projeto
const API_KEY2 ="7e806a0d5f1aa9306dd4ea22b741923e"; //* Chave Fylipe
const API_KEY3 ="7afb3a834857e3d31a8a2f33cfe48d9c"; //* Chave "Bruno"
const url = 'https://gnews.io/api/v4/search?q=Compostagem&lang=pt&country=br&max=10&apikey=';
    

var req = new Request(url+API_KEY3);
async function getData() {
    try {
        const response = await fetch(req);
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
        title.textContent = item.title + '!';
        title.classList.add('card_title');
        cardContent.appendChild(title);

        // Criação da descrição
        const description = document.createElement('p');
        description.textContent = item.description + '.';
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
        
        })
    }
    catch (error) {
        console.error(error.message);
        if (error.message == "Response status: 403"){
            req = new Request(url+API_KEY2);
            getData()
        }
        else if (error.message == "Reponse status: 403"){
            req = new Request(url+API_KEY3);
            getData()
        }
        else if (error.message == "response status: 403"){
            console.log("precisa de mais uma chave")
        }
    }
}
getData()

// Esconder o Tradutor (sobreposição no footer! no modo mobile)
const footer = document.querySelector('footer')
const esconder = document.getElementById('tradutor')

window.addEventListener('scroll', () => {
    const posfooter = footer.getBoundingClientRect();
    if (posfooter.top <= window.innerHeight && posfooter.top >= 0) {
        esconder.style.display = 'none'; 
    } else {
        esconder.style.display = 'block'; 
    }
});

//Indicador que tem um tradutor
const seta = document.getElementById('animação');

setTimeout(()=> {
    seta.classList.add('sumir');
}, 5000)
