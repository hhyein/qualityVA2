import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts'

export default function HistogramChart(props) {
  const { chartName, data, method } = props
  const d3 = window.d3v4

  useEffect(() => {
    if (!data || data.visualization != chartName)
      return;
    
    d3.select('.histogram-wrapper').selectAll('*').remove()

    if (method === 'z-score') {
      data.lower = -Infinity
      data.upper = data.threshold
    }

    var options = {
      series: data.seriesData,
      chart: {
        toolbar: {
          show: false
        },
        animations: {
          enabled: false
        },
        width: 260,
        height: 175,
        type: 'bar',
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: data.categoryData,
      },
      plotOptions: {
        bar: {
          colors: {
            ranges: [{
              to: data.lower,
              color: '#D91212'
            }, {
              from: data.lower,
              to: data.upper,
              color: '#6C757D'
            }, {
              from: data.upper,
              color: '#D91212'
            }]
          },
        }
      }
    };

    var chart = new ApexCharts(document.querySelector(".histogram-wrapper"), options);
    chart.render();

  }, [data])

  return (
    <div className="histogram-wrapper" />
  )
}
