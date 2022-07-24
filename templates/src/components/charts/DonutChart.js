import React, { useEffect, useRef } from 'react'

export default function DonutChart(props) {
  const { data } = props
  const svgRef = useRef()
  const d3 = window.d3v4

  useEffect(() => {
    d3.select('.doughnut-wrapper').selectAll('*').remove()
    const data = { a: 2, b: 10, c: 5, d: 7 }

    const width = 200,
      height = 200,
      margin = 40

    const radius = Math.min(width, height) / 2 - margin

    const svg = d3
      .select('.doughnut-wrapper')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)

    const colorScale = d3
      .scaleOrdinal()
      .domain(data)
      .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56'])

    const pie = d3.pie().value(d => d.value)

    const calculatedData = pie(d3.entries(data))

    svg
      .selectAll()
      .data(calculatedData)
      .enter()
      .append('path')
      .attr('d', d3.arc().innerRadius(100).outerRadius(radius))
      .attr('fill', d => colorScale(d.data.key))
  }, [data, svgRef, d3])

  return <div className="doughnut-wrapper" />
}
