import React, { useEffect, useRef } from 'react'

export default function HistogramChart(props) {
  const { data } = props
  const svgRef = useRef()
  const d3 = window.d3v4

  useEffect(() => {
    d3.select('.histogram-wrapper').selectAll('*').remove()

    const margin = {top: 20, right: 20, bottom: 20, left: 20},
      width = 200 - margin.left - margin.right,
      height = 200 - margin.top - margin.bottom;

    const svg = d3
      .select('.histogram-wrapper')
      .append('svg')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/1_OneNum.csv", function(data) {
      const x = d3.scaleLinear()
          .domain([0, 1000])
          .range([0, width])
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      const histogram = d3.histogram()
        .value(function(d) { return d.price; })
        .domain(x.domain())
        .thresholds(x.ticks(70));

      const bins = histogram(data);
      const y = d3.scaleLinear()
          .range([height, 0])
          .domain([0, d3.max(bins, function(d) { return d.length; })]);
      svg
        .append("g")
        .call(d3.axisLeft(y));

      svg
        .selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
        .attr("x", 1)
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
        .attr("height", function(d) { return height - y(d.length); })
        .style("fill", function(d){ if(d.x0<140){return "orange"} else {return "#69b3a2"}})

      svg
        .append("line")
        .attr("x1", x(140) )
        .attr("x2", x(140) )
        .attr("y1", y(0))
        .attr("y2", y(1600))
        .attr("stroke", "grey")
        .attr("stroke-dasharray", "4")
      svg
        .append("text")
        .attr("x", x(190))
        .attr("y", y(1400))
        .text("threshold: 140")
        .style("font-size", "15px")
    });
  }, [data, svgRef])

  return (
    <div className="histogram-wrapper" />
  )
}
