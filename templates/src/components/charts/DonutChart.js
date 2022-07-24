import React, { useEffect, useRef } from 'react'
import Legend from './Legend'

const colors = ['steelblue', 'darkorange', 'darkgreen']

export default function DonutChart(props) {
  const { data, selectedLegendIdx, onLegendClick } = props
  const svgRef = useRef()
  const d3 = window.d3v4

  useEffect(() => {
    d3.select('.donut-wrapper').selectAll('*').remove()
    const donutData = data[selectedLegendIdx].data
    const width = 100,
      height = 100,
      margin = 20

    const radius = Math.min(width, height) / 2 - margin

    const svg = d3
      .select('.donut-wrapper')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)

    const colorScale = d3
      .scaleOrdinal()
      .domain(donutData)
      .range([colors[selectedLegendIdx], 'lightgray'])

    const pie = d3
      .pie()
      .value(d => d.value)
      .sort(null)

    const calculatedData = pie(d3.entries(donutData))

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
  }, [data, selectedLegendIdx, svgRef, d3])

  return (
    <div style={{ display: 'flex' }}>
      <div className="donut-wrapper" />
      <Legend
        onLegendClick={onLegendClick}
        dataColorInfo={data.reduce(
          (acc, { label }, i) => ({
            ...acc,
            [label]: colors[i],
          }),
          {}
        )}
      />
    </div>
  )
}
