import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts'

export default function RaderChart(props) {
  const { data } = props
  const d3 = window.d3v4

  useEffect(() => {
    d3.select('.radar-wrapper').selectAll('*').remove()

    var options = {
      series: [{
        name: 'LR',
        data: [80, 50, 30, 40, 100, 20],
      }, {
        name: 'NB',
        data: [20, 30, 40, 80, 20, 80],
      }, {
        name: 'DT',
        data: [44, 76, 78, 13, 43, 10],
      }],
      chart: {
        toolbar: {
          show: false
        },
        animations: {
          enabled: false
        },
        width: 200,
        height: 230,
        type: 'radar',
      },
      xaxis: {
        categories: ['MAE', 'MSE', 'RMSE', 'R2', 'RMSLE', 'MAPE']
      },
      yaxis: {
        show: false
      },
      colors: ['#FF6347', '#9370DB', '#2E8B57', '#DC143C', '#FF69B4'],
    };

    var chart = new ApexCharts(document.querySelector(".radar-wrapper"), options);
    chart.render();
  
    }, [d3, data])

  return (
    <div className="radar-wrapper" />
  )
}