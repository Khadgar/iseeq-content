import * as d3 from "d3";
import Fisheye from "./FisheyeV2.js";
import {saveAs} from "file-saver";
import Utils from "./Utils.js";

class SalaryChart {
    constructor(data) {
        this.margin = {
            top: 20,
            right: 15,
            bottom: 150,
            left: 60
        };
        this.width = 800 - this.margin.left - this.margin.right;
        this.height = 450 - this.margin.top - this.margin.bottom;
        this.defaultOpacityOfCircles = 0.7;
        this.circleRadius = 8;
        this.Fisheye = new Fisheye();
        this.Utils = new Utils();
    }

    transFormCirclesData(data) {
        // sort by salary from-to average
        data = data.sort(function(a, b) {
            return (a["salary-from"] + a["salary-to"]) / 2 - (b["salary-from"] + b["salary-to"]) / 2;
        });
        // data transform for from-to dots
        let circlesData = [];
        data.forEach((e, i) => {
            circlesData.push([i, e["salary-from"], e["seniority"] + " from", e["role"], "from"]);
            circlesData.push([i, e["salary-to"], e["seniority"] + " to", e["role"], "to"]);
        });

        return circlesData;
    }

    transFormLinksData(data, scaleX, scaleY) {
        let lineCoordinates = [];
        data.forEach((e, i) => {
            lineCoordinates.push({
                x1: scaleX(i),
                y1: scaleY(e["salary-from"]),
                x2: scaleX(i),
                y2: scaleY(e["salary-to"]),
                className: e["seniority"]
            });
        });
        return lineCoordinates;
    }

    filterSeniority(value) {
        if (value === "Show all") {
            this.chartArea.selectAll("circle").style("display", "block");
            this.chartArea.selectAll("line").style("display", "block");
        } else {
            this.chartArea.selectAll("circle").style("display", "none");
            this.chartArea.selectAll("line").style("display", "none");
            this.chartArea.selectAll(`.${value}`).style("display", "block");
        }
    }

    createGlobalChartElements(data) {
        this.scaleX = d3
            .scaleLinear()
            .domain([-1, data.length])
            .range([0, this.width]);
        this.scaleY = d3
            .scaleLinear()
            .domain([0, d3.max(data, d => d["salary-to"])])
            .range([this.height, 0]);

        // root element
        this.svg = d3
            .select("#chartContainer")
            .append("svg:svg")
            .attr("width", this.width + this.margin.right + this.margin.left)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .attr("class", "chart");
        // holds tha chart with x and y axis
        this.main = this.svg
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("class", "main");

        // define x-axis scaling
        this.xAxis = d3
            .axisBottom(this.scaleX)
            .tickFormat(d => (data[d] ? data[d].role : ""))
            .ticks(data.length);
        // x-axis values
        this.x_axis = this.main
            .append("g")
            .attr("transform", "translate(0," + this.height + ")")
            .attr("class", "xAxis")
            .call(this.xAxis);
        // draw the y axis
        this.yAxis = d3
            .axisLeft(this.scaleY)
            .tickSizeInner(-this.width)
            .tickSizeOuter(0)
            .tickPadding(10);

        this.y_axis = this.main
            .append("g")
            .attr("transform", "translate(0,0)")
            .attr("class", "yAxis")
            .call(this.yAxis);
        //Add the text label for the x axis
        this.main
            .append("text")
            .attr("transform", "translate(" + 0 + " ," + (this.height + 26) + ")")
            .style("text-anchor", "middle")
            .text("Role");

        // Add the text label for the Y axis
        this.main
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 20 - this.margin.left)
            .attr("x", 0 - this.height)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Salary");

        // hover area
        this.main
            .append("rect")
            .attr("x", 0)
            .attr("y", this.margin.top)
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("opacity", 0)
            .attr("class", "hoverrect")
            .on("click", () => {
                d3.event.stopPropagation();
            })
            .on("mousemove", (d, i, nodes) => {
                this.fisheye.focus(d3.mouse(nodes[i])[0]);
                this.redraw();
            });

        // fisheye setup
        this.fisheye = this.Fisheye.scale(d3.scaleLinear)
            .domain([-1, data.length])
            .range([0, this.width])
            .distortion(1);

        // fisheye effect
        this.redraw = () => {
            this.svg.selectAll(".from").attr("cx", (d, i) => {
                return this.fisheye(i);
            });
            this.svg.selectAll(".to").attr("cx", (d, i) => {
                return this.fisheye(i);
            });
            this.chartArea
                .selectAll("line")
                .attr("x1", (e, t) => {
                    return this.fisheye(t);
                })
                .attr("x2", (e, t) => {
                    return this.fisheye(t);
                });
            this.xAxis.scale(this.fisheye);
            this.x_axis.call(this.xAxis);
        };
        // chart Container
        this.chartArea = this.main.append("g").attr("class", "chartContainer");

        // reset scale on mouseleave
        this.svg.on("mouseleave", () => {
            this.svg
                .selectAll(".from")
                .transition()
                .duration(500)
                .attr("cx", (d, i) => {
                    return this.scaleX(i);
                });

            this.svg
                .selectAll(".to")
                .transition()
                .duration(500)
                .attr("cx", (d, i) => {
                    return this.scaleX(i);
                });

            this.chartArea
                .selectAll("line")
                .transition()
                .duration(500)
                .attr("x1", (e, t) => {
                    return this.scaleX(t);
                })
                .attr("x2", (e, t) => {
                    return this.scaleX(t);
                });
            this.xAxis.scale(this.scaleX);
            this.x_axis
                .transition()
                .duration(500)
                .call(this.xAxis);
        });

        // Set-up the export button
        d3.select(".downloadBtn").on("click", () => {
            var svgString = this.Utils.getSVGString(this.svg.node());
            this.Utils.svgString2Image(svgString, 2 * this.width, 2 * this.height, "png", save); // passes Blob and filesize String to the callback

            function save(dataBlob, filesize) {
                saveAs(dataBlob, "iseeq_salary_benchmark.png");
            }
        });
    }

    updateChartElements(circlesData, lineCoordinates, scaleX, scaleY) {
        this.chartArea
            .selectAll("circle")
            .remove()
            .transition()
            .duration(500);
        let circles = this.chartArea.selectAll("circle").data(circlesData);
        circles.exit().remove();
        circles
            .enter()
            .append("circle")
            .style("z-index", "2")
            .datum((d, i) => {
                return {
                    x: scaleX(d[0]),
                    y: scaleY(d[1]),
                    seniority: d[2],
                    role: d[3],
                    salary: d[1],
                    type: d[4],
                    id: "circle_" + d[0]
                };
            })
            .attr("class", d => d.seniority + " " + d.id)
            .attr("r", this.circleRadius)
            .on("mouseover", (d, i, nodes) => {
                d3.select(nodes[i]).style("cursor", "pointer");
                d3.select(".chartValue-role-value").text(d.role);
                d3.selectAll(".from").style("opacity", this.defaultOpacityOfCircles);
                d3.selectAll(".to").style("opacity", this.defaultOpacityOfCircles);
                let circles = d3
                    .selectAll("." + d.id)
                    .classed("active", true)
                    .style("opacity", 1);
                let salaryRange = [];
                circles.each(function(circle) {
                    salaryRange.push(circle.salary.toFixed(1));
                });
                d3.select(".chartValue-salary-value").text(
                    salaryRange
                        .sort()
                        .map(salary => `${salary} HUF`)
                        .join(" - ")
                );
                d3.select(".chartValue-seniority-value")
                .text(d.seniority.split(" ")[0]);
                d3.select(".x_axis_label.label_" + Math.floor(i/2))
                .classed("highlight", true)
            })
            .on("mouseout", (d, i, nodes) => {
                // d3.select(".chartValue-salary-value").text('');
                // d3.select(".chartValue-role-value").text('');
                // d3.select(".chartValue-seniority-value").text('');
                d3.select(nodes[i]).style("cursor", "default");
                d3.selectAll(".from").style("opacity", this.defaultOpacityOfCircles);
                d3.selectAll(".to").style("opacity", this.defaultOpacityOfCircles);
                d3.selectAll("." + d.id).classed("active", false);
                d3.selectAll(".x_axis_label").classed("highlight", false)

            })
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

        this.chartArea
            .selectAll("line")
            .remove()
            .transition()
            .duration(500);
        let links = this.chartArea.selectAll("line").data(lineCoordinates);

        links
            .enter()
            .append("line")
            .style("z-index", "1")
            .datum((d, i) => {
                return {
                    source: {
                        x: d.x1,
                        y: d.y1 - this.circleRadius
                    },
                    target: {
                        x: d.x2,
                        y: d.y2 + this.circleRadius
                    },
                    className: d.className
                };
            })
            .attr("class", d => `link ${d.className}`)
            .style("stroke", "#696969")
            .attr("x1", (d, i) => d.source.x)
            .attr("y1", (d, i) => d.source.y)
            .attr("x2", (d, i) => d.target.x)
            .attr("y2", (d, i) => d.target.y);
    }

    updateData(data) {
        this.scaleX = d3
            .scaleLinear()
            .domain([-1, data.length])
            .range([0, this.width]);
        this.scaleY = d3
            .scaleLinear()
            .domain([0, d3.max(data, d => d["salary-to"])])
            .range([this.height, 0]);

        // data transform for from-to dots
        let circlesData = this.transFormCirclesData(data);
        // data transform for links
        let lineCoordinates = this.transFormLinksData(data, this.scaleX, this.scaleY);

        // define x-axis scaling
        this.xAxis = d3
            .axisBottom(this.scaleX)
            .tickFormat(d => (data[d] ? data[d].role : ""))
            .ticks(data.length);
        // x-axis values
        this.x_axis
            .call(this.xAxis)
            .selectAll("text")
            .attr("class",(i)=>{
                return "x_axis_label label_"+ i
            })
            .attr("dx", "-1.1em")
            .attr("dy", ".15em");

        // draw the y axis
        this.yAxis = d3
            .axisLeft(this.scaleY)
            .tickSizeInner(-this.width)
            .tickSizeOuter(0)
            .tickPadding(10);

        this.y_axis.call(this.yAxis)
        .attr("class","y_axis_label");

        // fisheye setup
        this.fisheye = this.Fisheye.scale(d3.scaleLinear)
            .domain([-1, data.length])
            .range([0, this.width])
            .distortion(1);

        this.updateChartElements(circlesData, lineCoordinates, this.scaleX, this.scaleY);
    }
}
export default SalaryChart;
