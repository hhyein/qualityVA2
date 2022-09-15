import React, { useMemo, useState } from 'react'
import { Box } from '../../Box'
import { useFileData } from '../../../contexts/FileDataContext'
import Legend from '../../charts/Legend'
import DonutChart from '../../charts/DonutChart'
import HeatmapChart from '../../charts/HeatmapChart'
import HistogramChart from '../../charts/HistogramChart'
import CheckTable from './checkTable'

const exampleDonutData = [{ a: 20, b: 80 }, { a: 20, b: 80 }, { a: 60, b: 40 }]
const exampleDonutColors = ['steelblue', 'darkorange', 'darkgreen']

export default function Check() {
  const {
    isEmptyData,
    dataSettingValues,
    modelSettingValues,
    distortSettingValues
  } = useFileData()

  const [selectedDonutIdx, setSelectedDonutIdx] = useState(0)
  const detailChart = useMemo(() => {
    switch (selectedDonutIdx) {
      case 0:
        return {
          chart: <HeatmapChart />,
        }
      case 1:
        return {
          chart: <HistogramChart />,
        }
      default:
        return {
          chart: <HistogramChart />,
        }
    }
  }, [selectedDonutIdx])

  return (
    <Box title="check">
      {!isEmptyData({
        dataSettingValues,
        modelSettingValues,
        distortSettingValues
      }) && <>
        <Legend />
        <DonutChart
          data={exampleDonutData[0]}
          color={exampleDonutColors[0]}
        />
        
        <div style={{ display: 'flex' }}>
          {detailChart.chart}
          <CheckTable />
        </div>
      </>}
    </Box>
  )
}
