import React, { useEffect, useRef } from "react"

export default function Legend(props) {
  const { dataColorInfo } = props
  const svgRef = useRef()
  const d3 = window.d3v4

  useEffect(() => {
    var svg = d3.select(svgRef.current)
    d3.select(svgRef.current).selectAll("*").remove()

    var margin = { top: 0, right: 0, bottom: 10, left: 0 },
      width = svgRef.current.clientWidth - margin.left - margin.right,
      height = 30 - margin.top - margin.bottom

    svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    Object.entries(dataColorInfo).forEach(([key, color], i) => {
      svg
        .append("circle")
        .attr("cx", 10 + i * 95)
        .attr("cy", 20)
        .attr("r", 6)
        .style("fill", color)
      svg
        .append("text")
        .attr("x", 20 + i * 95)
        .attr("y", 20)
        .text(key)
        .style("font-size", "15px")
        .attr("alignment-baseline", "middle")
    })
  }, [dataColorInfo])

  return (
    <>
      <svg ref={svgRef} style={{ width: '100%' }}></svg>
    </>
  )
}
