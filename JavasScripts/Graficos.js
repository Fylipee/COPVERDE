import {getData} from "./Clima.js"; 

getData().then(
  clima => {
    const umidade = clima.current.humidity
    const temp = clima.current.temp_c


var data = [
  {
    type: "indicator",
    mode: "gauge+number+delta",
    value: umidade,
    title: { text: "Umidade %", font: { size: 24 } },
    delta: { reference: 55, increasing: { color: "#387F39" } },
    gauge: {
      axis: { range: [null, 99], tickwidth: 1, tickcolor: "darkblue" },
      bar: { color: "darkgreen" }, 
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
        line: { color: "gray", width: 4 },
        thickness: 0.75,
        value: 55
      }
    }
  }
]


var layout = {
  margin: { t: 25, r: 25, l: 25, b: 25 },
  font: { color: "#387F39"},
  paper_bgcolor: 'rgba(0, 0, 0, 0)',
  plot_bgcolor: 'rgba(0, 0, 0, 0)'
};

Plotly.newPlot('umida', data, layout);

var data = [
  {
    type: "indicator",
    mode: "gauge+number+delta",
    value: temp,
    title: { text: "Temperatura", font: { size: 24 } },
    delta: { reference: 50, increasing: { color: "RebeccaPurple" } },
    gauge: {
      axis: { range: [null, 80], tickwidth: 1, tickcolor: "darkblue" },
      bar: { color: "darkgreen" },
      paper_bgcolor: '#eeeeee', 
      plot_bgcolor: '#eeeeee',
      borderwidth: 2,
      bordercolor: "gray",
      steps: [
        { range: [0, 40], color: `#EDD188` },
        { range: [40, 60], color: "#A2CA71" },
        { range: [55, 65], color: "#387F39" },
        { range: [60, 65], color: "red" },
        { range: [65, 80], color: "black" }
      ],
    }
  }
]


var layout = {
  margin: { t: 25, r: 25, l: 25, b: 25 },
  font: { color: "#387F39"},
  paper_bgcolor: 'rgba(0, 0, 0, 0)',
  plot_bgcolor: 'rgba(0, 0, 0, 0)'
};

Plotly.newPlot('temp', data, layout);

});
