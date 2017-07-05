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
          data:currentUser.data.score
      }
  ]
};

var ctx = new Chart(document.getElementById("userChart").getContext("2d")).Line(userData);
