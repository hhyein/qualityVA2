import React, { useEffect } from 'react'

export default function Legend(props) {
  const { dataColorInfo, onLegendClick } = props
  const d3 = window.d3v4

  useEffect(() => {
    d3.select('.legend-wrapper').selectAll('*').remove()

    const width = 180
    const height = 80

    const svg = d3
      .select('.legend-wrapper')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')

    Object.entries(dataColorInfo).forEach(([key, color], i) => {
      svg
        .append('circle')
        .attr('cx', 10)
        .attr('cy', 20 + i * 20)
        .attr('r', 6)
        .style('fill', color)
      svg
        .append('text')
        .attr('x', 20)
        .attr('y', 20 + i * 20)
        .text(key)
        .style('cursor', 'pointer')
        .style('font-size', '15px')
        .attr('alignment-baseline', 'middle')
        .on('click', () => {
          onLegendClick(i)
        })
    })
  }, [d3, dataColorInfo, onLegendClick])

  return <div className="legend-wrapper" />
}
