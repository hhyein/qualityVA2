import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts'

export default function HeatmapChart(props) {
  const { data, label, setRowIndex, setColumnName, setQualityIssueCnt } = props
  const d3 = window.d3v4

  useEffect(() => {
    d3.select('.heatmap-wrapper').selectAll('*').remove()

    var options = {
      series: [{
        name: 'r1',
        data: [0, 47, 66, 23, 34, 17, 88, 46, 48, 23]
        },
        {
          name: 'r2',
          data: [9, 73, 48, 76, 67, 7, 49, 11, 78, 42]
        },
        {
          name: 'r3',
          data: [51, 70, 56, 31, 34, 24, 32, 58, 33, 4]
        },
        {
          name: 'r4',
          data: [8, 90, 39, 63, 16, 49, 90, 17, 62, 36]
        },
        {
          name: 'r5',
          data: [58, 34, 22, 46, 47, 9, 89, 31, 69, 24]
        },
        {
          name: 'r6',
          data: [72, 78, 67, 50, 75, 48, 27, 31, 28, 40]
        },
        {
          name: 'r7',
          data: [40, 85, 11, 38, 26, 37, 22, 33, 64, 85]
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
        type: 'heatmap',
        events: {
          click: (event, chartContext, config) => {
            // 빈 공간 클릭 시
            if (config.dataPointIndex === -1 || config.seriesIndex === -1) {
              setRowIndex('');
              setColumnName('');
              setQualityIssueCnt('');
              return;
            }

            const rowIndex = config.config.series[config.seriesIndex].name;
            const columnName = config.config.xaxis.categories[config.dataPointIndex];
            const qualityIssueCnt = config.config.series[config.seriesIndex].data[config.dataPointIndex];
            setRowIndex(rowIndex);
            setColumnName(columnName);
            setQualityIssueCnt(qualityIssueCnt);
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10'],
        tooltip: {
          enabled: false
        }
      },
      tooltip: {
        x: {
          show: true
        }
      },
      colors: ["#6C757D"]
    };

    var chart = new ApexCharts(document.querySelector(".heatmap-wrapper"), options);
    chart.render();

    }, [data])

  useEffect(() => {
    // 초기화
    setRowIndex('');
    setColumnName('');
    setQualityIssueCnt('');
  }, [label])

  return (
    <div className="heatmap-wrapper" />
  )
}
