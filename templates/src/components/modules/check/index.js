import React, { useMemo, useState } from 'react'
import { Box } from '../../Box'
import { useFileData } from '../../../contexts/FileDataContext'
import DonutChart from '../../charts/DonutChart'
import HeatmapChart from '../../charts/HeatmapChart'
import HistogramChart from '../../charts/HistogramChart'

const exampleDonutData = [
  { label: 'missing', data: { a: 20, b: 80 } },
  { label: 'outlier', data: { a: 20, b: 80 } },
  { label: 'inconsistent', data: { a: 60, b: 40 } },
]

export default function Check() {
  const {
    isEmptyData,
    combinationTableData,
  } = useFileData();
  const [selectedLegendIdx, setSelectedLegendIdx] = useState(0)

  const legendDetail = useMemo(() => {
    switch (selectedLegendIdx) {
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
  }, [selectedLegendIdx])

  return (
    <Box title="check">
      {!isEmptyData({
        combinationTableData
      }) && <>
        <DonutChart
          data={exampleDonutData}
          selectedLegendIdx={selectedLegendIdx}
          onLegendClick={setSelectedLegendIdx}
        />
        {legendDetail.chart}
      </>}
    </Box>
  )
}
