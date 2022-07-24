import React, { useMemo, useState } from 'react'
import { Box } from '../../Box'
import DonutChart from '../../charts/DonutChart'
import HeatmapChart from '../../charts/HeatmapChart'
import HistogramChart from '../../charts/HistogramChart'

const exampleDonutData = [
  { label: 'missing', data: { a: 20, b: 80 } },
  { label: 'outlier', data: { a: 20, b: 80 } },
  { label: 'inconsistent', data: { a: 60, b: 40 } },
]

export default function Check() {
  const [selectedLegendIdx, setSelectedLegendIdx] = useState(0)

  const legendDetail = useMemo(() => {
    switch (selectedLegendIdx) {
      case 0:
        return {
          text: 'Legend1의 텍스트',
          chart: <HeatmapChart />,
        }
      case 1:
        return {
          text: 'Legend2의 텍스트',
          chart: <HistogramChart />,
        }
      default:
        return {
          text: 'Legend3의 텍스트',
          chart: <HistogramChart />,
        }
    }
  }, [selectedLegendIdx])

  return (
    <Box title="check">
      <DonutChart
        data={exampleDonutData}
        selectedLegendIdx={selectedLegendIdx}
        onLegendClick={setSelectedLegendIdx}
      />
      <div style={{ border: '1px var(--grey-100) solid', padding: '8px' }}>
        {legendDetail.text}
      </div>
      {legendDetail.chart}
    </Box>
  )
}
