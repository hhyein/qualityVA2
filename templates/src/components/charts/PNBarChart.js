import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts'

export default function PNBarChart(props) {
  const { data } = props
  const d3 = window.d3v4

  useEffect(() => {
    if (!data)
      return;

    d3.select('.PNbar-wrapper').selectAll('*').remove()

    var options = {
      series: [{
        data: data.seriesData
      }],
      chart: {
        toolbar: {
          show: false
        },
        animations: {
          enabled: false
        },
        type: 'bar',
        width: 230,
        height: 215,
      },
      plotOptions: {
        bar: {
          colors: {
            ranges: [{
              to: -0.8,
              color: '#128FD9'
            }, {
              from: -0.8,
              to: 0.8,
              color: '#6C757D'
            }, {
              from: 0.8,
              color: '#D91212'
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
            return y.toFixed(2) + "%";
          }
        },
        min: -1,
        max: 1
      },
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
      }
    };

    var chart = new ApexCharts(document.querySelector(".PNbar-wrapper"), options);
    chart.render();
  
    }, [data])

  return (
    <div className="PNbar-wrapper" />
  )
}