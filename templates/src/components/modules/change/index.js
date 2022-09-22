import React from 'react'
import { Box } from '../../Box'
import { useFileData } from '../../../contexts/FileDataContext'
import BarChart from '../../charts/BarChart'
import DensityChart from '../../charts/DensityChart'

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
        <BarChart />
        <DensityChart />
      </>}
    </Box>
  )
}
