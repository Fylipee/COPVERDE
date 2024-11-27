const url = "https://api.weatherapi.com/v1/current.json?key=44662d83639b40f5960120028240411&q=Belem&aqi=no"

var req = new Request(url);
export async function getData() {
    try {
        const response = await fetch(req);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json(); 
        console.log(json)    
        return json
    }

    catch (error) {
        console.error(error.message);
    }   
}