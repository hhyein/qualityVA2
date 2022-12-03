import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts'

export default function ScatterChart(props) {
  const { data } = props
  const d3 = window.d3v4

  useEffect(() => {
    if (!data || !data.notSelectSeriesData || !data.selectSeriesData)
      return

    d3.select('.rowScatter-wrapper').selectAll('*').remove()

    var options = {
      series: [
        {
          name: "notSelect",
          data: data.notSelectSeriesData
        }, {
          name: "select",
          data: data.selectSeriesData
        }
      ],
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
