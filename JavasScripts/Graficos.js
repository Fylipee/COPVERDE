// quickchart-js https://github.com/typpo/quickchart-js
// umidade
const QuickChart = require('quickchart-js');

const chart = new QuickChart();

chart.setWidth(500)
chart.setHeight(300);
chart.setVersion('2.9.4');

chart.setConfig({
  type: 'gauge',
  data: {
    datasets: [
      {
        value: 'humidity',
        data: [40,50,60,65,100],
        backgroundColor: ['#EDD188','#A2CA71', '#387F39', 'red', 'black'],
        borderWidth: 2,
      },
    ],
  },
  options: {
    valueLabel: {
      fontSize: 22,
      backgroundColor: 'transparent',
      color: '#000',
      formatter: function (value, context) {
        return value + ' %';
      },
      bottomMarginPercentage: 10,
    },
  },
});

// Print the chart URL
console.log(chart.getUrl());

// Get the image...
const image = await chart.toBinary();

// Or write it to a file
chart.toFile('chart.png');

// outro grafico

