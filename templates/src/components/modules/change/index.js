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
       <Title title="count" />
        <div style={{ height: '170px' }}>
          <BarChart />
        </div>
        <Title title="distort" />
        <div style={{ position: 'relative', bottom: '20px' }}>
          <DensityChart />
        </div>
      </>}
    </Box>
  )
}
