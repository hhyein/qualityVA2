import React, { useCallback, useMemo } from 'react'
import { Box } from '../../Box'
import CombinationTable from './CombinationTable'
import HorizontalBarChart from '../../charts/HorizontalBarChart'
import { useFileData } from '../../../contexts/FileDataContext'

export default function Improvement() {
  const {
    combinationTableData,
    isEmptyData,
    modelOverviewTableSortingInfo,
    setModelOverviewTableSortingInfo,
    selectedModelOverviewTableRow,
    setSelectedModelOverviewTableRow,
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
    const { column, isAscending } = modelOverviewTableSortingInfo
    if (!column) {
      return []
    }
    const sortedChartTableData = data.sort((a, b) =>
      isAscending
        ? a[column].data - b[column].data
        : b[column].data - a[column].data
    )

    if (
      selectedModelOverviewTableRow === undefined &&
      sortedChartTableData.length > 0
    ) {
      const firstRow = sortedChartTableData[0]
      setSelectedModelOverviewTableRow({
        key: firstRow.key,
        combination: firstRow.combination,
        combinationDetail: firstRow.combinationDetail,
        model: firstRow.model,
      })
    }
    return sortedChartTableData
  }, [modelOverviewTableSortingInfo, data])

  const handleTableHeadClick = useCallback(
    columnName => {
      setModelOverviewTableSortingInfo(prev => ({
        ...prev,
        column: columnName,
      }))
    },
    [setModelOverviewTableSortingInfo]
  )

  return (
    <Box title="improvement" style={{ overflow: 'auto' }}>
      {!isEmptyData({ combinationData }) && data.length > 0 && (
        <CombinationTable
          canSortColumns={combinationData.inputEvalList}
          selectedColumn={modelOverviewTableSortingInfo.column}
          onTableHeadClick={handleTableHeadClick}
          onTableRowClick={params => setSelectedModelOverviewTableRow(params)}
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
    </Box>
  )
}
