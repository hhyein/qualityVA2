import React, { useMemo } from 'react'
import Select from 'react-select'
import Title from '../../Title'
import { Box } from "../../Box"
import { useFileData } from '../../../contexts/FileDataContext'
import Correlogram from '../../charts/Correlogram'

export default function Action() {
  const {
    isEmptyData,
    combinationTableData,
    selectedCombinationTableRow,
  } = useFileData();
  const { combinationData } = combinationTableData
  const [combinationList, setCombinationList] = React.useState();
  const [combinationDetailList, setCombinationDetailList] = React.useState();
  const [combinationValues, setCombinationValues] = React.useState();

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

  React.useEffect(() => {
    const key = selectedCombinationTableRow?.key;
      if(key) {
        console.log(key);
        setCombinationValues();
        setCombinationList(combinationData.combinationIconList[key].map((item, idx) => {
          return {
            label: item,
            value: idx
          }
        }))
        setCombinationDetailList(combinationData.combinationDetailIconList[key].map((item, idx) => {
          return {
            label: item,
            value: idx
          }
        }))
      }
  }, [combinationData, selectedCombinationTableRow?.key])

  const handleChange = (key, value) => {
    setCombinationValues(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  // console.log(combinationValues);

  return (
    <Box title="action">
      {!isEmptyData({ combinationData }) && data.length > 0 && (
        <React.Fragment>
          <div style={{
            display: 'flex',
          }}>
            <div style={{
              width: '46%',
              margin: '0 2%'
            }}>
              <Title title="combination" />
              <Select
                options={combinationList}
                placeholder={<div>select</div>}
                onChange={v => {
                  handleChange('combination', v)
                }}
              />
            </div>
            <div style={{
              width: '46%',
              margin: '0 2%'
            }}>
              <Title title="combinationDetail" />
              <Select
                options={combinationDetailList}
                placeholder={<div>select</div>}
                onChange={v => {
                  handleChange('combinationDetail', v)
                }}
              />
            </div>
          </div>
          <Correlogram />
        </React.Fragment>
      )}
    </Box>
  )
}