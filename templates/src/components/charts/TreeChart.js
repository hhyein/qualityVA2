import React, { useEffect, useRef } from 'react'

export default function TreeChart(props) {
  const svgRef = useRef()
  const d3 = window.d3v3
  const nodeGap = 90

  const data = {
    "index": "0",
    "state": "none",
    "name": "start",
    "children": [
      {
        "index": "1",
        "state": "none",
        "name": "mm",
        "children": [
            {
              "index": "2",
              "state": "none",
              "name": "mod",
              "children": [
                  {
                    "index": "3",
                    "state": "current",
                    "name": "locf",
                  }
              ]
            }
        ]
      }
    ]
  }

  useEffect(() => {
    d3.select('.treeChart-wrapper').selectAll('*').remove()

    var margin = { top: 10, right: 0, bottom: 0, left: 0 },
      width = 50 - margin.left - margin.right,
      height = 350 - margin.top - margin.bottom

    var i = 0
    var svg = d3
      .select('.treeChart-wrapper')
      .append('svg')
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    var tree = d3.layout.tree().size([height, width])
    var diagonal = d3.svg.diagonal().projection(function (d) {
      return [d.x, d.y]
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
          return 'translate(' + d.x + ',' + d.y + ')'
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
  }, [data, svgRef])

  return (
    <React.Fragment>

    <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr 1fr 1fr'}}>
          <p style={{margin: 0}}>action id</p>
          <p style={{margin: 0}}>action type</p>
          <p style={{margin: 0}}>change</p>
          <p style={{margin: 0}}>distort</p>
    </div>
    <hr class="solid" />
    <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr 1fr 1fr' }}>
          <div className="treeChart-wrapper" />
          <div style={{ borderLeft: '4px dashed #bcbcbc' }}>{[1,2,3,4].map(item => (
            <div style={{ borderBottom: '4px dashed #bcbcbc', height: '75px' }}>{item}</div>
          ))}</div>
          <div style={{ borderLeft: '4px dashed #bcbcbc' }}>{[1,2,3,4].map(item => (
            <div style={{ borderBottom: '4px dashed #bcbcbc', height: '75px' }}>{item}</div>
          ))}</div>
          <div style={{ borderLeft: '4px dashed #bcbcbc', borderRight: '4px dashed #bcbcbc' }}>{[1,2,3,4].map(item => (
            <div style={{ borderBottom: '4px dashed #bcbcbc', height: '75px' }}>{item}</div>
          ))}</div>
    </div>
    </React.Fragment>
  )
}