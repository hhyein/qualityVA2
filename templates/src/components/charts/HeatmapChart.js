import React, { useEffect, useRef } from 'react'

export default function HeatmapChart(props) {
  const { data } = props
  const svgRef = useRef()
  const d3 = window.d3v4

  useEffect(() => {
    d3.select('.heatmap-wrapper').selectAll('*').remove()

    const margin = {top: 20, right: 20, bottom: 20, left: 20},
      width = 180 - margin.left - margin.right,
      height = 180 - margin.top - margin.bottom;

      const svg = d3
      .select('.heatmap-wrapper')
      .append('svg')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv", function(data) {
      const myGroups = d3.map(data, function(d){return d.group;}).keys()
      const myVars = d3.map(data, function(d){return d.variable;}).keys()

      const x = d3.scaleBand()
        .range([ 0, width ])
        .domain(myGroups)
        .padding(0.05);
      svg.append("g")
        .style("font-size", 15)
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0))
        .select(".domain").remove()

      const y = d3.scaleBand()
        .range([ height, 0 ])
        .domain(myVars)
        .padding(0.05);
      svg.append("g")
        .style("font-size", 15)
        .call(d3.axisLeft(y).tickSize(0))
        .select(".domain").remove()

      const myColor = d3.scaleSequential()
        .interpolator(d3.interpolateInferno)
        .domain([1, 100])

      const tooltip = d3.select("#my_dataviz")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")

      const mouseover = function(d) {
        tooltip
          .style("opacity", 1)
        d3.select(this)
          .style("stroke", "black")
          .style("opacity", 1)
      }
      const mousemove = function(d) {
        tooltip
          .html("The exact value of<br>this cell is: " + d.value)
          .style("left", (d3.mouse(this)[0]+70) + "px")
          .style("top", (d3.mouse(this)[1]) + "px")
      }
      const mouseleave = function(d) {
        tooltip
          .style("opacity", 0)
        d3.select(this)
          .style("stroke", "none")
          .style("opacity", 0.8)
      }

      svg.selectAll()
        .data(data, function(d) {return d.group+':'+d.variable;})
        .enter()
        .append("rect")
          .attr("x", function(d) { return x(d.group) })
          .attr("y", function(d) { return y(d.variable) })
          .attr("rx", 4)
          .attr("ry", 4)
          .attr("width", x.bandwidth() )
          .attr("height", y.bandwidth() )
          .style("fill", function(d) { return myColor(d.value)} )
          .style("stroke-width", 4)
          .style("stroke", "none")
          .style("opacity", 0.8)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
    })
    }, [data, svgRef])

  return (
    <div className="heatmap-wrapper" />
  )
}
