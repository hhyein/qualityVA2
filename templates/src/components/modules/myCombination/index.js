import React, { useCallback, useMemo } from 'react'
import { Box } from '../../Box'
import MyCombinationTable from './MyCombinationTable'
import { useFileData } from '../../../contexts/FileDataContext'

export default function MyCombination() {
  const {
    isEmptyData,
    combinationTableData,
  } = useFileData()
  const { combinationData } = combinationTableData

  const data = [{
    key: 1,
    combination: ['transformation'],
    combinationDetail: ['mm', 'std'],
  },
]

  return (
    <Box title="my-combination">
      <div style={{ height: '130px' }}>
        {!isEmptyData({ combinationData }) && data.length > 0 && (
          <MyCombinationTable data={data} />
        )}
      </div>
    </Box>
  )
}
