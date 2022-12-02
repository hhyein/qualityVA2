import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts'

export default function ScatterChart(props) {
  const { data } = props
  const d3 = window.d3v4

  useEffect(() => {
    d3.select('.rowScatter-wrapper').selectAll('*').remove()

    var options = {
      series: [{
      name: "not selected",
      data: [
      [16.4, 5.4], [21.7, 2], [25.4, 3], [19, 2], [10.9, 1], [13.6, 3.2], [10.9, 7.4], [10.9, 0], [10.9, 8.2], [16.4, 0], [16.4, 1.8], [13.6, 0.3], [13.6, 0], [29.9, 0], [27.1, 2.3], [16.4, 0], [13.6, 3.7], [10.9, 5.2], [16.4, 6.5], [10.9, 0], [24.5, 7.1], [10.9, 0], [8.1, 4.7], [19, 0], [21.7, 1.8], [27.1, 0], [24.5, 0], [27.1, 0], [29.9, 1.5], [27.1, 0.8], [22.1, 2]]
      }, {
        name: "selected",
        data: [
        [10.4, 5.4]]
      }],
      chart: {
        toolbar: {
          show: false
        },
        animations: {
          enabled: false
        },
        height: 220,
        type: 'scatter',
        zoom: {
          enabled: true,
          type: 'xy'
        }
      },
      legend: {
        show: false
      },
      tooltip: {
        enabled: false
      },
      markers: {
        size: [5, 5]
      },
      xaxis: {
        labels: {
          show: false
        }
      },
      yaxis: {
        labels: {
          show: false
        }
      }
    };

    var chart = new ApexCharts(document.querySelector(".rowScatter-wrapper"), options);
    chart.render();

    }, [data])

  return (
    <div className="rowScatter-wrapper" style={{ position: 'relative', bottom: 10 }} />
  )
}
