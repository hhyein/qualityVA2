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

  const [lengthList, setLengthList] = React.useState();
  const [lengthValues, setLengthValues] = React.useState();
  const [actionList, setActionList] = React.useState();
  const [actionValues, setActionValues] = React.useState();
  const [checkedList, setCheckList] = React.useState();

  React.useEffect(() => {
    setLengthList(Array.from({ length: 11 }, (_, i) => ({ label: i, value: i })));
    setCheckList(Array.from({ length: 15 }, (_, i) => i));
    const imgList = ['', 'em', 'knn', 'lof', 'max', 'med', 'men', 'min', 'mod', 'rem', 'log', 'mbs', 'mm', 'rob', 'sqt', 'std'].reduce(
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

  const handleChange = (key, value) => {
    if (key === 'maxLength') {
      setLengthValues(value);
    } else {
      setActionValues(value);
    }
  }

  const handleCheckBox = (checkId) => {
    if (!checkedList.includes(checkId)) {
      setCheckList([...checkedList, checkId]);
    } else {
      setCheckList(checkedList.filter((checkedId) => checkedId !== checkId));
    }
  };


  return (
    <Box title="combination">
      <div style={{ height: '260px' }}>
        {!isEmptyData({ combinationData }) && data.length > 0 && (
          <>
            <div style={{
              display: 'flex',
              marginBottom: '5px'
            }}>
              <div style={{
                width: '46%',
                margin: '0 2%'
              }}>
                <Title title="max length" />
                <Select
                  options={lengthList}
                  placeholder={<div>select</div>}
                  onChange={v => {
                    handleChange('maxLength', v)
                  }}
                />
              </div>
              <div style={{
                width: '46%',
                margin: '0 2%'
              }}>
                <Title title="action" />
                <div class="dropdown">
                  <button class="dropbtn">select</button>
                  <div class="dropdown-content">

                    {actionList && actionList.map((item, idx) => (
                      <div style={{ display: 'flex', height: '25px' }} >
                        {item.label}
                        <input style={{ width: '15px' }} type="checkbox" id="scales" name="scales" checked={checkedList.includes(idx)} onChange={() => handleCheckBox(idx)} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
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
      <style jsx>{`
      .dropbtn {
        background-color: #eee;
        width: 142px;
        height: 38px;
        color: gray;
        border: none;
      }
      .dropdown {
        position: relative;
        display: inline-block;
      }
      .dropdown-content {
        overflow: auto;
        display: none;
        position: absolute;
        background-color: #f1f1f1;
        width: 142px;
        height: 300px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 1;
      }
      .dropdown-content div {
        color: black;
        // height: 38px;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
      }
      .dropdown-content div:hover {
        background-color: #ddd;
      }
      .dropdown:hover .dropdown-content {
        display: block;
      }
      .dropdown:hover .dropbtn {
        background-color: #ddd;
      }
        `}</style>
    </Box>
  )
}
