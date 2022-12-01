import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts'

export default function HeatmapChart(props) {
  const { data } = props
  const d3 = window.d3v4

  useEffect(() => {
    d3.select('.correlation-wrapper').selectAll('*').remove()

    var options = {
      series: [{
        name: 'Jan',
        data: [-30, 55, 10, 20, 30, 42, 75, 27, 84, 15, 26, 83]
      },
      {
        name: 'Feb',
        data: [-30, 55, 10, 20, 30, 42, 75, 27, 84, 15, 26, 83]
      },
      {
        name: 'Mar',
        data: [-30, 55, 10, 20, 30, 42, 75, 27, 84, 15, 26, 83]
      },
      {
        name: 'Apr',
        data: [-30, 55, 10, 20, 30, 42, 75, 27, 84, 15, 26, 83]
      },
      {
        name: 'May',
        data: [-30, 55, 10, 20, 30, 42, 75, 27, 84, 15, 26, 83]
      },
      {
        name: 'Jun',
        data: [-30, 55, 10, 20, 30, 42, 75, 27, 84, 15, 26, 83]
      },
      {
        name: 'Jul',
        data: [-30, 55, 10, 20, 30, 42, 75, 27, 84, 15, 26, 83]
      },
      {
        name: 'Aug',
        data: [-30, 55, 10, 20, 30, 42, 75, 27, 84, 15, 26, 83]
      },
      {
        name: 'Sep',
        data: [-30, 55, 10, 20, 30, 42, 75, 27, 84, 15, 26, 83]
      }
    ],
      chart: {
        toolbar: {
          show: false
        },
        animations: {
          enabled: false
        },
        width: 280,
        height: 220,
        type: 'heatmap'
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        tooltip: {
          enabled: false
        }
      },
      tooltip: {
        x: {
          show: true
        }
      },
      legend: {
        show: false
      },
      plotOptions: {
        heatmap: {
          colorScale: {
            ranges: [{
                from: -30,
                to: 5,
                name: 'low',
                color: '#00A100'
              },
              {
                from: 46,
                to: 84,
                name: 'extreme',
                color: '#FF0000'
              }
            ]
          }
        }
      }
    };

    var chart = new ApexCharts(document.querySelector(".correlation-wrapper"), options);
    chart.render();

  }, [data])

  return (
    <div className="correlation-wrapper" />
  )
}
