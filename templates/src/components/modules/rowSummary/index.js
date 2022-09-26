import React from 'react'
import { Box } from '../../Box'
import { useFileData } from '../../../contexts/FileDataContext'
import RowSummaryChart from '../../charts/RowSummaryChart'

export default function RowSummary() {
  const {
    isEmptyData,
    settingValues
  } = useFileData()

  return (
    <Box title="row-summary">
      {!isEmptyData({
        settingValues
      }) && settingValues.model && <>
        <RowSummaryChart />
      </>}
    </Box>
  )
}