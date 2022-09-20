import React, { useState } from 'react'
import { Box } from '../../Box'
import { useFileData } from '../../../contexts/FileDataContext'
import Legend from '../../charts/Legend'
import DonutChart from '../../charts/DonutChart'

const checkDonutData = [
  { label: 0, color: 'darkorange', data: { a: 20, b: 80 } },
  { label: 1, color: 'steelblue', data: { a: 20, b: 80 } },
  { label: 2, color: 'yellowgreen', data: { a: 60, b: 40 } },
  { label: 3, color: 'lightcoral', data: { a: 60, b: 40 } },
  { label: 4, color: 'darkgray', data: { a: 60, b: 40 } },
]

const legendData = [
  { label: 0, text: 'missing', color: 'darkorange' },
  { label: 1, text: 'outlier', color: 'steelblue' },
  { label: 2, text: 'inconsistent', color: 'yellowgreen' },
  { label: 3, text: 'similarity', color: 'lightcoral' },
  { label: 4, text: 'dependency', color: 'darkgray' },
]

export default function Summary() {
  const {
    isEmptyData,
    settingValues,
    selectedLegendIdx,
    setSelectedLegendIdx,
  } = useFileData()

  const [donutData, setDonutData] = useState();

  React.useEffect(() => {
    setDonutData(checkDonutData[selectedLegendIdx])
  }, [selectedLegendIdx])

  return (
    <Box title="summary">
      {!isEmptyData({
        settingValues
      }) && settingValues.model && <>
          <div style={{ width: '200px', display: 'flex' }}>
            <Legend
              onLegendClick={setSelectedLegendIdx}
              dataColorInfo={legendData}
            />
            <div style={{ margin: '0 15px' }}>
              <DonutChart
                donutData={donutData}
              />
            </div>
          </div>
        </>

      }
    </Box>
  )
}
