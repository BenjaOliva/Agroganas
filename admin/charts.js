var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
var yValues = [55, 49, 44, 24, 15];
var barColors = ["red", "green","blue","orange","brown"];

colors=[];

for(let i=0;i<this.yValues.length;i++){
    this.colors.push('#'+Math.floor(Math.random()*16777215).toString(16));
}

var myPieChart = new Chart("myPieChart", {
  type: "doughnut",
  data: {
    datasets: [{
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }]
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
        legend: {
          position: 'bottom',
        }
    },
    tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
      cutoutPercentage: 80,
  }
});

var myPieChart2 = new Chart("myPieChart2", {
    type: "doughnut",
    data: {
      datasets: [{
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      }]
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
          legend: {
            position: 'bottom',
          }
      },
      tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          caretPadding: 10,
        },
        cutoutPercentage: 80,
    }
  });

// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.family = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.font.color = '#858796';
