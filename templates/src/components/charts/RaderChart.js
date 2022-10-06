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
        data: data,
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
    }
    };

    var chart = new ApexCharts(document.querySelector(".radar-wrapper"), options);
    chart.render();
  
    }, [d3, data])

  return (
    <div className="radar-wrapper" />
  )
}