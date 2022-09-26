import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts'

export default function ColumnSummaryChart(props) {
  const { data } = props
  const d3 = window.d3v4

  useEffect(() => {
    d3.select('.column-wrapper').selectAll('*').remove()

    var options = {
      series: [
        {
          name: 'r1',
          data: [0, 47, 66, 23, 34, 17, 88, 46, 48, 23]
        },
        {
          name: 'r2',
          data: [9, 73, 48, 76, 67, 7, 49, 11, 78, 42]
        },
        {
          name: 'r3',
          data: [51, 70, 56, 31, 34, 24, 32, 58, 33, 4]
        },
        {
          name: 'r4',
          data: [8, 90, 39, 63, 16, 49, 90, 17, 62, 36]
        },
        {
          name: 'r5',
          data: [58, 34, 22, 46, 47, 9, 89, 31, 69, 24]
        },
      ],
      chart: {
        toolbar: {
          show: false
        },
        animations: {
          enabled: false
        },
        height: 100,
        type: 'heatmap',
      },
      dataLabels: {
        enabled: false
      },
      colors: ['#5F9EA0', '#F08080', '#94CD32', '#4682B4', '#FF8C00'],
      xaxis: {
        type: 'category',
        categories: ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '01:00', '01:30'],
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
