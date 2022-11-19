import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts'

export default function HeatmapChart(props) {
  const { label, setRowIndex, setColumnName, setQualityIssueCnt, visualizationData } = props
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
        width: 280,
        height: 220,
        type: 'heatmap',
        events: {
          click: (event, chartContext, config) => {
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
    setRowIndex('');
    setColumnName('');
    setQualityIssueCnt('');
  }, [label])

  return (
    <div className="heatmap-wrapper" />
  )
}
