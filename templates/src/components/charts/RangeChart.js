import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts'

export default function RangeChart(props) {
  const { data } = props
  const d3 = window.d3v4

  useEffect(() => {
    d3.select('.range-wrapper').selectAll('*').remove()

    var options = {
      series: [{
        data: [{
          x: 'missing',
          y: [1, 5]
        }, {
          x: 'outlier',
          y: [4, 6]
        }, {
          x: 'incons',
          y: [5, 8]
        }, {
          x: 'scaling',
          y: [7, 11]
        },  {
          x: 'selection',
          y: [3, 11]
        }]
      }],
      chart: {
        toolbar: {
          show: false
        },
        animations: {
          enabled: false
        },
        type: 'rangeBar',
        height: 135
      },
      plotOptions: {
        bar: {
          columnWidth: '30%'
        }
      },
      colors: ["#6C757D"]
    };

    var chart = new ApexCharts(document.querySelector(".range-wrapper"), options);
    chart.render();
  
    }, [data])

  return (
    <div className="range-wrapper" style={{ position: 'relative', bottom: 15 }} />
  )
}