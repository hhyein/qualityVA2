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
    setSelectedCombinationTableRow
  } = useFileData()
  const { combinationData } = combinationTableData

  const [lengthList, setLengthList] = React.useState();
  const [lengthValues, setLengthValues] = React.useState();
  const [actionList, setActionList] = React.useState();
  const [checkedList, setCheckList] = React.useState();
  const imgNameList = ['', 'em', 'lof', 'max', 'med', 'men', 'min', 'mod', 'rem', 'log', 'mbs', 'mm', 'rob', 'sqt', 'std'];

  React.useEffect(() => {
    setLengthList(Array.from({ length: 11 }, (_, i) => ({ label: i, value: i })));
    setCheckList(imgNameList);
    const imgList = imgNameList.reduce(
      (acc, cur) => ({
        ...acc,
        [cur]: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {[cur].map(imgName => (
              <img
                src={require(`../../icons/${imgName}.png`)}
                alt={''}
                style={{ height: '25px', width: '25px' }}
              />
            ))}
          </div>
        ),
      }),
    )
    setActionList(Object.values(imgList).map((chart, idx) => (
      {
        label: <>{chart}</>,
        value: idx
      }
    )))
  }, [])

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
        combinationDetail: firstRow.combinationDetail
      })
    }
    return sortedChartTableData
  }, [combinationTableSortingInfo, data, selectedCombinationTableRow, setSelectedCombinationTableRow])

  const handleTableHeadClick = useCallback(
    columnName => {
      setCombinationTableSortingInfo(prev => ({
        ...prev,
        column: columnName,
      }))
    },
    [setCombinationTableSortingInfo]
  )

  const handleChange = (key, value) => {
    setLengthValues(value);
  }

  const handleCheckBox = (checkName) => {
    if (!checkedList.includes(checkName)) {
      setCheckList([...checkedList, checkName]);
    } else {
      setCheckList(checkedList.filter((item) => item !== checkName));
    }
  };

  return (
    <React.Fragment>
      {!isEmptyData({ combinationData }) && data.length > 0 && (
        <>
          <div style={{
            display: 'flex',
            marginBottom: '5px'
          }}>
            <div style={{
              width: '45%',
              margin: '0 2.5%'
            }}>
              <Title title="length" />
              <Select
                options={lengthList}
                placeholder={<div>select</div>}
                onChange={v => {
                  handleChange('maxLength', v)
                }}
              />
            </div>
            <div style={{
              width: '45%',
              margin: '0 2.5%',
            }}>
              <Title title="action" />
              <div class="dropdown" style={{ marginLeft: '10px' }} >
                <button class="dropbtn">select</button>
                <div class="dropdown-content">

                  {actionList && actionList.map((item, idx) => (
                    <div style={{ display: 'flex', height: '25px' }} >
                      {item.label}
                      <input style={{ width: '15px' }} type="checkbox" id="scales" name="scales" checked={checkedList.includes(imgNameList[idx + 1])} onChange={() => handleCheckBox(imgNameList[idx + 1])} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div style={{ overflow: 'auto', height: '60%' }}>
            <CombinationTable
              canSortColumns={combinationData.inputEvalList}
              selectedColumn={combinationTableSortingInfo.column}
              onTableHeadClick={handleTableHeadClick}
              onTableRowClick={params => setSelectedCombinationTableRow(params)}
              selectedKey={selectedCombinationTableRow?.key}
              lengthValues={lengthValues}
              checkedList={checkedList}
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
              filterList={sortedData.map((item) => (
                {
                  key: item.key,
                  combination: item.combination,
                  combinationDetail: item.combinationDetail,
                }
              ))}
            />
          </div>
        </>
      )}
    </React.Fragment>
  )
}
