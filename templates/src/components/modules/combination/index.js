import React, { useCallback, useMemo } from 'react'
import { Box } from '../../Box'
import CombinationTable from './CombinationTable'
import { useFileData } from '../../../contexts/FileDataContext'
import Select from 'react-select'
import Title from '../../Title'

export default function Combination() {
  const {
    isEmptyData,
    combinationTableData,
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

  const [selectList, setSelectList] = React.useState([
    {
      label: 'item0',
      value: 0
    },
    {
      label: 'item1',
      value: 1
    }
  ])

  return (
    <Box title="combination" style={{ overflow: 'auto' }}>
      <div style={{
        height: '260px',
        overflow: 'auto',
        border: 'none'
      }}>
        {!isEmptyData({ combinationData }) && data.length > 0 && (
          <>
            <div style={{
              display: 'flex',
              marginBottom: '10px',
            }}>
              <div style={{
                width: '66%',
                margin: '0 2%'
              }}>
                <Title title="column to purpose" />
                <Select
                  options={selectList}
                  placeholder={<div>select</div>}
                />
              </div>
              <div style={{
                width: '20%',
                marginLeft: '4%',
                marginTop: '20px'
              }}>
            <button
              style={{ width: '70px'}}>submit</button>
              </div>
            </div>
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
              }))}
            />

          </>
        )}
      </div>
    </Box>
  )
}
