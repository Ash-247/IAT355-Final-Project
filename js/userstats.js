

var members=0;
var passholders=0;
var male=0;
var female=0;
var other=0;
var totalriders;
var barchartsize = 300;


        d3.csv("Combined12.csv", function(data) {


                data.forEach(function (d) {
                if(d.usertype == "Member"){
                  members++;
                }else{
                  passholders++;
                }

                if(d.gender == "Male"){
                  male++;
                }else if(d.gender == "Female"){
                  female++;
                }else if(d.gender == "Other"){
                  other++;
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
                  .attr("width",barchartsize*2)
                  .attr("height",100)
                  .append("text")
                  .attr("x",50)
                  .attr("y",15)
                  .text("Number of Rides: "+totalriders)
                  .attr("font-family", "-apple-system,sans-serif")
                  .attr("font-weight","600")
                  .attr("font-size", "18px")
                  .attr("fill","black")
                  .attr("id","stats");


                  d3.select("stats")
                  .append("rect")
                  .attr("x",0)
                  .attr("y",20)
                  .attr("width",(members/totalriders)*barchartsize)
                  .attr("height",40)
                  .style("fill","#009892");

                  d3.select("stats")
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


                  d3.select("stats")
                  .append("rect")
                  .attr("x",(members/totalriders)*barchartsize)
                  .attr("y",20)
                  .attr("width",(passholders/totalriders)*barchartsize)
                  .attr("height",40)
                  .style("fill","#87bd6a");

                  d3.select("stats")
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

                  d3.select("stats")
                  .append("text")
                  .attr("x",barchartsize+20)
                  .attr("y",15)
                  .text("Average Length Of Trips: "+avgTripLength+" Minutes")
                  .attr("font-family", "-apple-system,sans-serif")
                  .attr("font-weight","600")
                  .attr("font-size", "18px")
                  .attr("fill","black");


                // tooltipHtml();
              });
