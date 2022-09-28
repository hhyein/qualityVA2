import React, { useState } from 'react'
import { Box } from '../../Box'
import { useFileData } from '../../../contexts/FileDataContext'
import Legend from '../../charts/Legend'
import DonutChart from '../../charts/DonutChart'
import HeatmapChart from '../../charts/HeatmapChart'
import HistogramChart from '../../charts/HistogramChart'
import BoxplotChart from '../../charts/BoxplotChart'
import ScatterChart from '../../charts/ScatterChart'
import RaderChart from '../../charts/RaderChart'
import TreeChart from '../../charts/TreeChart'
import CheckTable from './CheckTable'

const checkDonutData = [
  { label: 0, color: 'darkorange', data: { a: 20, b: 80 } },
  { label: 1, color: 'steelblue', data: { a: 20, b: 80 } },
  { label: 2, color: 'yellowgreen', data: { a: 60, b: 40 } },
  { label: 3, color: 'lightcoral', data: { a: 60, b: 40 } },
  { label: 4, color: 'cadetblue', data: { a: 60, b: 40 } },
]

const legendData = [
  { label: 0, text: 'completeness', color: 'darkorange' },
  { label: 1, text: 'accuracy', color: 'steelblue' },
  { label: 2, text: 'consistency', color: 'yellowgreen' },
  { label: 3, text: 'similarity', color: 'lightcoral' },
  { label: 4, text: 'dependency', color: 'cadetblue' },
]

const metricList = [
  { label: 'completeness', value: 0 },
  { label: 'accuracy', value: 1 },
  { label: 'consistency', value: 2 },
  { label: 'similarity', value: 3 },
  { label: 'dependency', value: 4 },
]

export default function Check() {
  const {
    isEmptyData,
    settingValues,
    selectedLegendIdx,
    setSelectedLegendIdx,
  } = useFileData()

  const [metricValues, setMetricValues] = React.useState({
    label: "completeness",
    value: 0
  });
  const [visualizationList, setVisualizationList] = React.useState([]);


  React.useEffect(() => {
    setMetricValues(metricList[selectedLegendIdx])
  }, [selectedLegendIdx])

  React.useEffect(() => {
    if (metricValues?.label === 'completeness' || metricValues?.label === 'accuracy' || metricValues?.label === 'consistency') {
      setVisualizationList(["HeatmapChart", "HistogramChart"]);
    } else if (metricValues?.label === 'similarity') {
      setVisualizationList(["BoxplotChart"]);
    } else if (metricValues?.label === 'dependency') {
      setVisualizationList(["ScatterChart"]);
    }
  }, [metricValues])

  const chartData = (value) => {
    switch (value) {
      case "HeatmapChart":
        return <HeatmapChart />
      case "HistogramChart":
        return <div style={{
          position: 'relative',
          top: 11
        }}><HistogramChart /></div>
      case "BoxplotChart":
        return <BoxplotChart />
      case "ScatterChart":
        return <ScatterChart />
      default:
        return
    }
  }

  return (
    <Box title="check">
      {!isEmptyData({
        settingValues
      }) && settingValues.model && <>
          <div style={{ display: 'flex', height: '250px' }}>
            <div style={{ width: '440px' }}>
              <div style={{
                position: 'absolute',
                top: 58,
                left: 0,
                display: 'grid',
                gridTemplateColumns: visualizationList.length >= 2 ? 'auto auto' : 'auto'
              }}>
                {visualizationList.map((chart, idx) => {
                  return (
                    <div key={idx} class='chart' style={visualizationList.length >= 2 ? { width: 220, height: 230 } : { width: 440, height: 230 }} >
                      {chartData(chart)}
                    </div>
                  )
                })}
              </div>
              <div style={{ 
                width: '200px', 
                display: 'flex',
                position: 'absolute' 
                }}>
                <Legend
                  onLegendClick={setSelectedLegendIdx}
                  dataColorInfo={legendData}
                />
                {checkDonutData.map((donutData, idx) => (
                  <div style={{ margin: '5px 3px 0' }} key={idx}>
                    <DonutChart
                      donutData={donutData}
                    />
                  </div>
                ))}
              </div>
            </div>
            <CheckTable />
            <div style={{ display: 'flex' }}>
              <RaderChart />
              <div style={{ overflowY: 'scroll' }}>
                <TreeChart />
              </div>
            </div>
          </div>
        </>}
    </Box>
  )
}
