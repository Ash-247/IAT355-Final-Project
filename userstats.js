

var members=0;
var passholders=0;

var totalriders;
var totalselectedriders;
var totalunselectedriders;
var barchartsize = 300;

var selectedMembers=0;
var selectedPassholders=0;
var averageSelectedTime=0;
var averageUnselectedTime=0;

var unselectedMembers;
var unselectedPassholders;
var rider=[];

// function updateMap(p) { //'p' for points (on scatterplot)
//
//     for (i=0; i < p.length; i++) {
//
//         if(p[i].usertype == "Member"){
//           selectedMembers++;
//         }else{
//           selectedPassholders++;
//         }
//             var avgTripLengthseconds = d3.mean(data, function(d){return +p[i].tripduration});
//             averageSelectedTime = (f(avgTripLengthseconds/60));
//
//
//     }
//
//
// }

        d3.csv("data/Combined2.csv", function(data) {


                data.forEach(function (d,i) {
                  if(i<5000){

                  rider =[];
                if(d.usertype == "Member"){
                  members++;
                }else{
                  passholders++;
                }
                rider.push(d);
              }


              })







                // var trips = g.selectAll("line")
                //     .data(data)
                //     .enter()
                //     .append("line")
                //     .style("stroke", "black")
                //     .style("stroke-width","1")
                //     .style("stroke-opacity", .01);











            //     function update(){
            //
            //
            //                                       console.log("Members Trips "+members);
            //                                       console.log("day/week pass Trips " +passholders);
            //                                       console.log("Female Riders "+female);
            //                                       console.log("Male Riders "+male);
            //                                       console.log("Non-Binary Riders "+other);
            //
            //
            //     }// update
            //
            //
            //
            // // mymap.on("viewreset", update);
            // // mymap.on("zoomend", update);
            //     update();
                var f = d3.format(".1f");
                var avgTripLengthseconds = d3.mean(data, function(d){return +d.tripduration});
                var avgTripLength = (f(avgTripLengthseconds/60));
                console.log(f(avgTripLength/60)+" minutes");
                totalriders = members + passholders;



                d3.select("body")
                  .append("svg")
                  .attr("id","stats")
                  .attr("width",barchartsize*2)
                  .attr("height",100)
                  .append("text")
                  .attr("x",0)
                  .attr("y",15)
                  .text("Total Number of Rides: "+totalriders)
                  .attr("font-family", "-apple-system,sans-serif")
                  .attr("font-weight","600")
                  .attr("font-size", "18px")
                  .attr("fill","black");


                  d3.select("#stats")
                  .append("rect")
                  .attr("x",0)
                  .attr("y",20)
                  .attr("width",(members/totalriders)*barchartsize)
                  .attr("height",40)
                  .style("fill","#009892");

                  d3.select("#stats")
                  .append("text")
                  .attr("x",5)
                  .attr("y",35)
                  .text("Members:")
                  .attr("font-family", "-apple-system,sans-serif")
                  .attr("font-size", "13px")
                  .attr("fill","white")
                  .append("tspan")
                  .attr("x",5)
                  .attr("y",55)
                  .text(members);


                  d3.select("#stats")
                  .append("rect")
                  .attr("x",(members/totalriders)*barchartsize)
                  .attr("y",20)
                  .attr("width",(passholders/totalriders)*barchartsize)
                  .attr("height",40)
                  .style("fill","#87bd6a");

                  d3.select("#stats")
                  .append("text")
                  .attr("x",(members/totalriders)*barchartsize+5)
                  .attr("y",35)
                  .text("Pass user:")
                  .attr("font-family", "-apple-system,sans-serif")
                  .attr("font-size", "13px")
                  .attr("fill","white")
                  .append("tspan")
                  .attr("x",(members/totalriders)*barchartsize+5)
                  .attr("y",55)
                  .text(passholders);

                  d3.select("#stats")
                  .append("text")
                  .attr("x",barchartsize+20)
                  .attr("y",15)
                  .text("Average Length Of Trips:")
                  .attr("font-family", "-apple-system,sans-serif")
                  .attr("font-weight","600")
                  .attr("font-size", "18px")
                  .attr("fill","black")
                  .append("tspan")
                  .attr("x",barchartsize+20)
                  .attr("y",55)
                  .text(avgTripLength+" minutes");









                // tooltipHtml();
              });


              function drawSelectedBarChart(){
              d3.select("#statsSelected").remove();
              d3.select("body")
                .append("svg")
                .attr("id","statsSelected")
                .attr("width",barchartsize*2)
                .attr("height",100)
              d3.select("#statsSelected")
                .append("text")
                .attr("x",0)
                .attr("y",15)
                .text("Total Number of Selected Rides: "+totalselectedriders)
                .attr("font-family", "-apple-system,sans-serif")
                .attr("font-weight","600")
                .attr("font-size", "18px")
                .attr("fill","black");


                d3.select("#statsSelected")
                .append("rect")
                .attr("x",0)
                .attr("y",20)
                .attr("width",(selectedMembers/totalselectedriders)*barchartsize)
                .attr("height",40)
                .style("fill","#009892");

                d3.select("#statsSelected")
                .append("text")
                .attr("x",5)
                .attr("y",35)
                .style("text-shadow","1px 1px 2px rgba(50,50,50,0.6)")
                .text("Members:")
                .attr("font-family", "-apple-system,sans-serif")
                .attr("font-size", "13px")
                .attr("fill","white")
                .append("tspan")
                .attr("x",5)
                .attr("y",55)
                .text(selectedMembers);


                d3.select("#statsSelected")
                .append("rect")
                .attr("x",(selectedMembers/totalselectedriders)*barchartsize)
                .attr("y",20)
                .attr("width",(selectedPassholders/totalselectedriders)*barchartsize)
                .attr("height",40)
                .style("fill","#87bd6a");

                d3.select("#statsSelected")
                .append("text")
                .attr("x",(selectedMembers/totalselectedriders)*barchartsize+5)
                .attr("y",35)
                .text("Pass user:")
                .attr("font-family", "-apple-system,sans-serif")
                .attr("font-size", "13px")
                .attr("fill","white")
                .style("text-shadow","1px 1px 2px rgba(50,50,50,0.6)")
                .append("tspan")
                .attr("x",(selectedMembers/totalselectedriders)*barchartsize+5)
                .attr("y",55)
                .text(selectedPassholders);
              }

              function drawUNSelectedBarChart(){
              d3.select("#statusUnselected").remove();
              d3.select("body")
                .append("svg")
                .attr("id","statusUnselected")
                .attr("width",barchartsize*2)
                .attr("height",100)
              d3.select("#statusUnselected")
                .append("text")
                .attr("x",0)
                .attr("y",15)
                .text("Total Number of Rides Not Selected: "+totalunselectedriders)
                .attr("font-family", "-apple-system,sans-serif")
                .attr("font-weight","600")
                .attr("font-size", "18px")
                .attr("fill","black");


                d3.select("#statusUnselected")
                .append("rect")
                .attr("x",0)
                .attr("y",20)
                .attr("width",(unselectedMembers/totalunselectedriders)*barchartsize)
                .attr("height",40)
                .style("fill","#009892");

                d3.select("#statusUnselected")
                .append("text")
                .attr("x",5)
                .attr("y",35)
                .style("text-shadow","1px 1px 2px rgba(50,50,50,0.6)")
                .text("Members:")
                .attr("font-family", "-apple-system,sans-serif")
                .attr("font-size", "13px")
                .attr("fill","white")
                .append("tspan")
                .attr("x",5)
                .attr("y",55)
                .text(unselectedMembers);


                d3.select("#statusUnselected")
                .append("rect")
                .attr("x",(unselectedMembers/totalunselectedriders)*barchartsize)
                .attr("y",20)
                .attr("width",(unselectedPassholders/totalunselectedriders)*barchartsize)
                .attr("height",40)
                .style("fill","#87bd6a");

                d3.select("#statusUnselected")
                .append("text")
                .attr("x",(unselectedMembers/totalunselectedriders)*barchartsize+5)
                .attr("y",35)
                .text("Pass user:")
                .attr("font-family", "-apple-system,sans-serif")
                .attr("font-size", "13px")
                .attr("fill","white")
                .style("text-shadow","1px 1px 2px rgba(50,50,50,0.6)")
                .append("tspan")
                .attr("x",(unselectedMembers/totalunselectedriders)*barchartsize+5)
                .attr("y",55)
                .text(unselectedPassholders);
              }
