import React from 'react'
import { Box } from '../../Box'
import { useFileData } from '../../../contexts/FileDataContext'
import BarChart from '../../charts/BarChart'
import DensityChart from '../../charts/DensityChart'
import Title from '../../Title'

export default function Change() {
  const {
    isEmptyData,
    settingValues,
    changeCntData,
    changeDistortData
  } = useFileData()

  if (typeof changeCntData === 'undefined') {
    return <></>
  }
  
  return (
    <Box title="change">
      {!isEmptyData({
        settingValues
      }) && settingValues.model && <>
        <Title title="count" />
        <div style={{ position: 'relative', bottom: '10px', height: '130px' }}>
          <BarChart data={changeCntData} />
        </div>
        <Title title="distort" />
        <div style={{ position: 'relative', bottom: '15px' }}>
          <DensityChart data={changeDistortData} />
        </div>
      </>}
    </Box>
  )
}
