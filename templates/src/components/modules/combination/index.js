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
    <Box title="combination">
      <div style={{ height: '260px' }}>
        {!isEmptyData({ combinationData }) && data.length > 0 && (
          <>
            <div style={{ display: 'flex', marginBottom: '10px' }}>
                <Select
                  options={selectList}
                  placeholder={<div>select</div>}
                />
                <Select
                  options={selectList}
                  placeholder={<div>select</div>}
                />
                <Select
                  options={selectList}
                  placeholder={<div>select</div>}
                />
            </div>
            <div style={{ overflow: 'auto', height: '100%' }}>
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
            </div>
          </>
        )}
      </div>
    </Box>
  )
}
