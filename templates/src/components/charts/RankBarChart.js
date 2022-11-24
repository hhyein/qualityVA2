import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts'

export default function BarChart(props) {
  const { data } = props
  const d3 = window.d3v4

  useEffect(() => {
    d3.select('.rankBar-wrapper').selectAll('*').remove()

    var options = {
      series: [{
        data: [400, 430, 448, 470, 540, 580, 690, 110, 120, 180]
      }],
      chart: {
        toolbar: {
          show: false
        },
        animations: {
          enabled: false
        },
        width: 280,
        height: 220,
        type: 'bar'
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
          'United States', 'China', 'Germany'
        ],
      }
    };

    var chart = new ApexCharts(document.querySelector(".rankBar-wrapper"), options);
    chart.render();
  
    }, [data])

  return (
    <div className="rankBar-wrapper" />
  )
}