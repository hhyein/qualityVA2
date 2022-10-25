import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts'

export default function BarChart(props) {
  const { data, setColumnName, setCorrelation } = props
  const d3 = window.d3v4

  useEffect(() => {
    d3.select('.PNbar-wrapper').selectAll('*').remove()

    var options = {
      series: [{
      name: 'Cash Flow',
      data: [1.45, 5.42, 5.9, -0.42, -12.6, -17.1, -17.2, -14.16, -11.1, -6.09]
    }],
      chart: {
        toolbar: {
          show: false
        },
        animations: {
          enabled: false
        },
        type: 'bar',
        width: 130,
        height: 155,
        events: {
          click: (event, chartContext, config) => {
            // 빈 공간 클릭 시
            if (config.dataPointIndex === -1) {
              setColumnName('');
              setCorrelation('');
              return;
            }

            const columnName = config.config.xaxis.categories[config.dataPointIndex];
            const correlation = config.config.series[0].data[config.dataPointIndex].toFixed(0) + "%";
            setColumnName(columnName);
            setCorrelation(correlation);
          }
        }
      },
      plotOptions: {
        bar: {
          colors: {
            ranges: [{
              from: -100,
              to: -46,
              color: '#F15B46'
            }, {
              from: -45,
              to: 0,
              color: '#FEB019'
            }]
          },
        }
      },
      dataLabels: {
        enabled: false,
      },
      yaxis: {
        labels: {
          formatter: function (y) {
            return y.toFixed(0) + "%";
          }
        }
      },
      xaxis: {
        type: 'category',
        categories: ['column1', 'column2', 'column3', 'column4', 'column5', 'column6', 'column7', 'column8', 'column9', 'column10'],
        labels: {
          show: false
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      }
    };

    var chart = new ApexCharts(document.querySelector(".PNbar-wrapper"), options);
    chart.render();
  
    }, [data])

  return (
    <div className="PNbar-wrapper" />
  )
}