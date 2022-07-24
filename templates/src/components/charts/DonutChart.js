import React, { useEffect, useRef } from "react"

export default function DonutChart(props) {
  const { data } = props
  const svgRef = useRef()
  const d3 = window.d3v4

  useEffect(() => {
    var svg = d3.select(svgRef.current)
    d3.select(svgRef.current).selectAll("*").remove()

    var width = 200
    var height = 200
    var margin = 50
    var radius = Math.min(width, height) / 2 - margin

    svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var data = {a: 9, b: 20, c:30, d:8, e:12}

    var color = d3.scaleOrdinal()
      .domain(data)
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

    var pie = d3.pie()
      .value(function(d) { 
        return d.value; 
      })
    var data_ready = pie(d3.entries(data))

    svg
      .selectAll('whatever')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', d3.arc()
      .innerRadius(100)
      .outerRadius(radius)
      )
      .attr('fill', function(d){ 
        return(color(d.data.key)) 
      })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)
  }, [data, svgRef])

  return (
    <div className="svg-wrapper">
      <svg ref={svgRef}></svg>
    </div>
  )
}
