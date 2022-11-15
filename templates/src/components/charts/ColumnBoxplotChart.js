import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts'

export default function BoxplotChart(props) {
  const { data } = props
  const d3 = window.d3v4

  useEffect(() => {
    d3.select('.boxplot-wrapper').selectAll('*').remove()

    var options = {
      series: [
      {
        data: [
          {
            x: 'alcohol',
            y: [54, 66, 69, 75, 88]
          }
        ]
      }
    ],
      chart: {
        toolbar: {
          show: false
        },
        animations: {
          enabled: false
        },
        height: 90,
        type: 'boxPlot'
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '50%'
        },
        boxPlot: {
          colors: {
            upper: '#e9ecef',
            lower: '#f8f9fa'
          }
        }
      },
      stroke: {
        colors: ['#6c757d']
      }
    };

    var chart = new ApexCharts(document.querySelector(".boxplot-wrapper"), options);
    chart.render();

    }, [data])

  return (
    <div className="boxplot-wrapper" style={{ position: 'relative', bottom: 10 }} />
  )
}