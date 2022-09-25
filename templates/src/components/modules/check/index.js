import React, { useMemo, useState } from 'react'
import { Box } from '../../Box'
import { useFileData } from '../../../contexts/FileDataContext'
import HeatmapChart from '../../charts/HeatmapChart'
import HistogramChart from '../../charts/HistogramChart'
import BoxplotChart from '../../charts/BoxplotChart'
import ScatterChart from '../../charts/ScatterChart'
import RaderChart from '../../charts/RaderChart'
import TreeChart from '../../charts/TreeChart'
import Select from 'react-select'
import Title from '../../Title'
import CheckTable from './checkTable'

export default function Check() {
  const {
    isEmptyData,
    settingValues,
    selectedLegendIdx,
  } = useFileData()

  const metricList = [
    { label: 'completeness', value: 0 },
    { label: 'accuracy', value: 1 },
    { label: 'consistency', value: 2 },
    { label: 'similarity', value: 3 },
    { label: 'dependency', value: 4 },
  ]

  const [metricValues, setMetricValues] = React.useState({
    label: "completeness",
    value: 0
  });

  React.useEffect(() => {
    setMetricValues(metricList[selectedLegendIdx]);
  }, [selectedLegendIdx])

  const [visualizationList, setVisualizationList] = React.useState([]);
  // const [visualizationValues, setVisualizationValues] = React.useState({
  //   label: "HeatmapChart",
  //   value: 0
  // });

  React.useEffect(() => {
    if (metricValues?.label === 'completeness' || metricValues?.label === 'accuracy' || metricValues?.label === 'consistency') {
      setVisualizationList(["HeatmapChart", "HistogramChart", "BoxplotChart", "ScatterChart"]);
    } else if (metricValues?.label === 'similarity') {
      setVisualizationList(["BoxplotChart"]);
    } else if (metricValues?.label === 'dependency') {
      setVisualizationList(["ScatterChart"]);
    }
  }, [metricValues])


  // const handleChange = (key, value) => {
  //   if (key === 'metric') {
  //     setMetricValues(value);
  //   } else {
  //     setVisualizationValues(value);
  //   }
  // }

  const chartData = (value) => {
    switch (value) {
      case "HeatmapChart":
        return <HeatmapChart />
      case "HistogramChart":
        return <HistogramChart />
      case "BoxplotChart":
        return <BoxplotChart />
      case "ScatterChart":
        return <ScatterChart />
      default:
        return
    }
  }

  // const detailChart = useMemo(() => {
  //   switch (visualizationValues?.label) {
  //     case "HeatmapChart":
  //       return {
  //         chart: <HeatmapChart />,
  //       }
  //     case "HistogramChart":
  //       return {
  //         chart: <HistogramChart />,
  //       }
  //     case "BoxplotChart":
  //       return {
  //         chart: <BoxplotChart />,
  //       }
  //     case "ScatterChart":
  //       return {
  //         chart: <ScatterChart />,
  //       }
  //     default :
  //       return {
  //         chart: <></>,
  //       }
  //   }
  // }, [visualizationValues])

  return (
    <Box title="check">
      {!isEmptyData({
        settingValues
      }) && settingValues.model && <>
          <div style={{ display: 'flex', height: '280px' }}>
            <div style={{ width: '450px', margin: '0 25px 0 5px' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: visualizationList.length >= 2 ? 'auto auto' : 'auto'
              }}>
                {visualizationList.map((chart, idx) => {
                  return (
                    <div key={idx} style={visualizationList.length >= 2 ? { width: 225, height: 100 } : { width: 450, height: 200 }} >
                      {chartData(chart)}
                    </div>
                  )
                })}
              </div>
              {/* <div style={{
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
              </div> */}
              {/* {detailChart.chart} */}
            </div>
            <CheckTable />
            <div style={{ display: 'flex' }}>
              <RaderChart />
              <div style={{ overflowY: 'scroll' }}>
                <TreeChart />
              </div>
            </div>
          </div>
        </>}
    </Box>
  )
}
