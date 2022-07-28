import React, { useEffect, useRef } from 'react'

function HorizontalTreeChart(props) {
  const { data, dataLenght } = props
  const svgRef = useRef()
  const d3 = window.d3v3

  const leftMove = 25
  const nodeGap = 90

  useEffect(() => {
    d3.select(svgRef.current).selectAll('*').remove()

    var margin = { top: 0, right: 20, bottom: 10, left: leftMove },
      width = svgRef.current.clientWidth - margin.left - margin.right,
      height = 50 - margin.top - margin.bottom

    var i = 0
    var svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    var tree = d3.layout.tree().size([height, width])

    var diagonal = d3.svg.diagonal().projection(function (d) {
      return [d.y, d.x]
    })

    var root = data
    update(root)

    function update() {
      var nodes = tree.nodes(root).reverse()
      var links = tree.links(nodes)

      nodes.forEach(function (d) {
        d.x = 20
        d.y = d.depth * nodeGap
      })

      var node = svg.selectAll('g.node').data(nodes, function (d) {
        return d.id || (d.id = ++i)
      })

      var nodeEnter = node
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', function (d) {
          return 'translate(' + d.y + ',' + d.x + ')'
        })

      nodeEnter
        .append('circle')
        .attr('r', 10)
        .style('fill', function (d) {
          if (d.state == 'current') {
            return '#999999'
          } else {
            return '#cccccc'
          }
        })

      nodeEnter
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .text(function (d) {
          return d.index
        })

      var link = svg
        .selectAll('path.link')
        .data(links)
        .enter()
        .insert('path', 'g')
        .attr('class', 'link')
        .attr('d', diagonal)
    }
  }, [data, dataLenght])

  return <svg ref={svgRef} style={{ width: '100%', height: '100%' }}></svg>
}
export default HorizontalTreeChart
