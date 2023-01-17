import React from 'react'
import { Box } from '../../Box'
import { useFileData } from '../../../contexts/FileDataContext'
import BarChart from '../../charts/BarChart'
import DensityChart from '../../charts/DensityChart'
import HorizontalBarChart from '../../charts/HorizontalBarChart'
import Title from '../../Title'

export default function Change() {
  const {
    isEmptyData,
    settingValues,
    changeCntData,
    changeDistortData,
    changePerformanceData
  } = useFileData()
  
  return (
    <Box title="change">
      {!isEmptyData({
        settingValues
      }) && settingValues.model && <>
        <Title title="count" />
        <div style={{ position: 'relative', bottom: '15px', height: '125px' }}>
          { changeCntData && <BarChart data={changeCntData} /> }
        </div>
        <Title title="distort" />
        <div style={{ position: 'relative', bottom: '15px', height: '115px', left: -5 }}>
          { changeDistortData && <DensityChart data={changeDistortData} /> }
        </div>
        <Title title="model performance" />
        <div style={{ position: 'relative' }}>
          { changePerformanceData && <HorizontalBarChart data={changePerformanceData} /> }
        </div>
      </>}
    </Box>
  )
}
