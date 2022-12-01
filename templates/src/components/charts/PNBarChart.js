import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts'

export default function PNBarChart(props) {
  const { data } = props
  const d3 = window.d3v4

  useEffect(() => {
    d3.select('.PNbar-wrapper').selectAll('*').remove()

    var options = {
      series: [{
      data: [0.08610236581521998, 0.5736944999046226, -0.01558512944752652, 0.2962295067166269, 0.01376486083701261, 0.8476643757918249, 0.06624478643155432, -0.06004524367676903, 0.05790498550457126, 0.0533358080664225, 0.03717584355855042]
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
              from: 1,
              to: 0,
              color: '#F15B46'
            }, {
              from: 0,
              to: -1,
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
        categories: ['atemp', 'casual', 'cnt', 'holiday', 'hr', 'hum', 'registered', 'temp', 'weathersit', 'weekday', 'windspeed', 'workingday'],
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