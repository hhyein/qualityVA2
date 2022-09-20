import React, { useMemo, useState } from 'react'
import { Box } from '../../Box'
import { useFileData } from '../../../contexts/FileDataContext'
import TreeChart from '../../charts/TreeChart'
import HeatmapChart from '../../charts/HeatmapChart'
import HistogramChart from '../../charts/HistogramChart'
import LineChart from '../../charts/LineChart'
import RaderChart from '../../charts/RaderChart'
import Select from 'react-select'
import Title from '../../Title'

export default function Check() {
  const {
    isEmptyData,
    dataSettingValues,
    modelSettingValues,
    distortSettingValues,
  } = useFileData()

  const metricList = [
    { label: 'missing', value: 0},
    { label: 'outlier', value: 1},
    { label: 'inconsistent', value: 2},
  ]

  const [metricValues, setMetricValues] = React.useState({
    label: "missing",
    value: 0
  });

  const [visualizationList, setVisualizationList] = React.useState();
  const [visualizationValues, setVisualizationValues] = React.useState({
    label: "HeatmapChart",
    value: 0
  });

  React.useEffect(() => {
    if (metricValues?.label === 'missing') {
      setVisualizationList([{
        label: "HeatmapChart",
        value: 0
      }]);
    } else if (metricValues?.label === 'outlier') {
      setVisualizationList([{
        label: "HistogramChart",
        value: 0
      }]);
    } else if (metricValues?.label === 'inconsistent') {
      setVisualizationList([{
        label: "HistogramChart",
        value: 0
      }]);
    }
  }, [metricValues])

  const handleChange = (key, value) => {
    if (key === 'metric') {
      setMetricValues(value);
    } else {
      setVisualizationValues(value);
    }
  }

  const detailChart = useMemo(() => {
    switch (visualizationValues?.label) {
      case "HeatmapChart":
        return {
          chart: <HeatmapChart />,
        }
      case "HistogramChart":
        return {
          chart: <HistogramChart />,
        }
      default:
        return {
          chart: <HistogramChart />,
        }
    }
  }, [visualizationValues])

  return (
    <Box title="check">
      {!isEmptyData({
        dataSettingValues,
        modelSettingValues,
        distortSettingValues
      }) && <>
          <div style={{ display: 'flex', height: '370px' }}>
            <div style={{ width: '300px', margin: '0 25px 0 5px' }}>
              <div style={{
                display: 'flex',
              }}>
                <div style={{
                  width: '47.5%',
                  marginRight: '5%'
                }}>
                  <Title title="metric" />
                  <Select
                    options={metricList}
                    placeholder={<div>select</div>}
                    defaultValue={metricValues}
                    onChange={v => {
                      handleChange('metric', v)
                    }}
                  />
                </div>
                <div style={{
                  width: '47.5%',
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
              {detailChart.chart}
            </div>

            <div>
              <div style={{ display: 'flex' }}>
                <LineChart />
                <RaderChart />
              </div>
            </div>
            <div style={{ overflowY: 'scroll' }}>
              <TreeChart />
            </div>
          </div>
        </>}
    </Box>
  )
}
