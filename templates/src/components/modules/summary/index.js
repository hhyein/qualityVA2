import React from 'react'
import { Box } from '../../Box'
import { useFileData } from '../../../contexts/FileDataContext'
import Legend from '../../charts/Legend'
import DonutChart from '../../charts/DonutChart'

const checkDonutData = [
  { label: 0, color: 'steelblue', data: { a: 20, b: 80 } },
  { label: 1, color: 'darkorange', data: { a: 20, b: 80 } },
  { label: 2, color: 'darkgreen', data: { a: 60, b: 40 } },
]

const legendData = [
  { label: 0, text: 'missing', color: 'steelblue' },
  { label: 1, text: 'outlier', color: 'darkorange' },
  { llabel: 2,text: 'inconsistent', color: 'darkgreen' },
]

export default function Summary() {
  const {
    isEmptyData,
    settingValues,
    setSelectedLegendIdx,
  } = useFileData()

  return (
    <Box title="summary">
      {!isEmptyData({
       settingValues
      }) && settingValues.model && <>
          <div style={{ width: '200px' }}>
            <Legend
              onLegendClick={setSelectedLegendIdx}
              dataColorInfo={legendData}
            />
            <div style={{ display: 'flex' }}>
              {checkDonutData.map((donutData, idx) => (
                <div key={idx} style={{ margin: '0 25px 0 0' }}>
                  <DonutChart
                    data={donutData.data}
                    color={donutData.color}
                    idx={idx}
                  />
                </div>
              ))}
            </div>
          </div>
        </>

      }
    </Box>
  )
}
