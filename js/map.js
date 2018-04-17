// create map
// set the map center and zoom level
var mymap = new L.Map("map", {center: [47.6352, -122.3321], zoom: 12});
var stations;

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWVsbWVzZWVyeTEiLCJhIjoiY2pkd2gyb29lMDc3YjJxbW9jOGQ3Y2NxaSJ9.CV6ADpBZ61iTUr5wQq3yeg', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);


// add the svg layer to the map
L.svg().addTo(mymap);

// grap the svg layer using d3
var svg = d3.select("#map").select("svg");
var g = svg.select("g").attr("class", "leaflet-zoom-hide");
var gr = svg.select("gr").attr("class", "leaflet-zoom-hide");

d3.csv("data/station.csv", function(error, data) {
    if (error) throw error;

    // process data .. here ....

    /* Add a LatLng object to each item in the dataset */
    data.forEach(function (d) {
        d.LatLng = new L.LatLng(d.lat, d.long);
        // var bikeCount = d.current_dockcount;
    })

     stations = g.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", function(d){
        return d.current_dockcount*0.15;
        })
        .attr("fill", "#0ef3b2")
        .style("stroke", "black")
        .style("opacity", .6);

   // var label = g.selectAll("text")
   //      .data(data)
   //      .enter()
   //      .append("text")
   //      .attr("class", "label")
   //      // .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
   //      .text(function(d) { if(d.current_dockcount != 0)return d.current_dockcount;} );

    function update() {
        stations.attr("cx",
            function (d) {
                return mymap.latLngToLayerPoint(d.LatLng).x;
            });

        stations.attr("cy",
            function (d) {
                return mymap.latLngToLayerPoint(d.LatLng).y;
            });

            // label.attr("x",
            //     function (d) {
            //         return mymap.latLngToLayerPoint(d.LatLng).x;
            //     });
            //
            // label.attr("y",
            //     function (d) {
            //         return (mymap.latLngToLayerPoint(d.LatLng).y+14);
            //     });
    }

            // mymap.updateMap = function (newData){
            //     update(newData);
            // };

    // update
    mymap.on("viewreset", updateResetMap);
    mymap.on("zoomend", updateResetMap);
    update();
    //tooltipHtml();
});



function updateResetMap(){

  stations.attr("cx",
      function (d) {
          return mymap.latLngToLayerPoint(d.LatLng).x;
      });

  stations.attr("cy",
      function (d) {
          return mymap.latLngToLayerPoint(d.LatLng).y;
      });


      trips.attr("x1", function (d) {
          return mymap.latLngToLayerPoint(d.From_LatLng).x; });
      trips.attr("y1", function (d) {
          return mymap.latLngToLayerPoint(d.From_LatLng).y;
      });

      trips.attr("x2", function (d) {
          return mymap.latLngToLayerPoint(d.To_LatLng).x; });
      trips.attr("y2", function (d) {
          return mymap.latLngToLayerPoint(d.To_LatLng).y;
      });


      if(selectedPoints.length>0){
      for(i = 0;i < selectedPoints.length;i++){


        trips.style("stroke",
        function(d){if(d.starttime.substring(0,10) == selectedPoints[i]){
          return "red";
        }else{
          return "black";}});
        trips.style("stroke-opacity",
        function(d){if(d.starttime.substring(0,10) == selectedPoints[i]){
          return "0.3";
        }else{
          return "0.01";}});
        }
      }else{
          trips.style("stroke","black");
          trips.style("stroke-opacity","0.01");
        }

}
