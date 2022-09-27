import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts'

export default function ColumnHistogramChart(props) {
  const { data } = props
  const d3 = window.d3v4

  useEffect(() => {
    d3.select('.columnHistogram-wrapper').selectAll('*').remove()

    var options = {
      series: [{
      name: 'Inflation',
      data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
    }],
      chart: {
        toolbar: {
          show: false
        },
        animations: {
          enabled: false
        },
        height: 180,
        type: 'bar',
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      },
      colors: ["#6c757d"]
    };

    var chart = new ApexCharts(document.querySelector(".columnHistogram-wrapper"), options);
    chart.render();

  }, [data])

  return (
    <div className="columnHistogram-wrapper" style={{ position: 'relative', bottom: 30 }} />
  )
}
