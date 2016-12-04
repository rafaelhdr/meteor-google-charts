if (Meteor.isClient) {

  // Keep charts in a queue, waiting google charts API is ready

  // Empty queue
  var googleChartsQueue = []

  // Initial drawChart (add to queue)
  drawChart = function(chart) {
    googleChartsQueue.push(chart)
  }

  // Packages

  // Packages load. By default, load ['corechart', 'timeline', 'gauge']
  // Define packages (as described in documentation) for different packages
  var settings = Meteor.settings.public['rafaelhdr-google-charts']
  var packages
  if (typeof settings == 'undefined' || settings.packages == "undefined") {
    packages = ['corechart', 'timeline', 'gauge']
  }
  else {
    packages = settings.packages
  }

  // Google charts

  // Load external script

  var loadScript = function (url, callback){
    // Source: https://www.nczonline.net/blog/2009/07/28/the-best-way-to-load-external-javascript/

    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function(){
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  }

  // Load google charts

  loadScript('https://www.gstatic.com/charts/loader.js', function(){
    google.charts.load('current', {'packages': packages});
    google.charts.setOnLoadCallback(function(){

      // Redefine drawChart
      drawChart = function (chart) {

        var data

        // Columns and rows based charts
        if (typeof chart.columns != 'undefined' && typeof chart.rows != 'undefined')
        {
          window.g = google
          data = new google.visualization.DataTable();

          _.each(chart.columns, function (column) {
            data.addColumn(column[0], column[1]);
          });
          data.addRows(chart.rows);
        }

        else {
          data = google.visualization.arrayToDataTable(chart.data)
        }

        var options = chart.options;

        var renderedChart = new google.visualization[chart.type](document.getElementById(chart.target));
        renderedChart.draw(data, options);

        return renderedChart;
      }

      // Run queued charts
      googleChartsQueue.forEach(function(chart) {
        drawChart(chart)
      })
    })
  });

}
