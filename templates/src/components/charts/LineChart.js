import React, { useEffect, useRef } from 'react'

export default function LineChart(props) {
  const { data, dataLenght } = props
  const svgRef = useRef()
  const d3 = window.d3v4

  const leftMove = 25

  useEffect(() => {
    if (!data) {
      return
    }
    var svg = d3.select(svgRef.current)
    d3.select(svgRef.current).selectAll('*').remove()

    var margin = { top: 0, right: 20, bottom: 10, left: 20 },
      width = svgRef.current.clientWidth - margin.left - margin.right,
      height = 130 - margin.top - margin.bottom

    svg
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    var allGroup = ['lr', 'knn', 'dt']

    var dataReady = allGroup.map(function (grpName) {
      return {
        name: grpName,
        values: data.map(function (d) {
          return { time: d.time, value: +d[grpName] }
        }),
      }
    })

    var myColor = d3
      .scaleOrdinal()
      .domain(allGroup)
      .range(['crimson', 'mediumpurple', 'yellowgreen'])

    var x = d3.scaleLinear().domain([0, dataLenght]).range([0, width])
    svg
      .append('g')
      .attr('transform', 'translate(' + leftMove + ',' + height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .remove()

    var y = d3
      .scaleLinear()
      .domain([0, 0.5])
      .range([height - 10, 0])
    svg
      .append('g')
      .attr('transform', 'translate(' + leftMove + ', 10)')
      .call(d3.axisLeft(y))

    var line = d3
      .line()
      .x(function (d) {
        return x(+d.time) + leftMove
      })
      .y(function (d) {
        return y(+d.value)
      })

    svg
      .selectAll('myLines')
      .data(dataReady)
      .enter()
      .append('path')
      .attr('d', function (d) {
        return line(d.values)
      })
      .attr('stroke', function (d) {
        return myColor(d.name)
      })
      .style('stroke-width', 4)
      .style('fill', 'none')

    svg
      .selectAll('myDots')
      .data(dataReady)
      .enter()
      .append('g')
      .style('fill', function (d) {
        return myColor(d.name)
      })
      .selectAll('myPoints')
      .data(function (d) {
        return d.values
      })
      .enter()
      .append('circle')
      .attr('cx', function (d) {
        return x(d.time) + leftMove
      })
      .attr('cy', function (d) {
        return y(d.value)
      })
      .attr('r', 5)
      .attr('stroke', 'white')
  }, [data, dataLenght])

  return (
    <>
      <svg ref={svgRef} style={{ width: '100%' }}></svg>
    </>
  )
}
