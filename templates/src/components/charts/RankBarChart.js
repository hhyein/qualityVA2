import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts'

export default function BarChart(props) {
  const { data, setColumnName, setRank, setScore } = props
  const d3 = window.d3v4

  useEffect(() => {
    d3.select('.rankBar-wrapper').selectAll('*').remove()

    var options = {
      series: [{
        data: [400, 430, 448, 470, 540, 580, 690, 110, 120, 180]
      }],
      chart: {
        toolbar: {
          show: false
        },
        animations: {
          enabled: false
        },
        width: 250,
        height: 220,
        type: 'bar',
        events: {
          click: (event, chartContext, config) => {
            // 빈 공간 클릭 시
            if (config.dataPointIndex === -1) {
              setColumnName('');
              setRank('');
              setScore('');
              return;
            }

            const columnName = config.config.xaxis.categories[config.dataPointIndex];
            const score = config.config.series[0].data[config.dataPointIndex];
            setColumnName(columnName);
            setRank(config.dataPointIndex+1);
            setScore(score);
          }
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['S. Korea', 'Canada', 'UK', 'NL', 'Italy', 'France', 'Japan',
          'US', 'China', 'Germany'
        ],
      }
    };

    var chart = new ApexCharts(document.querySelector(".rankBar-wrapper"), options);
    chart.render();
  
    }, [data])

  return (
    <div className="rankBar-wrapper" style={{ marginTop: '-20px' }} />
  )
}