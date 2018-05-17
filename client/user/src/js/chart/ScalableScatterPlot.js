import Fisheye from "./Fisheye.js";
class ScalableScatterPlot {
    constructor() {
        this.margin = {
            top: 20,
            right: 15,
            bottom: 60,
            left: 60
        }
        this.width = 960 - this.margin.left - this.margin.right;
        this.height = 500 - this.margin.top - this.margin.bottom;
        this.defaultOpacityOfCircles = 0.8;
        this.circleRadius = 7;

        this.Fisheye = new Fisheye();
    }

    transFormCirclesData(data) {
        // sort by salary from-to average
        data = data.sort(function(a, b) {
            return((a["salary-from"] + a["salary-to"]) / 2) - ((b["salary-from"] + b[
                    "salary-to"]) /
                2);
        });
        // data transform for from-to dots
        let circlesData = [];
        data.forEach((e, i) => {
            circlesData.push([i, e["salary-from"], e["className"] + " from", e["role"], "from"]);
            circlesData.push([i, e["salary-to"], e["className"] + " to", e["role"], "to"]);
        });

        return circlesData;
    }

    transFormLinksData(data) {
        let lineCoordinates = [];
        data.forEach((e, i) => {
            lineCoordinates.push({
                x1: this.scaleX(i),
                y1: this.scaleY(e["salary-from"]),
                x2: this.scaleX(i),
                y2: this.scaleY(e["salary-to"])
            });
        });
        return lineCoordinates;
    }

    createChart(data) {
        // core scaling
        this.scaleX = d3.scale.linear()
            .domain([-1, data.length])
            .range([0, this.width]);

        this.scaleY = d3.scale.linear()
            .domain([0, d3.max(data, function(d) {
                return d["salary-to"];
            })])
            .range([this.height, 0]);

        // data transform for from-to dots
        let circlesData = this.transFormCirclesData(data);

        // data transform for links
        let lineCoordinates = this.transFormLinksData(data);

        // root element
        let svg = d3.select('#chartContainer')
            .append('svg:svg')
            .attr('width', this.width + this.margin.right + this.margin.left)
            .attr('height', this.height + this.margin.top + this.margin.bottom)
            .attr('class', 'chart');


        // holds tha chart with x and y axis
        let main = svg.append('g')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('class', 'main')


        // define x-axis scaling
        this.xAxis = d3.svg.axis()
            .scale(this.scaleX)
            .tickFormat(function(d) {
                return data[d] ? data[d].role : "";
            })
            .ticks(data.length)
            .orient("bottom");

        // x-axis values
        this.x_axis = main.append('g')
            .attr('transform', 'translate(0,' + this.height + ')')
            .attr('class', 'xAxis')
            .call(this.xAxis)
        // .selectAll("text")
        // .style("text-anchor", "end")
        // .attr("dx", "-.8em")
        // .attr("dy", ".15em")
        // .attr("transform", "rotate(-65)");

        //Add the text label for the x axis
        main.append("text")
            .attr("transform", "translate(" + (0) + " ," + (this.height + 26) + ")")
            .style("text-anchor", "middle")
            .text("Role");

        // draw the y axis
        this.yAxis = d3.svg.axis()
            .scale(this.scaleY)
            .orient("left")
            .innerTickSize(-this.width)
            .outerTickSize(0)
            .tickPadding(10);

        this.y_axis = main.append('g')
            .attr('transform', 'translate(0,0)')
            .attr('class', 'yAxis')
            .call(this.yAxis);

        // Add the text label for the Y axis
        main.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 20 - this.margin.left)
            .attr("x", 0 - (this.height))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Salary");

        // hover area
        main.append("rect")
            .attr("x", 0)
            .attr("y", this.margin.top)
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("opacity", 0)
            .attr("class", "hoverrect");

        // chart Container
        this.chartArea = main.append("g")
            .attr("class", "chartContainer");

        d3.select(".hoverrect").on('click', function() {
            d3.event.stopPropagation();
        });

        //links between dots
        let links = this.chartArea.selectAll("line")
            .data(lineCoordinates)
            .enter()
            .append("line")
            .style("z-index", '1')
            .datum(function(d, i) {
                return {
                    source: {
                        x: d.x1,
                        y: d.y1 - this.circleRadius
                    },
                    target: {
                        x: d.x2,
                        y: d.y2 + this.circleRadius
                    }
                }
            }.bind(this))
            .attr("class", "link")
            .style('stroke', '#696969')
            .attr('x1', function(d, i) {
                return d.source.x
            })
            .attr('y1', function(d, i) {
                return d.source.y
            })
            .attr('x2', function(d, i) {
                return d.target.x
            })
            .attr('y2', function(d, i) {
                return d.target.y
            });

        // from-to dots
        let circles = this.chartArea.selectAll("circLe")
            .data(circlesData)
            .enter()
            .append("circle")
            .style("z-index", '2')
            .datum(function(d, i) {
                return {
                    x: this.scaleX(d[0]),
                    y: this.scaleY(d[1]),
                    className: d[2],
                    role: d[3],
                    salary: d[1],
                    type: d[4],
                    id: "circle_" + d[0]
                }
            }.bind(this))
            .attr("class", function(d) {
                return d.className + " " + d.id;
            })
            .attr("cx", function(d) {
                return d.x;
            })
            .attr("cy", function(d) {
                return d.y;
            })
            .attr("r", this.circleRadius)
            .on('mouseover', function(d, i) {
                d3.select(this).style("cursor", "pointer");
                d3.select(".jobTitle").text(d.role);
                d3.selectAll(".from")
                    .style("opacity", this.defaultOpacityOfCircles);
                d3.selectAll(".to")
                    .style("opacity", this.defaultOpacityOfCircles);

                let circles = d3.selectAll("." + d.id)
                    .classed("active", true)
                    .style("opacity", 1);

                circles.each(function(circle) {
                    if(circle.type === "to") {
                        d3.select(".salaryMax").text(circle.salary.toFixed(1) + " HUF")
                    } else {
                        d3.select(".salaryMin").text(circle.salary.toFixed(1) + " HUF")
                    }
                });
            })
            .on('mouseout', function(d, i) {
                d3.select(this).style("cursor", "default");
                d3.selectAll(".from")
                    .style("opacity", this.defaultOpacityOfCircles)
                d3.selectAll(".to")
                    .style("opacity", this.defaultOpacityOfCircles)
                d3.selectAll("." + d.id)
                    .classed("active", false);
            });

        // fisheye setup
        this.fisheye = this.Fisheye.scale(d3.scale.linear)
            .domain([-1, data.length])
            .range([0, this.width])
            .distortion(4);

        // fisheye on mousemove
        var self = this;
        svg.selectAll('.hoverrect').on("mousemove", function() {
            self.fisheye.focus(d3.mouse(this)[0]);
            redraw();
        });

        // reset scale on mouseleave
        svg.on("mouseleave", () => {
            svg.selectAll('.from')
                .transition()
                .duration(500)
                .attr("cx", (d, i) => {
                    return this.scaleX(i);
                })

            svg.selectAll('.to')
                .transition()
                .duration(500)
                .attr("cx", (d, i) => {
                    return this.scaleX(i);
                });

            links
                .transition()
                .duration(500)
                .attr("x1", (e, t) => {
                    return this.scaleX(t)
                })
                .attr("x2", (e, t) => {
                    return this.scaleX(t)
                });
        });

        // fisheye effect
        function redraw() {
            svg.selectAll('.from')
                .attr("cx", (d, i)=> {
                    return self.fisheye(i);
                })
            svg.selectAll('.to')
                .attr("cx", (d, i)=> {
                    return self.fisheye(i);
                });
            links.attr("x1", (e, t) =>{
                return self.fisheye(t)
            }).attr("x2", (e, t)=> {
                return self.fisheye(t)
            });
        }
    }

    updateData(newData) {
        d3.select('#chartContainer').selectAll("*").remove();
        this.createChart(newData);
    }
}
export default ScalableScatterPlot;