import React from 'react'
import { Box } from '../../Box'
import { useFileData } from '../../../contexts/FileDataContext'
import ColumnSummaryChart from '../../charts/ColumnSummaryChart'

export default function ColumnSummary() {
  const {
    isEmptyData,
    settingValues
  } = useFileData()

  return (
    <Box title="column-summary">
      {!isEmptyData({
        settingValues
      }) && settingValues.model && <>
        <ColumnSummaryChart />
      </>}
    </Box>
  )
}