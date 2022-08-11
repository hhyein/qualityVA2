import React, { useEffect, useRef } from 'react'

export default function BarChart(props) {
  const { data } = props
  const svgRef = useRef()
  const d3 = window.d3v4

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    d3.select(svgRef.current).selectAll('*').remove()

    const margin = {top: 20, right: 0, bottom: 20, left: 0},
      width = 50 - margin.left - margin.right,
      height = 80 - margin.top - margin.bottom;

    svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const subgroups = ['group', 'Nitrogen', 'normal', 'stress']
    const groups = ['banana']

    const x = d3
      .scaleBand()
      .domain(groups)
      .range([0, width])
      .padding([0.2])
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    const y = d3
      .scaleLinear()
      .domain([0, 20])
      .range([ height, 0 ]);
    svg
      .append("g")
      .call(d3.axisLeft(y));

    const xSubgroup = d3
      .scaleBand()
      .domain(subgroups)
      .range([0, x.bandwidth()])
      .padding([0.05])

    const color = d3
      .scaleOrdinal()
      .domain(subgroups)
      .range(['#e41a1c','#377eb8','#4daf4a'])

    svg
      .append("g")
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", function(d) { return "translate(" + x(d.group) + ",0)"; })
      .selectAll("rect")
      .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
      .enter().append("rect")
      .attr("x", function(d) { return xSubgroup(d.key); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", xSubgroup.bandwidth())
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", function(d) { return color(d.key); });
    }, [data, svgRef])

  return (
    <svg ref={svgRef}></svg>
  )
}