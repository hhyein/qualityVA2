import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts'

export default function DensityChart(props) {
  const { data } = props
  const d3 = window.d3v4

  useEffect(() => {
    d3.select('.density-wrapper').selectAll('*').remove()

    var options = {
      series: data.seriesData,
      chart: {
        toolbar: {
          show: false
        },
        animations: {
          enabled: false
        },
        height: 155,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: data.categoryData,
        tooltip: {
          enabled: false
        },
        tickAmount: 5
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      legend: {
        show: false
      },
      stroke: {
        width: 2
      },
      colors: ["#cccccc", "#6C757D"]
    };

    var chart = new ApexCharts(document.querySelector(".density-wrapper"), options);
    chart.render();
  
    }, [data])

  return (
    <div className="density-wrapper" />
  )
}