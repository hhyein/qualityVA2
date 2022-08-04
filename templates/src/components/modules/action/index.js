import React, { useMemo } from 'react'
import Select from 'react-select'
import Title from '../../Title'
import { Box } from "../../Box"
import { useFileData } from '../../../contexts/FileDataContext'
import Correlogram from '../../charts/Correlogram'
import HeatmapChart from '../../charts/HeatmapChart'
import HistogramChart from '../../charts/HistogramChart'

export default function Action() {
  const {
    isEmptyData,
    combinationTableData,
    selectedCombinationTableRow,
  } = useFileData();
  const { combinationData } = combinationTableData
  const [combinationList, setCombinationList] = React.useState();
  const [combinationValues, setCombinationValues] = React.useState({
    label: "transformation",
    value: 0
  });
  const [visualizationList, setVisualizationList] = React.useState();
  const [visualizationValues, setVisualizationValues] = React.useState({
    label: "HistogramChart",
    value: 0
  });

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
    if (key) {
      setCombinationValues();
      setCombinationList(combinationData.combinationIconList[key].map((item, idx) => {
        return {
          label: item,
          value: idx
        }
      }))
    }
  }, [combinationData, selectedCombinationTableRow?.key])

  React.useEffect(() => {
    if (combinationValues?.label === 'missing') {
      setVisualizationList([{
        label: "HeatmapChart",
        value: 0
      }]);
    } else {
      setVisualizationList([{
        label: "HistogramChart",
        value: 0
      }]);
    }
  }, [combinationValues])

  const handleChange = (key, value) => {
    if (key === 'combination') {
      setCombinationValues(value);
    } else {
      setVisualizationValues(value);
    }
  }

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
                defaultValue={combinationValues}
                onChange={v => {
                  handleChange('combination', v)
                }}
              />
            </div>
            <div style={{
              width: '46%',
              margin: '0 2%'
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
            </div>
          </div>
          {visualizationValues?.label === 'HeatmapChart'
            ? <Correlogram />
            // <HeatmapChart /> 
            : <HistogramChart />
          }
        </React.Fragment>
      )}
    </Box>
  )
}