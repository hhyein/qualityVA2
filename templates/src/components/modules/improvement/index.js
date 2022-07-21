import React, { useCallback, useMemo } from 'react'
import { Box } from '../../Box'
import CombinationTable from './CombinationTable'
import HorizontalBarChart from '../../charts/HorizontalBarChart'
import { useFileData } from '../../../contexts/FileDataContext'

export default function Improvement() {
  const {
    combinationTableData,
    isEmptyData,
    combinationTableSortingInfo,
    setCombinationTableSortingInfo,
    selectedCombinationTableRow,
    setSelectedCombinationTableRow,
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

  const sortedData = useMemo(() => {
    const { column, isAscending } = combinationTableSortingInfo
    if (!column) {
      return []
    }
    const sortedChartTableData = data.sort((a, b) =>
      isAscending
        ? a[column].data - b[column].data
        : b[column].data - a[column].data
    )

    if (
      selectedCombinationTableRow === undefined &&
      sortedChartTableData.length > 0
    ) {
      const firstRow = sortedChartTableData[0]
      setSelectedCombinationTableRow({
        key: firstRow.key,
        combination: firstRow.combination,
        combinationDetail: firstRow.combinationDetail,
        model: firstRow.model,
      })
    }
    return sortedChartTableData
  }, [combinationTableSortingInfo, data])

  const handleTableHeadClick = useCallback(
    columnName => {
      setCombinationTableSortingInfo(prev => ({
        ...prev,
        column: columnName,
      }))
    },
    [setCombinationTableSortingInfo]
  )

  return (
    <Box title="improvement" style={{ overflow: 'auto' }}>
      <div style={{
        height: '200px',
        overflow: 'auto',
        border: 'none'
      }}>
        {!isEmptyData({ combinationData }) && data.length > 0 && (
          <CombinationTable
            canSortColumns={combinationData.inputEvalList}
            selectedColumn={combinationTableSortingInfo.column}
            onTableHeadClick={handleTableHeadClick}
            onTableRowClick={params => setSelectedCombinationTableRow(params)}
            data={sortedData.map(d => ({
              key: d.key,
              ...['model'].reduce(
                (acc, cur) => ({
                  ...acc,
                  [cur]: d[cur],
                }),
                {}
              ),
              ...['combination', 'combinationDetail'].reduce(
                (acc, cur) => ({
                  ...acc,
                  [cur]: (
                    <div style={{ display: 'flex' }}>
                      {d[cur].map(imgName => (
                        <img
                          src={require(`../../icons/${imgName}.png`)}
                          alt={''}
                          style={{ height: '25px', width: '25px' }}
                        />
                      ))}
                    </div>
                  ),
                }),
                {}
              ),
              ...combinationData.inputEvalList.reduce(
                (acc, cur, j) => ({
                  ...acc,
                  [cur]: (
                    <HorizontalBarChart
                      data={[d[cur]]}
                      colorCode={['lightcoral', 'mediumturquoise', 'sienna'][j]}
                    />
                  ),
                }),
                {}
              ),
            }))}
          />
        )}
      </div>
    </Box>
  )
}
