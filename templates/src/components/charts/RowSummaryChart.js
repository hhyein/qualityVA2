import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts'

export default function RowSummaryChart(props) {
  const { data } = props
  const d3 = window.d3v4

  useEffect(() => {
    d3.select('.row-wrapper').selectAll('*').remove()

    var options = {
      series: [
        {
          name: 'r1',
          data: [0, 47, 66]
        },
        {
          name: 'r2',
          data: [9, 73, 48]
        },
        {
          name: 'r3',
          data: [51, 70, 56]
        },
        {
          name: 'r4',
          data: [8, 90, 39]
        },
        {
          name: 'r5',
          data: [58, 34, 22]
        },
        {
          name: 'r6',
          data: [0, 47, 66]
        },
        {
          name: 'r7',
          data: [9, 73, 48]
        },
        {
          name: 'r8',
          data: [51, 70, 56]
        },
        {
          name: 'r9',
          data: [8, 90, 39]
        },
        {
          name: 'r10',
          data: [58, 34, 22]
        },
        {
          name: 'r11',
          data: [0, 47, 66]
        },
        {
          name: 'r12',
          data: [9, 73, 48]
        },
        {
          name: 'r13',
          data: [51, 70, 56]
        },
        {
          name: 'r14',
          data: [8, 90, 39]
        }
      ],
      chart: {
        toolbar: {
          show: false
        },
        animations: {
          enabled: false
        },
        width: 100,
        height: 460,
        type: 'heatmap',
      },
      dataLabels: {
        enabled: false
      },
      colors: ['#FF8C00', '#4682B4', '#94CD32'],
      plotOptions: {
        heatmap: {
          colorScale: {
            inverse: true
          }
        }
      },
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
      }
    };

    var chart = new ApexCharts(document.querySelector(".row-wrapper"), options);
    chart.render();

    }, [data])

  return (
    <div className="row-wrapper" />
  )
}
