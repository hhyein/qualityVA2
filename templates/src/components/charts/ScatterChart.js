import React, { useEffect, useRef } from 'react'

export default function ScatterChart(props) {
  const { data } = props
  const svgRef = useRef()
  const d3 = window.d3v4

  useEffect(() => {
    d3.select('.scatter-wrapper').selectAll('*').remove()

    const margin = {top: 20, right: 20, bottom: 20, left: 20},
      width = 180 - margin.left - margin.right,
      height = 180 - margin.top - margin.bottom;

    const svg = d3
    .select('.scatter-wrapper')
    .append('svg')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv", function(data) {
      const x = d3.scaleLinear()
        .domain([4, 8])
        .range([ 0, width ]);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      const y = d3.scaleLinear()
        .domain([0, 9])
        .range([ height, 0]);
      svg
        .append("g")
        .call(d3.axisLeft(y));

      const color = d3.scaleOrdinal()
        .domain(["setosa", "versicolor", "virginica" ])
        .range([ "#440154ff", "#21908dff", "#fde725ff"])

      svg
        .append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.Sepal_Length); } )
        .attr("cy", function (d) { return y(d.Petal_Length); } )
        .attr("r", 5)
        .style("fill", function (d) { return color(d.Species) } )
    })
    }, [data, svgRef])

  return (
    <div className="scatter-wrapper" />
  )
}
