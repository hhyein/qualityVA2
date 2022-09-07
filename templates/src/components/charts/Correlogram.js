import React, { useEffect, useRef } from 'react'

export default function Correlogram(props) {
  const { data } = props
  const svgRef = useRef()
  const d3 = window.d3v4

  useEffect(() => {
    d3.select('.correlogram-wrapper').selectAll('*').remove()

    const margin = {top: 20, right: 20, bottom: 20, left: 20},
      width = 300 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom

    const svg = d3
      .select('.correlogram-wrapper')
      .append('svg')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_correlogram.csv", function(error, rows) {
      const data = [];
      rows.forEach(function(d) {
        const x = d[""];
        delete d[""];
        for (const prop in d) {
          const y = prop,
            value = d[prop];
          data.push({
            x: x,
            y: y,
            value: +value
          });
        }
      });

      const domain = d3.set(data.map(function(d) { return d.x })).values()
      const color = d3.scaleLinear()
        .domain([-1, 0, 1])
        .range(["#B22222", "#fff", "#000080"]);

      const size = d3.scaleSqrt()
        .domain([0, 1])
        .range([0, 9]);

      const x = d3.scalePoint()
        .range([0, width])
        .domain(domain)

      const y = d3.scalePoint()
        .range([0, height])
        .domain(domain)

      const cor = svg.selectAll(".cor")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "cor")
        .attr("transform", function(d) {
          return "translate(" + x(d.x) + "," + y(d.y) + ")";
        });

      cor
        .filter(function(d){
          const ypos = domain.indexOf(d.y);
          const xpos = domain.indexOf(d.x);
          return xpos <= ypos;
        })
        .append("text")
        .attr("y", 5)
        .text(function(d) {
          if (d.x === d.y) {
            return d.x;
          } else {
            return d.value.toFixed(2);
          }
        })
        .style("font-size", 10)
        .style("text-align", "center")
        .style("fill", function(d){
          if (d.x === d.y) {
            return "#000";
          } else {
            return color(d.value);
          }
        });

      cor
        .filter(function(d){
          const ypos = domain.indexOf(d.y);
          const xpos = domain.indexOf(d.x);
          return xpos > ypos;
        })
        .append("circle")
        .attr("r", function(d){ return size(Math.abs(d.value)) })
        .style("fill", function(d){
          if (d.x === d.y) {
            return "#000";
          } else {
            return color(d.value);
          }
        })
        .style("opacity", 0.8)
    })
    }, [data, svgRef])

  return (
    <div className="correlogram-wrapper" />
  )
}
