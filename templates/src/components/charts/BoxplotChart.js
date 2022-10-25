import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts'

export default function BoxplotChart(props) {
  const { data, setColumnName, setMin, setMax } = props
  const d3 = window.d3v4

  useEffect(() => {
    d3.select('.boxplot-wrapper').selectAll('*').remove()

    var options = {
      series: [
      {
        data: [
          {
            x: 'column 1',
            y: [54, 66, 69, 75, 88]
          },
          {
            x: 'column 2',
            y: [43, 65, 69, 76, 81]
          },
          {
            x: 'column 3',
            y: [31, 39, 45, 51, 59]
          },
          {
            x: 'column 4',
            y: [39, 46, 55, 65, 71]
          },
          {
            x: 'column 5',
            y: [29, 31, 35, 39, 44]
          }
        ]
      }
    ],
      chart: {
        toolbar: {
          show: false
        },
        animations: {
          enabled: false
        },
        width: 280,
        height: 220,
        type: 'boxPlot',
        events: {
          click: (event, chartContext, config) => {
            // 빈 공간 클릭 시
            if (config.dataPointIndex === -1) {
              setColumnName('');
              setMin('');
              setMax('');
              return;
            }

            const columnName = config.config.series[0].data[config.dataPointIndex].x;
            const min = config.config.series[0].data[config.dataPointIndex].y[0];
            const max = config.config.series[0].data[config.dataPointIndex].y[4];
            setColumnName(columnName);
            setMin(min);
            setMax(max);
          }
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '50%'
        },
        boxPlot: {
          colors: {
            upper: '#e9ecef',
            lower: '#f8f9fa'
          }
        }
      },
      stroke: {
        colors: ['#6C757D']
      }
    };

    var chart = new ApexCharts(document.querySelector(".boxplot-wrapper"), options);
    chart.render();

    }, [data])

  return (
    <div className="boxplot-wrapper" />
  )
}
