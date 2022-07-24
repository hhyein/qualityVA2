import React from 'react'
import { Box } from '../../Box'
import DonutChart from '../../charts/DonutChart'
import CheckLegend from '../../charts/CheckLegend'
import HeatmapChart from '../../charts/HeatmapChart'
import HistogramChart from '../../charts/HistogramChart'

const dataColorInfo = {
  missing: "steelblue",
  outlier: "darkorange",
  incons: "darkgreen",
}

export default function Check() {
  return (
    <Box title="check">
      <DonutChart />
      <CheckLegend dataColorInfo={dataColorInfo} />
      <div>text</div>
      <HistogramChart />
    </Box>
  )
}