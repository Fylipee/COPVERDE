const API_KEY = "7b4cd4463df74df39f67998c96a9611b";
const url = 'https://newsapi.org/v2/everything?' +
    'q=Compostagem&' +
    'pageSize=20&' +
    'sortBy=popularity&' +
    'apiKey=' + API_KEY;
    
var req = new Request(url);
    console.log(url)

    // async function getData() {
    //     try {
    //         const response = await fetch(url);
    //         if (!response.ok) {
    //             throw new Error(`Response status: ${response.status}`);
    //         }
    //         const json = await response.json();
    //         console.log(json);
    
    
    //         const Cards = document.getElementById("cards_item")
    //         console.log(json.articles)

    //         json.articles.forEach(item => {
    //                 const art = document.createElement("card_item");
    
    //                 const img = document.createElement("card_image");
    //                 img.innerHTML = item.urlToImage;
    //                 art.appendChild(img);
    
    //                 const description = document.createElement("card_text");
    //                 description.innerHTML = item.description;
    //                 art.appendChild(description);
    
    //                 const name = document.createElement("card_title");
    //                 name.innerHTML = item.name;
    //                 art.appendChild(name);
    
    //                 const url = document.createElement("bnt");
    //                 url.innerHTML = item.url;
    //                 art.appendChild(url);
    
    //             console.log(art)
    
    //         Cards.appendChild(art)
    //         });
    
    //     } catch (error) {
    //         console.error(error.message);
    //     }
    // }
    
    // getData()