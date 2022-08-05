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

  // const data = useMemo(() => {
  //   if (!combinationData) {
  //     return []
  //   }
  //   return combinationData.combinationList.map((combination, i) => ({
  //     key: combination,
  //     model: combinationData.modelNames[i],
  //     combination: combinationData.combinationIconList[i],
  //     combinationDetail: combinationData.combinationDetailIconList[i],
  //     ...combinationData.inputEvalList.reduce(
  //       (acc, cur) => ({
  //         ...acc,
  //         [cur]: combinationData[cur][i],
  //       }),
  //       {}
  //     ),
  //   }))
  // }, [combinationData])

  const data = [{
    key: 1,
    model: "knn",
    combination: ['transformation'],
    combinationDetail: ['mm', 'std'],
  },
  // {
  //   key: 2,
  //   model: "knn",
  //   combination: ['transformation'],
  //   combinationDetail: ['mm', 'std'],
  // }
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
