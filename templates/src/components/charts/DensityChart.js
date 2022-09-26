import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts'

export default function DensityChart(props) {
  const { data } = props
  const d3 = window.d3v4

  useEffect(() => {
    d3.select('.density-wrapper').selectAll('*').remove()

    var options = {
      series: [{
      name: 'before',
      data: [31, 40, 28, 51, 42, 109, 100]
    }, {
      name: 'after',
      data: [11, 32, 45, 32, 34, 52, 41]
    }],
      chart: {
        toolbar: {
          show: false
        },
        animations: {
          enabled: false
        },
        height: 130,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        type: 'datetime',
        categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"],
        tooltip: {
          enabled: false
        }
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      },
      legend: {
        show: false
      }
    };

    var chart = new ApexCharts(document.querySelector(".density-wrapper"), options);
    chart.render();
  
    }, [data])

  return (
    <div className="density-wrapper" />
  )
}