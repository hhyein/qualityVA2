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
          data: [0, 47, 66, 23, 34]
        },
        {
          name: 'r2',
          data: [9, 73, 48, 76, 67]
        },
        {
          name: 'r3',
          data: [51, 70, 56, 31, 34]
        },
        {
          name: 'r4',
          data: [8, 90, 39, 63, 16]
        },
        {
          name: 'r5',
          data: [58, 34, 22, 46, 47]
        },
        {
          name: 'r6',
          data: [0, 47, 66, 23, 34]
        },
        {
          name: 'r7',
          data: [9, 73, 48, 76, 67]
        },
        {
          name: 'r8',
          data: [51, 70, 56, 31, 34]
        },
        {
          name: 'r9',
          data: [8, 90, 39, 63, 16]
        },
        {
          name: 'r10',
          data: [58, 34, 22, 46, 47]
        },
        {
          name: 'r11',
          data: [0, 47, 66, 23, 34]
        },
        {
          name: 'r12',
          data: [9, 73, 48, 76, 67]
        },
        {
          name: 'r13',
          data: [51, 70, 56, 31, 34]
        },
        {
          name: 'r14',
          data: [8, 90, 39, 63, 16]
        },
        {
          name: 'r15',
          data: [58, 34, 22, 46, 47]
        },
        {
          name: 'r16',
          data: [0, 47, 66, 23, 34]
        },
        {
          name: 'r17',
          data: [9, 73, 48, 76, 67]
        },
        {
          name: 'r18',
          data: [51, 70, 56, 31, 34]
        },
        {
          name: 'r19',
          data: [8, 90, 39, 63, 16]
        },
        {
          name: 'r20',
          data: [58, 34, 22, 46, 47]
        }
      ],
      chart: {
        toolbar: {
          show: false
        },
        animations: {
          enabled: false
        },
        height: 350,
        type: 'heatmap',
      },
      dataLabels: {
        enabled: false
      },
      colors: ['#FF8C00', '#4682B4', '#94CD32', '#F08080', '#5F9EA0'],
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
      },
      grid: {
        padding: {
          right: 20
        }
      }
    };

    var chart = new ApexCharts(document.querySelector(".row-wrapper"), options);
    chart.render();

    }, [data])

  return (
    <div className="row-wrapper" style={{ position: 'relative', bottom: 15 }} />
  )
}
