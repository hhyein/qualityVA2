import React from 'react'
import { Box } from '../../Box'
import { useFileData } from '../../../contexts/FileDataContext'
import HeatmapChart from '../../charts/HeatmapChart'
import HistogramChart from '../../charts/HistogramChart'
import BoxplotChart from '../../charts/BoxplotChart'
import ScatterChart from '../../charts/ScatterChart'
import RaderChart from '../../charts/RaderChart'
import TreeChart from '../../charts/TreeChart'
import CheckTable from './CheckTable'

export default function Check() {
  const {
    isEmptyData,
    settingValues,
    selectedLegendIdx,
  } = useFileData()

  const metricList = [
    { label: 'completeness', value: 0 },
    { label: 'accuracy', value: 1 },
    { label: 'consistency', value: 2 },
    { label: 'similarity', value: 3 },
    { label: 'dependency', value: 4 },
  ]

  const [metricValues, setMetricValues] = React.useState({
    label: "completeness",
    value: 0
  });

  React.useEffect(() => {
    setMetricValues(metricList[selectedLegendIdx]);
  }, [selectedLegendIdx])

  const [visualizationList, setVisualizationList] = React.useState([]);

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
        return <HistogramChart />
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
          <div style={{ display: 'flex', height: '230px' }}>
            <div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: visualizationList.length >= 2 ? 'auto auto' : 'auto'
              }}>
                {visualizationList.map((chart, idx) => {
                  return (
                    <div key={idx} style={visualizationList.length >= 2 ? { width: 220, height: 230 } : { width: 440, height: 230 }} >
                      {chartData(chart)}
                    </div>
                  )
                })}
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
