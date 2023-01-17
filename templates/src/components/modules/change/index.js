import React from 'react'
import { Box } from '../../Box'
import { useFileData } from '../../../contexts/FileDataContext'
import BarChart from '../../charts/BarChart'
import DensityChart from '../../charts/DensityChart'
import LineChart from '../../charts/LineChart'
import Title from '../../Title'

export default function Change() {
  const {
    isEmptyData,
    settingValues,
    changeCntData,
    changeDistortData
  } = useFileData()
  
  return (
    <Box title="change">
      {!isEmptyData({
        settingValues
      }) && settingValues.model && <>
        <Title title="count" />
        <div style={{ position: 'relative', bottom: '10px', height: '130px' }}>
          { changeCntData && <BarChart data={changeCntData} /> }
        </div>
        <Title title="distort" />
        <div style={{ position: 'relative', bottom: '15px', height: '125px', left: -5 }}>
          { changeDistortData && <DensityChart data={changeDistortData} /> }
        </div>
        <Title title="model performance" />
        <div style={{ position: 'relative', bottom: '-10px', left: -5 }}>
          <LineChart />
        </div>
      </>}
    </Box>
  )
}
