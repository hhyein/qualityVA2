import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts'

export default function LineChart(props) {
  const { data } = props
  const d3 = window.d3v4

  useEffect(() => {
    d3.select('.line-wrapper').selectAll('*').remove()

    var options = {
      series: [{
        name: "MAE",
        data: [10, 41, 35, 51, 49, 62]
      }],
      chart: {
        toolbar: {
          show: false
        },
        animations: {
          enabled: false
        },
        height: 160,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 3,
        curve: 'straight'
      },
      markers: {
        size: 4,
      },
      xaxis: {
        categories: ['0', '1', '2', '3', '4', '5'],
        tooltip: {
          enabled: false
        },
      },
      colors: ["#6C757D"]
    };

    var chart = new ApexCharts(document.querySelector(".line-wrapper"), options);
    chart.render();
  
    }, [data])

  return (
    <div className="line-wrapper" style={{ position: 'relative', bottom: 15 }} />
  )
}