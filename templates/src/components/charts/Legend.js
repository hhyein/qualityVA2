import React, { useEffect } from 'react'

export default function Legend(props) {
  const { dataColorInfo, onLegendClick } = props
  const d3 = window.d3v4
  
  // const exampleLegendData = [
  //   { text: 'missing', color: 'steelblue' },
  //   { text: 'outlier', color: 'darkorange' },
  //   { text: 'inconsistent', color: 'darkgreen' },
  // ]

  useEffect(() => {
    d3.select('.legend-wrapper').selectAll('*').remove()

    const width = 500
    const height = 30

    const svg = d3
      .select('.legend-wrapper')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')

    Object.entries(dataColorInfo).forEach(([idx, data], i) => {
      svg
        .append('circle')
        .attr('cx', 10  + i * 100)
        .attr('cy', 15)
        .attr('r', 6)
        .style('fill', data.color)
      svg
        .append('text')
        .attr('x', 20  + i * 100)
        .attr('y', 15)
        .text(data.text)
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
