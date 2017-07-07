var userData = {
  labels: ['7/5', '7/6','7/7','7/8','7/9','7/10','7/11', '7/12','7/13','7/14','7/15','7/16'],
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
  $('i').click(function() {
    var num = this.className;
    console.log(num);
    var newNum = [];
    for (let i = 0; i < num.length; i++) {
      if(parseInt(num[i]) || parseInt(num[i]) === 0) {
        newNum += num[i];
      }
    }
    console.log(newNum);
    $(`.details-${newNum}`).slideToggle(300);
  });
});
