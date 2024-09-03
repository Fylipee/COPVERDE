const API_KEY = "7b4cd4463df74df39f67998c96a9611b";
const url = 'https://newsapi.org/v2/everything?' +
    'q=Compostagem&' +
    'pageSize=20&' +
    'sortBy=popularity&' +
    'apiKey=' + API_KEY;
    
var req = new Request(url);
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
                        img.innerHTML = item.urlToImage;
                        img.classList.add('card_image');
                        
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
                            
                            //? Botão HTML */
                            const url = document.createElement("button");
                            url.innerHTML = item.url;
                            url.classList.add('btn');
                            art.appendChild(url);
                            
                                   
                    //console.log(Cards);
    
                    Cards.appendChild(art);

                   /* <ul id="container" class="cards">
                    <li class="cards_item">
                        <div class="card">
                            <div class="card_image"><img src="#"></div>
                            <div class="card_content">
                                <h2 class="card_title">Titulo</h2>
                                <p class="card_text">Descrição</p>
                                <button class="btn">leia mais</button>
                            </div>
                        </div>
                    </li>*/
            
            });
    
        } catch (error) {
            console.error(error.message);
        }
    }
    
    getData()