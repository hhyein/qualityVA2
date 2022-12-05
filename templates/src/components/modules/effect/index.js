import React from 'react'
import { Box } from '../../Box'
import { useFileData } from '../../../contexts/FileDataContext'
import RangeChart from '../../charts/RangeChart'

export default function Effect() {
  const {
    isEmptyData,
    settingValues,
    qualityImpact
  } = useFileData()

  return (
    <Box title="effect">
      {!isEmptyData({
        settingValues
      }) && settingValues.model && <>
        {/* <RangeChart data={qualityImpact} /> */}
      </>}
    </Box>
  )
}
