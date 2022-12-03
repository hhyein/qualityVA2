import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts'

export default function ColumnSummaryChart(props) {
  const { data } = props
  const d3 = window.d3v4

  useEffect(() => {
    if (!data)
      return

    d3.select('.column-wrapper').selectAll('*').remove()

    var options = {
      series: data.seriesData,
      chart: {
        toolbar: {
          show: false
        },
        animations: {
          enabled: false
        },
        width: 725,
        height: 100,
        type: 'heatmap',
      },
      dataLabels: {
        enabled: false
      },
      colors: ['#5F9EA0', '#F08080', '#94CD32', '#4682B4', '#FF8C00'],
      xaxis: {
        type: 'category',
        categories: data.categoryData,
        labels: {
          show: false
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      tooltip: {
        enabled: false
      },
      grid: {
        padding: {
          right: 20
        }
      }
    };

    var chart = new ApexCharts(document.querySelector(".column-wrapper"), options);
    chart.render();

    }, [data])

  return (
    <div className="column-wrapper" />
  )
}
