import React from 'react'
import Select from 'react-select'
import Title from '../../Title'
import { Box } from '../../Box'
import { useFileData } from '../../../contexts/FileDataContext'
import Legend from '../../charts/Legend'
import DonutChart from '../../charts/DonutChart'
import HeatmapChart from '../../charts/HeatmapChart'
import HistogramChart from '../../charts/HistogramChart'
import BoxplotChart from '../../charts/BoxplotChart'
import PNBarChart from '../../charts/PNBarChart'
import ScatterChart from '../../charts/ScatterChart'
import RaderChart from '../../charts/RaderChart'
import TreeChart from '../../charts/TreeChart'
import CheckTable from './CheckTable'

// api: /donutChart
// data: {'donutChartData': [{'label': 0, 'color': 'darkorange', 'data': {'issue': 1, 'normal': 99}}, {'label': 1, 'color': 'steelblue', 'data': {'issue': 1, 'normal': 99}}, {'label': 2, 'color': 'yellowgreen', 'data': {'issue': 0, 'normal': 100}}, {'label': 3, 'color': 'lightcoral', 'data': {'issue': 60, 'normal': 40}}, {'label': 4, 'color': 'cadetblue', 'data': {'issue': 60, 'normal': 40}}]}
const checkDonutData = [
  { label: 0, color: 'darkorange', data: { issue: 20, normal: 80 } },
  { label: 1, color: 'steelblue', data: { issue: 20, normal: 80 } },
  { label: 2, color: 'yellowgreen', data: { issue: 60, normal: 40 } },
  { label: 3, color: 'lightcoral', data: { issue: 60, normal: 40 } },
  { label: 4, color: 'cadetblue', data: { issue: 60, normal: 40 } },
]

const legendData = [
  { label: 0, text: 'completeness', color: 'darkorange' },
  { label: 1, text: 'accuracy', color: 'steelblue' },
  { label: 2, text: 'consistency', color: 'yellowgreen' },
  { label: 3, text: 'similarity', color: 'lightcoral' },
  { label: 4, text: 'dependency', color: 'cadetblue' },
]

const metricList = [
  { label: 'completeness', value: 0 },
  { label: 'accuracy', value: 1 },
  { label: 'consistency', value: 2 },
  { label: 'similarity', value: 3 },
  { label: 'dependency', value: 4 },
]

export default function Check() {
  const {
    isEmptyData,
    settingValues,
    selectedLegendIdx,
    setSelectedLegendIdx,
    modelSettingData: { columnList }
  } = useFileData()

  const [metricValues, setMetricValues] = React.useState({
    label: "completeness",
    value: 0
  });
  const [visualizationList, setVisualizationList] = React.useState([]);


  React.useEffect(() => {
    setMetricValues(metricList[selectedLegendIdx])
  }, [selectedLegendIdx])

  React.useEffect(() => {
    if (metricValues?.label === 'completeness' || metricValues?.label === 'consistency') {
      setVisualizationList(["HeatmapChart"]);
    } else if (metricValues?.label == 'accuracy') {
      setVisualizationList(["HistogramChart"]);
    } else if (metricValues?.label === 'similarity') {
      setVisualizationList(["BoxplotChart"]);
    } else if (metricValues?.label === 'dependency') {
      setVisualizationList(["ScatterChart"]);
    }
  }, [metricValues])

  const chartData = (value) => {
    switch (value) {
      case "HeatmapChart":
        return <div style={{ display: 'flex' }}>
          <HeatmapChart />
          <div style={{ position: 'relative', right: 10 }}>
            <div style={{ width: 165, height: 95, border: '1px solid #999999', marginTop: 30 }}>
              <div style={{ position: 'absolute', top: 20, left: 10, backgroundColor: '#fff', paddingLeft: 5, paddingRight: 5 }}>information</div>
              <div style={{ marginTop: 15 }}>
                <p>row index</p>
                <p>column name</p>
                <p>quality issue cnt</p>
              </div>
            </div>
            <div style={{ width: 165, height: 65, border: '1px solid #999999', marginTop: 15 }}>
              <div style={{ position: 'absolute', top: 130, left: 10, backgroundColor: '#fff', paddingLeft: 5, paddingRight: 5 }}>quality issue</div>
              <div style={{ marginTop: 15, display: 'flex' }}>
                <p>row index</p>
                <p>value</p>
              </div>
            </div>
          </div>
        </div>

      case "HistogramChart":
        return <div style={{ display: 'flex' }}>
          <div>
            <div style={{ display: 'flex', marginTop: 20, marginRight: 10 }}>
              <div style={{
                width: '45%',
                margin: '0 5%'
                }}>
                <Title title="column" />
                <Select
                  options={columnList}
                  placeholder={<div>select</div>}
                />
              </div>
              <div style={{ width: '45%' }}>
                <Title title="outlier" />
                <Select
                  placeholder={<div>select</div>}
                />
              </div>
            </div>
            <div style={{ position: 'relative', bottom: 15 }}>
              <HistogramChart />
            </div>
          </div>
          <div>
            <div style={{ width: 175, height: 95, border: '1px solid #999999', marginTop: 30 }}>
              <div style={{ position: 'absolute', top: 20, left: 270, backgroundColor: '#fff', paddingLeft: 5, paddingRight: 5 }}>information</div>
              <div style={{ marginTop: 15 }}>
                <p>outlier standard</p>
                <p>quality issue cnt</p>
              </div>
            </div>
            <div style={{ width: 175, height: 65, border: '1px solid #999999', marginTop: 15 }}>
              <div style={{ position: 'absolute', top: 130, left: 270, backgroundColor: '#fff', paddingLeft: 5, paddingRight: 5 }}>quality issue</div>
              <div style={{ marginTop: 15, display: 'flex' }}>
                <p>row index</p>
                <p>value</p>
              </div>
            </div>
          </div>
        </div>

      case "BoxplotChart":
        return <div style={{ display: 'flex' }}>
          <BoxplotChart />
          <div>
            <div style={{ width: 155, height: 80, border: '1px solid #999999', marginTop: 30 }}>
              <div style={{ position: 'absolute', top: 20, left: 290, backgroundColor: '#fff', paddingLeft: 5, paddingRight: 5 }}>information</div>
              <div style={{ marginTop: 15 }}>
                <p>column name</p>
                <p>mix</p>
                <p>max</p>
              </div>
            </div>
            <div style={{ width: 155, height: 80, border: '1px solid #999999', marginTop: 15 }}>
              <div style={{ position: 'absolute', top: 115, left: 290, backgroundColor: '#fff', paddingLeft: 5, paddingRight: 5 }}>quality issue</div>
              <div style={{ marginTop: 15 }}>
                <p>column name</p>
                <p>minDiff</p>
                <p>maxDiff</p>
              </div>
            </div>
          </div>
        </div>

        case "ScatterChart":
          return <div style={{ display: 'flex' }}>
            <div style={{ width: 100, height: 175, marginTop: 20, marginLeft: 10, marginRight: 10 }}>
              <Title title="column" />
              <Select
                options={columnList}
                placeholder={<div>select</div>}
              />
              <Title title="correlation" />
              <Select
                placeholder={<div>select</div>}
              />
              <Title title="threshold" />
              <Select
                placeholder={<div>select</div>}
              />
            </div>
            <div style={{ width: 315, height: 165, border: '1px solid #999999', marginTop: 30 }}>
              <div style={{ position: 'absolute', top: 30, left: 130, backgroundColor: '#fff', paddingLeft: 5, paddingRight: 5 }}>information & quality issue</div>
              <div style={{ marginTop: 15 }}>
                <p>column name</p>
                <p>correlation</p>
              </div>
              <div style={{ display: 'flex', position: 'relative', bottom: 15 }}>
                <PNBarChart />
                <div style={{ position: 'relative', right: 10 }}>
                  <ScatterChart />
                </div>
              </div>
            </div>
          </div>

      default:
        return
    }
  }

  return (
    <Box title="check">
      {!isEmptyData({
        settingValues
      }) && settingValues.model && <>
          <div style={{ display: 'flex', height: '250px' }}>
            <div style={{ width: '440px' }}>
              <div style={{ 
                width: '200px', 
                display: 'flex'
                }}>
                <Legend
                  onLegendClick={setSelectedLegendIdx}
                  dataColorInfo={legendData}
                />
                {checkDonutData.map((donutData, idx) => (
                  <div style={{ margin: '5px 3px 0' }} key={idx}>
                    <DonutChart
                      donutData={donutData}
                    />
                  </div>
                ))}
              </div>
              <div style={{
                position: 'absolute',
                top: 60,
                left: 0,
              }}>
                {visualizationList.map((chart, idx) => {
                  return (
                    <div key={idx} class='chart' style={visualizationList.length >= 2 ? { width: 220, height: 230 } : { width: 440, height: 230 }} >
                      {chartData(chart)}
                    </div>
                  )
                })}
              </div>
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
