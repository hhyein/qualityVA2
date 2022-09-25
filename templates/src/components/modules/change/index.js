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
  } = useFileData()

  return (
    <Box title="change">
      {!isEmptyData({
        settingValues
      }) && settingValues.model && <>
        <div style={{ padding: '0 10px', fontSize: '15px' }}>
          <Title title="count" />
        </div>
        <div style={{ height: '170px' }}>
          <BarChart />
        </div>
        <div style={{ padding: '5px 10px 0 10px', fontSize: '15px' }}>
          <Title title="distort" />
        </div>
        <div style={{ position: 'relative', bottom: '20px' }}>
          <DensityChart />
        </div>
      </>}
    </Box>
  )
}
