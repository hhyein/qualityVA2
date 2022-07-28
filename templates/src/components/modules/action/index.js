import React, { useMemo } from 'react'
import { Box } from "../../Box"
import { useFileData } from '../../../contexts/FileDataContext'
import Correlogram from '../../charts/Correlogram'

export default function Action() {
  const {
    isEmptyData,
    combinationTableData,
  } = useFileData();
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
    <Box title="action">
      {!isEmptyData({ combinationData }) && data.length > 0 && (
        <Correlogram />
      )}
    </Box>
  )
}