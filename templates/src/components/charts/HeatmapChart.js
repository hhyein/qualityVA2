import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts'

export default function HeatmapChart(props) {
  const { label, setCell, setQualityIssueCnt, visualizationData } = props
  const [seriesData, setSeriesData] = React.useState([]);
  const [categoryData, setCategoryData] = React.useState([]);
  const d3 = window.d3v4

  useEffect(() => {
    if(visualizationData) {
      setSeriesData(visualizationData.seriesData)
      setCategoryData(visualizationData.categoryData)
    }
    }, [visualizationData])

  useEffect(() => {
    d3.select('.heatmap-wrapper').selectAll('*').remove()

    var options = {
      series: seriesData,
      chart: {
        toolbar: {
          show: false
        },
        animations: {
          enabled: false
        },
        width: 250,
        height: 220,
        type: 'heatmap',
        events: {
          click: (event, chartContext, config) => {
            if (config.dataPointIndex === -1 || config.seriesIndex === -1) {
              setCell([0, 0]);
              setQualityIssueCnt('');
              return;
            }
            const rowIndex = Number(config.config.series[config.seriesIndex].name.slice(1));
            const columnName = Number(config.config.xaxis.categories[config.dataPointIndex].slice(1));
            const qualityIssueCnt = config.config.series[config.seriesIndex].data[config.dataPointIndex];
            setCell([rowIndex, columnName]);
            setQualityIssueCnt(qualityIssueCnt);
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: categoryData,
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

    }, [seriesData, categoryData])

  useEffect(() => {
    if (visualizationData) {
      const row = Number(visualizationData.seriesData[0].name.slice(1));
      const column = Number(visualizationData.categoryData[0].slice(1));
      setCell([row, column])
      setQualityIssueCnt(visualizationData.seriesData[0].data[0]);
    } else {
      setCell([0, 0])
      setQualityIssueCnt('');
    }
  }, [label])

  return (
    <div className="heatmap-wrapper" />
  )
}
