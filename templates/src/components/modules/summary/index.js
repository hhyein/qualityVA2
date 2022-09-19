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
  { text: 'missing', color: 'steelblue' },
  { text: 'outlier', color: 'darkorange' },
  { text: 'inconsistent', color: 'darkgreen' },
]

export default function Summary() {
  const {
    isEmptyData,
    dataSettingValues,
    modelSettingValues,
    distortSettingValues,
    setSelectedLegendIdx
  } = useFileData()

  return (
    <Box title="summary">
      {!isEmptyData({
        dataSettingValues,
        modelSettingValues,
        distortSettingValues
      }) && <>
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
