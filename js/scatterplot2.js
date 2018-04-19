var scatterChartTwo = function (options) {
    var width = 600, height = 400;
    var margin= 22;
    var xdim='Count';
    var ydim='Precipitation_In';
    var array=[];
    var chartSelection,
        svg;
    var circles;
    var xscale,yscale,xAxis,yAxis;


    function chart(selection, dataset) {
        chartSelection = selection;
        svg = selection.append("svg")
            .attr("width", width)
            .attr("height", height);
        // Create Scales
        //x-axis
        var maxx = d3.max(dataset, function (d){
            return d[xdim];
        });
        xscale = d3.scaleLinear()
            .domain([ 0 , maxx ])
            .range([margin, width-margin])
        //y-axis
        var maxy = d3.max(dataset, function (d){
            return d[ydim];
        });
        yscale = d3.scaleLinear()
            .domain( [ 0, maxy])
            .range([height-margin, margin])
        //
        xAxis=d3.axisBottom().scale(xscale);
        yAxis=d3.axisLeft(yscale);

        //Brush
        var brush=d3.brush()
            .extent([[0, 0], [width, height]])
            .on("end", brushed)
            //.on("end", brushended);


        svg.append("g")
            .attr("class", "x axis")
            .attr("transform","translate(0 ,"+(height-margin)+")")
            .call(xAxis);


        svg.append("g")
            .attr("class", "y axis")
            .attr("transform","translate("+margin+" , 0)")
            .call(yAxis);


        circles = svg.selectAll("circle.points")
            .data(dataset)
            .enter()
            .append("circle")
            .attr("class", "points")
            .attr("cx", function (d){
                return xscale(d[xdim])
            })
            .attr("cy", function (d){
                return yscale(d[ydim])
            })
            .attr("r", function (d){
                return 4;
            })
           .attr("opacity", 0.5)
           .style("fill", "rgba(70, 168, 186,0.1)");

        svg.append("g")
            .call(brush);
    }


    function brushed() { //Brush/select points on scatterplot
         array = []; //Array for updateMap
        var s = d3.event.selection,
            x0 = s[0][0],
            y0 = s[0][1],
            dx = s[1][0] - x0,
            dy = s[1][1] - y0;
        //console.log(s);

        svg.selectAll('circle.points') //select circles ("points") on scatterplot
            .style("fill", function (d) { //style selected points
                //console.log(d);
                //console.log(" xscale(d.x) >= x0  "+( xscale(d.x) >= x0) +"  xscale(d.x) <= x0 + dx    " +(xscale(d.x) <= x0 + dx ));
                //console.log("  yscale(d.y) >= y0   "+(yscale(d.y) >= y0 )+"   yscale(d.y) <= y0 + dy  "+ (yscale(d.y) <= y0 + dy))
                if (xscale(d[xdim]) >= x0 && xscale(d[xdim]) <= x0 + dx && yscale(d[ydim]) >= y0 && yscale(d[ydim]) <= y0 + dy)
                {
                    //push data to array from each selected/brushed points (each point is record in weather.csv)
                    array.push(d);
                    //console.log("array=", array[0].DateN); //print data points (weather.csv fields) to console
                    return "#ec7014";
                } else {
                    //console.log("keep the same ");
                    return "#4292c6";
                }
            });

        updateMap(array);
    }

    function brushended() {
        if (!d3.event.selection) {
            svg.selectAll('circle.points')
                .transition()
                .duration(150)
                .ease(d3.easeLinear)
                .style("fill", "#4292c6");
        }
    }

    function isBrushed(brush_coords, cx, cy) {

        var x0 = brush_coords[0][0],
            x1 = brush_coords[1][0],
            y0 = brush_coords[0][1],
            y1 = brush_coords[1][1];

        return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
    }

    chart.width = function(value) {
        if (!arguments.length) { return width; }
        width = value;

        return chart;
    }

    chart.height = function(value) {
        if (!arguments.length) { return height; }
        height = value;

        return chart;
    }

    chart.fillColor = function(value) {
        if (!arguments.length) return fillColor;
        fillColor = value;
        return chart;
    };

    chart.data= function(value) {
        if (!arguments.length) return data;
        data = value;
        return chart;
    };

    return chart;
}
