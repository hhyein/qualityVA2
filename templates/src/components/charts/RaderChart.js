import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts'

export default function RaderChart(props) {
  const { data } = props
  const d3 = window.d3v4

  useEffect(() => {
    d3.select('.radar-wrapper').selectAll('*').remove()

    var options = {
      series: [{
        name: 'Series 1',
        data: [80, 50, 30, 40, 100, 20],
      }],
      chart: {
        toolbar: {
          show: false
        },
        animations: {
          enabled: false
        },
        width: 260,
        height: 300,
        type: 'radar',
    },
    xaxis: {
      categories: ['MSE', 'RMSE', 'R2', 'RMSLE', 'MAPE', 'TT']
    }
    };

    var chart = new ApexCharts(document.querySelector(".radar-wrapper"), options);
    chart.render();
  
    }, [data])

  return (
    <div className="radar-wrapper" />
  )
}