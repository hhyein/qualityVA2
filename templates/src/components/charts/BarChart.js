import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts'

export default function BarChart(props) {
  const { data } = props
  const d3 = window.d3v4

  useEffect(() => {
    d3.select('.bar-wrapper').selectAll('*').remove()

    var options = {
      series: [{
      name: 'before',
      data: [44, 55, 41]
    }, {
      name: 'after',
      data: [53, 32, 33]
    }],
      chart: {
        toolbar: {
          show: false
        },
        animations: {
          enabled: false
        },
        type: 'bar',
        height: 180
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: 'top',
          },
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['#fff']
      },
      tooltip: {
        shared: true,
        intersect: false
      },
      xaxis: {
        categories: ['row', 'column', 'instance']
      },
      legend: {
        position: 'top',
        markers: {
          radius: 10
        },
        onItemClick: {
          toggleDataSeries: false
        },
        onItemHover: {
          highlightDataSeries: false
        }
      }
    };

    var chart = new ApexCharts(document.querySelector(".bar-wrapper"), options);
    chart.render();
  
    }, [data])

  return (
    <div className="bar-wrapper" />
  )
}