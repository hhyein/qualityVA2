import React, { useEffect, useRef } from 'react'

export default function DonutChart(props) {
  const { data, color, idx } = props
  const svgRef = useRef()
  const d3 = window.d3v4

  useEffect(() => {
    d3.select(`.donut-wrapper-${idx}`).selectAll('*').remove()
    
    const width = 50,
      height = 50,
      margin = 15

    const radius = Math.min(width, height) / 2 - margin

    const svg = d3
      .select(`.donut-wrapper-${idx}`)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${(width / 2)}, ${height / 2})`)
      .attr('z-index', 100)

    const colorScale = d3
      .scaleOrdinal()
      .domain(data)
      .range([color, 'lightgray'])

    const pie = d3
      .pie()
      .value(d => d.value)
      .sort(null)

    const calculatedData = pie(d3.entries(data))

    svg
      .selectAll()
      .data(calculatedData)
      .enter()
      .append('path')
      .attr(
        'd',
        d3
          .arc()
          .innerRadius(width / 2)
          .outerRadius(radius)
      )
      .attr('fill', d => colorScale(d.data.key))
  }, [data, color, svgRef, d3, idx])

  return (
      <div className={`donut-wrapper-${idx}`} />
  )
}
