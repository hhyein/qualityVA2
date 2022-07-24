import React from 'react'
import { Box } from '../../Box'
import DonutChart from '../../charts/DonutChart'
import HeatmapChart from '../../charts/HeatmapChart'
import HistogramChart from '../../charts/HistogramChart'

export default function Check() {
  return (
    <Box title="check">
      <DonutChart />
      <div>text</div>
      <HistogramChart />
    </Box>
  )
}