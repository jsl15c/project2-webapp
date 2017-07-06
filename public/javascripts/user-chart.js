var userData = {
  labels: ["January", "February", "March", "April",
  "May", "June", "July","August",
  "November", "December"],
  datasets: [
      {
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: userScores
      }
  ],
  options: {
      responsive: true,
      title:{
          display:true,
          text:'Chart.js Line Chart'
      },
      tooltips: {
          mode: 'index',
          intersect: false,
      },
      hover: {
          mode: 'nearest',
          intersect: true
      },
      scales: {
          xAxes: [{
              display: true,
              scaleLabel: {
                  display: true,
                  labelString: 'Month'
              }
          }],
          yAxes: [{
              display: true,
              scaleLabel: {
                  display: true,
                  labelString: 'Value'
              }
          }]
      }
  }
};

var canvas = document.getElementById("userChart");
var ctx = new Chart(document.getElementById("userChart").getContext("2d")).Line(userData);

canvas.onclick = function (evt) {
    var points = ctx.getPointsAtEvent(evt);
    var index = ctx.datasets[0].points.indexOf(points[0]);
    ctx.removeData(index);
};

$(document).ready(function() {
  $('.expand').click(function() {
    $('.details').slideToggle(300);
  });
});
