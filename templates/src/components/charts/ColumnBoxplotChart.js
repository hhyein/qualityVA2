import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts'
import { useFileData } from '../../contexts/FileDataContext'

export default function BoxplotChart(props) {
  const {
    columnDatas,
    checkTableData
  } = useFileData();

  const { data } = props
  const d3 = window.d3v4

  useEffect(() => {
    let x_label = "idx " + checkTableData.data;
    if (checkTableData.key === "col") {
      x_label = columnDatas[0][checkTableData.data].slice(0, 5);
    }
    console.log(x_label)

    d3.select('.boxplot-wrapper').selectAll('*').remove()

    var options = {
      series: [
      {
        data: [
          {
            x: x_label,
            y: [54, 66, 69, 75, 88]
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
        height: 90,
        type: 'boxPlot'
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
        colors: ['#6c757d']
      }
    };

    var chart = new ApexCharts(document.querySelector(".boxplot-wrapper"), options);
    chart.render();

    }, [data, checkTableData])

  return (
    <div className="boxplot-wrapper" style={{ position: 'relative', bottom: 10 }} />
  )
}