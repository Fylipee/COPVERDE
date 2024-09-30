const API_KEY = "fac887160d7fdceea35ae023029c348c"; //* Chave Projeto
const API_KEY2 ="7e806a0d5f1aa9306dd4ea22b741923e"; //* Chave Fylipe
const API_KEY3 ="7afb3a834857e3d31a8a2f33cfe48d9c"; //* Chave "Bruno"
const url = 'https://gnews.io/api/v4/search?q=Compostagem&lang=pt&country=br&max=10&apikey=';
    

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

        //? UL HTML */
        const Cards = document.getElementById("container")
        Cards.classList.add('cards');
        //console.log(json.articles)

        json.articles.forEach(item => {

            //? LI HTML */
            const art = document.createElement('li');
            art.classList.add('cards_item');

            const card = document.createElement('div')
            card.classList.add('card')

            //? Img HTML */
            const img = document.createElement('img');
            img.innerHTML = item.image;
            img.classList.add('card_image');
            img.src = item.image;
            img.alt = item.title;
            art.appendChild(img);

            //? Title HTML */
            const title = document.createElement("h2");
            title.innerHTML = item.title;
            title.classList.add('card_title');
            art.appendChild(title);


            //? Descrição HTML */
            const description = document.createElement('p');
            description.innerHTML = item.description;
            description.classList.add('card_text');
            art.appendChild(description);


            // A > button ( criação )
            const link = document.createElement('a');
            link.href = item.url;
            link.textContent = "Clique aqui pra ler mais"; // Mensagem que vai aparecer
            link.target = "_blank"; // cria uma nova pagina com o link.
            link.classList.add('bttn');
            art.appendChild(link);

            
            Cards.appendChild(art);


        });

    } catch (error) {
       console.error(error.message);
       if (error.message == "Response status: 403"){
        req = new Request(url+API_KEY2)
        getData()
       }
       else if (error.message == "Response status: 403"){
        req = new Request(url+API_KEY3);
       }
       else if (error.message == "Response status: 403"){
        console.log("precisa de mais uma chave")
       }
    }
}

//getData()

 