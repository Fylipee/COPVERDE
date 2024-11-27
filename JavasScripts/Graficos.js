import {getData} from "./Clima.js"; 

getData().then(
  clima => {
    const umidade = clima.current.humidity


var data = [
  {
    type: "indicator",
    mode: "gauge+number+delta",
    value: umidade,
    title: { text: "Umidade %", font: { size: 24 } },
    delta: { reference: 55, increasing: { color: "RebeccaPurple" } },
    gauge: {
      axis: { range: [null, 100], tickwidth: 1, tickcolor: "darkblue" },
      bar: { color: "purple" },
      bgcolor: "white",
      borderwidth: 2,
      bordercolor: "gray",
      steps: [
        { range: [0, 40], color: `#EDD188` },
        { range: [40, 50], color: "#A2CA71" },
        { range: [50, 60], color: "#387F39" },
        { range: [60,65], color: "red" },
        { range: [65, 100], color: "black" }
      ],
      threshold: {
        line: { color: "darkgreen", width: 4 },
        thickness: 0.75,
        value: 55
      }
    }
  }
]


var layout = {
  width: 500,
  height: 400,
  margin: { t: 25, r: 25, l: 25, b: 25 },
  font: { color: "darkblue", family: "Arial" }
};

Plotly.newPlot('myDiv', data, layout);

});
