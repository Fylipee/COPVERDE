import { getData } from "./Clima.js";

const TEMPERATURA_MAXIMA = 65; // Máxima temperatura em °C
const TEMPERATURA_MINIMA = 45; // Mínima temperatura em °C
const UMIDADE_MINIMA = 40;    // Mínima umidade em %

document.addEventListener("DOMContentLoaded", () => {
    getData().then(clima => {
        if (clima) {
            const temperatura = clima.current.temp_c;
            const umidade = clima.current.humidity;

            criarGraficoUmidade(umidade)
                .then(() => criarGraficoTemperatura(temperatura))
                .then(() => {
                    setTimeout(() => {
                        verificarLimites(temperatura, umidade);
                    }, 2000);
                })
                .catch(error => {
                    console.error("Erro ao renderizar os gráficos:", error);
                });
        } else {
            console.error("Erro ao obter os dados climáticos.");
        }
    }).catch(error => {
        console.error("Erro ao processar os dados:", error);
    });
});

// Função para verificar os limites de temperatura e umidade
function verificarLimites(temperatura, umidade) {
  const mensagensDiv = document.getElementById('mensagens');
  mensagensDiv.innerHTML = '';

  // Mensagens de temperatura
  if (temperatura > TEMPERATURA_MAXIMA) {
      const mensagemTempAlta = document.createElement('p');
      mensagemTempAlta.textContent = 'Temperatura muito alta! Considere virar a pilha de compostagem.';
      mensagemTempAlta.style.color = 'red';
      mensagensDiv.appendChild(mensagemTempAlta);
  } else if (temperatura < TEMPERATURA_MINIMA) {
      const mensagemTempBaixa = document.createElement('p');
      mensagemTempBaixa.textContent = 'Temperatura muito baixa! Adicione mais material orgânico.';
      mensagemTempBaixa.style.color = 'blue';
      mensagensDiv.appendChild(mensagemTempBaixa);
  }

  // Mensagem de umidade
  if (umidade < UMIDADE_MINIMA) {
      const mensagemUmidadeBaixa = document.createElement('p');
      mensagemUmidadeBaixa.textContent = 'Umidade muito baixa! Adicione mais água ou material úmido.';
      mensagemUmidadeBaixa.style.color = 'orange';
      mensagensDiv.appendChild(mensagemUmidadeBaixa);
  }
}

// Função para criar gráfico de umidade
function criarGraficoUmidade(umidade) {
    return new Promise((resolve, reject) => {
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
                    borderwidth: 2,
                    bordercolor: "gray",
                    steps: [
                        { range: [0, 40], color: `#EDD188` },
                        { range: [40, 50], color: "#A2CA71" },
                        { range: [50, 60], color: "#387F39" },
                        { range: [60, 65], color: "red" },
                        { range: [65, 100], color: "black" }
                    ],
                    threshold: {
                        line: { color: "darkgreen", width: 4 },
                        thickness: 0.75,
                        value: 55
                    }
                }
            }
        ];

        var layout = {
            margin: { t: 25, r: 25, l: 25, b: 25 },
            font: { color: "darkblue", family: "Arial" },
            paper_bgcolor: 'rgba(0, 0, 0, 0)',
            plot_bgcolor: 'rgba(0, 0, 0, 0)'
        };

        Plotly.newPlot('umida', data, layout)
            .then(resolve)
            .catch(reject);
    });
}

// Função para criar gráfico de temperatura
function criarGraficoTemperatura(temp) {
    return new Promise((resolve, reject) => {
        var data = [
            {
                type: "indicator",
                mode: "gauge+number+delta",
                value: temp,
                title: { text: "Temperatura", font: { size: 24 } },
                delta: { reference: 50, increasing: { color: "RebeccaPurple" } },
                gauge: {
                    axis: { range: [null, 80], tickwidth: 1, tickcolor: "darkblue" },
                    bar: { color: "purple" },
                    borderwidth: 2,
                    bordercolor: "gray",
                    steps: [
                        { range: [0, 40], color: `#EDD188` },
                        { range: [40, 60], color: "#A2CA71" },
                        { range: [55, 65], color: "#387F39" },
                        { range: [60, 65], color: "red" },
                        { range: [70, 80], color: "black" }
                    ]
                }
            }
        ];

        var layout = {
            margin: { t: 25, r: 25, l: 25, b: 25 },
            font: { color: "darkblue", family: "Arial" },
            paper_bgcolor: 'rgba(0, 0, 0, 0)',
            plot_bgcolor: 'rgba(0, 0, 0, 0)'
        };

        Plotly.newPlot('temp', data, layout)
            .then(resolve)
            .catch(reject);
    });
}