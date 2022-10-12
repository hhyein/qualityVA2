import React, { useEffect, useRef } from 'react'

export default function RowSummaryChartD3() {
  const svgRef = useRef()
  const d3 = window.d3v4

  useEffect(() => {
    d3.select('.row-wrapper').selectAll('*').remove()

    var margin = {top: 30, right: 10, bottom: 30, left: 25},
      width = 90 - margin.left - margin.right,
      height = 640 - margin.top - margin.bottom;

    var svg = d3
      .select('.row-wrapper')
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var myGroups = ["A", "B", "C"]
    var myVars = ["v11", "v12", "v13", "v14", "v15", "v16", "v17", "v18", "v19", "v20", "v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9", "v10"]

    var x = d3.scaleBand()
      .range([ 0, width ])
      .domain(myGroups)
      .padding(0.01);

    var y = d3.scaleBand()
      .range([ height, 0 ])
      .domain(myVars)

    var myAColor = d3.scaleLinear()
      .range(["white", "#FF8C00"])
      .domain([1, 100])

    var myBColor = d3.scaleLinear()
      .range(["white", "#4682B4"])
      .domain([1, 100])

    var myCColor = d3.scaleLinear()
      .range(["white", "#94CD32"])
      .domain([1, 100])

    d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv", function(data) {
    svg.selectAll()
        .data(data, function(d) {return d.group+':'+d.variable;})
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d.group) })
        .attr("y", function(d) { return y(d.variable) })
        .attr("width", x.bandwidth() )
        .attr("height", y.bandwidth() )
        .style("fill", function(d) {
          if (d.group == 'A') { return myAColor(d.value) }
          if (d.group == 'B') { return myBColor(d.value) }
          if (d.group == 'C') { return myCColor(d.value) }
        })
      })
  }, [svgRef])

  return (
    <div className="row-wrapper" style={{ height: 440, overflowY: 'scroll' }} />
  )
}
