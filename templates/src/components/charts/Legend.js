import React, { useEffect } from 'react'

export default function Legend(props) {
  const { dataColorInfo, onLegendClick } = props
  const d3 = window.d3v4

  useEffect(() => {
    d3.select('.legend-wrapper').selectAll('*').remove()

    const margin = { top: 10, right: 10, bottom: 10, left: 10 }
    const width = 150
    const height = 100

    const svg = d3
      .select('.legend-wrapper')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

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
