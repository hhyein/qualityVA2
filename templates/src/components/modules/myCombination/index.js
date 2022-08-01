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

  const data = useMemo(() => {
    if (!combinationData) {
      return []
    }
    return combinationData.combinationList.map((combination, i) => ({
      key: combination,
      model: combinationData.modelNames[i],
      combination: combinationData.combinationIconList[i],
      combinationDetail: combinationData.combinationDetailIconList[i],
      ...combinationData.inputEvalList.reduce(
        (acc, cur) => ({
          ...acc,
          [cur]: combinationData[cur][i],
        }),
        {}
      ),
    }))
  }, [combinationData])

  return (
    <Box title="my-combination" style={{ overflow: 'auto' }}>
      <div style={{
        height: '130px',
        overflow: 'auto',
        border: 'none'
      }}>
        {!isEmptyData({ combinationData }) && data.length > 0 && (
          <MyCombinationTable />
        )}
      </div>
    </Box>
  )
}
