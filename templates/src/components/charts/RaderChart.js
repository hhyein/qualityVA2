import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts'

export default function RaderChart(props) {
  const { data } = props
  const d3 = window.d3v4

  useEffect(() => {
    d3.select('.radar-wrapper').selectAll('*').remove()

    var options = {
      series: data,
      
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
      legend: {
        showForSingleSeries: true,
        width: 200,
        height: 35
      },
      colors: ['#FF6347', '#9370DB', '#2E8B57', '#B22222', '#FF69B4'],
    };

    var chart = new ApexCharts(document.querySelector(".radar-wrapper"), options);
    chart.render();
  
    }, [d3, data])

  return (
    <div className="radar-wrapper" />
  )
}