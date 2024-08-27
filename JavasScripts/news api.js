const API_KEY = "7b4cd4463df74df39f67998c96a9611b";
const url = 'https://newsapi.org/v2/everything?' +
    'q=Compostagem&' +
    'pageSize=20&' +
    'sortBy=popularity&' +
    'apiKey=' + API_KEY;
    
var req = new Request(url);
    console.log(url)