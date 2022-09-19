import React, { useMemo } from 'react'
import Select from 'react-select'
import Title from '../../Title'
import { Box } from "../../Box"
import { useFileData } from '../../../contexts/FileDataContext'
import Combination from './combination'
import Correlogram from '../../charts/Correlogram'
import HistogramChart from '../../charts/HistogramChart'
import LineChart from '../../charts/LineChart'

export default function Action() {
  const {
    isEmptyData,
    combinationTableData,
    selectedCombinationTableRow,
    setMyCombinationData,
    modelSettingData: { columnList },
  } = useFileData();
  const { combinationData } = combinationTableData
  const [actionList, setActionList] = React.useState();
  const [actionValues, setActionValues] = React.useState({
    label: "transformation",
    value: 0
  });
  // const [visualizationList, setVisualizationList] = React.useState();
  // const [visualizationValues, setVisualizationValues] = React.useState({
  //   label: "HistogramChart",
  //   value: 0
  // });

  const [columnValues, setColumnValues] = React.useState();

  const [radioValue, setRadioValue] = React.useState('recommend');
  const handleChangeRadio = (e) => {
    setRadioValue(e.target.value);
  }

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
    if (radioValue === 'new') {
      setActionList(['transformation', 'missing', 'outlier', 'inconsistent'].map((item, idx) => {
        return {
          label: item,
          value: idx
        }
      }))
      setMyCombinationData('transformation');
    } else {
      const key = selectedCombinationTableRow?.key;
      if (key) {
        setActionValues();
        setMyCombinationData();
        setActionList(combinationData.combinationIconList[key].map((item, idx) => {
          return {
            label: item,
            value: idx
          }
        }))
      }
    }
  }, [combinationData, selectedCombinationTableRow?.key, radioValue])

  React.useEffect(() => {
    // if (combinationValues?.label === 'transformation') {
    //   setVisualizationList([{
    //     label: "HeatmapChart",
    //     value: 0
    //   }]);
    // } else if (combinationValues?.label === 'missing') {
    //   setVisualizationList([{
    //     label: "HistogramChart",
    //     value: 0
    //   }]);
    // } else if (combinationValues?.label === 'outlier') {
    //   setVisualizationList([{
    //     label: "scatter plot",
    //     value: 0
    //   }]);
    // } else if (combinationValues?.label === 'inconsistent') {
    //   setVisualizationList([{
    //     label: "line chart",
    //     value: 0
    //   }]);
    // }
    if (radioValue === 'new') {
      setMyCombinationData(actionValues.label);
    }
  }, [actionValues])

  const handleChange = (key, value) => {
    if (key === 'combination') {
      setActionValues(value);
    } else {
      setColumnValues(prev => ({
        ...prev,
        [key]: value,
      }))
      // setVisualizationValues(value);
    }
  }

  return (
    <Box title="action">
      {!isEmptyData({ combinationData }) && data.length > 0 && (
        <React.Fragment>
          <div style={{
            display: 'flex',
            height: '20px',
            marginBottom: '5px',
          }}>
            {['recommend', 'new'].map((item) => (
              <div key={item} style={{ width: '50%', display: 'flex', alignItems: 'center' }}>
                <input
                  type='radio'
                  name='radio'
                  value={item}
                  style={{ marginRight: '15px' }}
                  onClick={handleChangeRadio}
                  checked={radioValue === item}
                />
                {item}
              </div>
            ))}
          </div>
          {radioValue === 'recommend' && <Combination />}
          {radioValue === 'new' &&
            <div style={{
              display: 'flex',
            }}>
              <div style={{
                width: '47.5%',
                marginRight: '5%'
              }}>
                <Title title="action" />
                <Select
                  options={actionList}
                  placeholder={<div>select</div>}
                  defaultValue={actionValues}
                  onChange={v => {
                    handleChange('action', v)
                  }}
                />
              </div>
              <div style={{
                width: '47.5%',
              }}>
                <React.Fragment>
                  <Title title="actionDetail" />
                  <Select
                    isMulti
                    options={columnList}
                    placeholder={<div>select</div>}
                    defaultValue={columnValues}
                    onChange={v => {
                      handleChange('column', v)
                    }}
                  />
                </React.Fragment>
              </div>

              {/* <div style={{
              width: '40%',
            }}>
              <React.Fragment>
                <Title title="visualization" />
                <Select
                  options={visualizationList}
                  placeholder={<div>select</div>}
                  defaultValue={visualizationValues}
                  onChange={v => {
                    handleChange('visualization', v)
                  }}
                />
              </React.Fragment>
            </div> */}
            </div>
          }
          {/* {visualizationValues?.label === 'HeatmapChart' && <Correlogram />}
          {visualizationValues?.label === 'HistogramChart' && <HistogramChart />}
          {visualizationValues?.label === 'scatter plot' && <Correlogram />}
          {visualizationValues?.label === 'line chart' && <LineChart />} */}
        </React.Fragment>
      )}
    </Box>
  )
}