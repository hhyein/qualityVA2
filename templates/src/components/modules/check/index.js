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

const outlierList = [
  { label: 'statical based', value: 0 },
  { label: 'ML based', value: 1 }
];

const correlationList = [
  { label: 'person', value: 0 },
  { label: 'kendall', value: 1 },
  { label: 'spearman', value: 2 }
];

const thresholdList = [
  { label: 0.1, value: 0 },
  { label: 0.5, value: 1 },
  { label: 1, value: 2 }
];

const data = [
  ['Model', 'MAE', 'MSE', 'RMSE', 'R2', 'RMSLE', 'MAPE'],
  ['et', 0.462, 0.351, 0.571, 0.548, 0.042, 0.036],
  ['br', 0.504, 0.399, 0.616, 0.489, 0.045, 0.04],
  ['ada', 0.479, 0.399, 0.604, 0.483, 0.044, 0.038],
  ['rf', 0.488, 0.42, 0.611, 0.475, 0.045, 0.039],
  ['ridge', 0.509, 0.402, 0.618, 0.474, 0.045, 0.04],
  ['lr', 0.519, 0.415, 0.629, 0.456, 0.046, 0.041],
  ['gbr', 0.527, 0.447, 0.648, 0.417, 0.047, 0.042],
  ['lightgbm', 0.516, 0.46, 0.652, 0.417, 0.047, 0.041],
  ['en', 0.544, 0.482, 0.673, 0.396, 0.049, 0.043],
  ['lar', 0.55, 0.489, 0.667, 0.349, 0.049, 0.043],
  ['lasso', 0.593, 0.552, 0.72, 0.31, 0.053, 0.047],
  ['knn', 0.637, 0.598, 0.758, 0.232, 0.055, 0.05],
  ['omp', 0.641, 0.647, 0.787, 0.164, 0.057, 0.051],
  ['dt', 0.619, 0.685, 0.789, 0.134, 0.058, 0.049],
  ['llar', 0.759, 0.806, 0.887, -0.058, 0.064, 0.06],
  ['dummy', 0.759, 0.806, 0.887, -0.058, 0.064, 0.06],
  ['huber', 0.768, 0.958, 0.95, -0.308, 0.07, 0.061],
  ['par', 1.346, 2.972, 1.654, -3.23, 0.116, 0.105]
];

export default function Check() {
  const {
    isEmptyData,
    settingValues,
    selectedLegendIdx,
    setSelectedLegendIdx,
    modelSettingData: { columnList },
    donutChartData,
    treeChartData,
    visualizationData,
    updateVisualizationData
  } = useFileData()

  console.log(visualizationData)

  const [metricValues, setMetricValues] = React.useState({
    label: "completeness",
    value: 0
  });
  const [visualizationList, setVisualizationList] = React.useState([]);
  const [completenessRowIndex, setCompletenessRowIndex] = React.useState('');
  const [completenessColumnName, setCompletenessColumnName] = React.useState('');
  const [completenessQualityIssueCnt, setCompletenessQualityIssueCnt] = React.useState('');
  const [similarityColumnName, setSimilarityColumnName] = React.useState('');
  const [similarityMin, setSimilarityMin] = React.useState('');
  const [similarityMax, setSimilarityMax] = React.useState('');
  const [dependencyColumnName, setDependencyColumnName] = React.useState('');
  const [dependencyCorrelation, setDependencyCorrelation] = React.useState('');
  const [dataList, setDataList] = React.useState();
  const [dataIndex, setDataIndex] = React.useState();
  const [checkTableData, setCheckTableData] = React.useState([1]);
  const [renderChartData, setRenderChartData] = React.useState([{
    key: 1,
    name: 'et',
    data: [0.461, 0.351, 0.571, 0.548, 0.042, 0.036],
  }]);

  React.useEffect(() => {
    setMetricValues(metricList[selectedLegendIdx])
  }, [selectedLegendIdx])

  React.useEffect(() => {
    if (treeChartData) {
      setDataList(treeChartData.map(d => (
        <div style={{ display: 'flex' }}>
          {d.map(imgName => (
            <img
              src={require(`../../icons/${imgName}.png`)}
              alt={''}
              style={{ height: '25px', width: '25px' }}
            />
          ))}
        </div>
      )));
    }
  }, [treeChartData])

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
          <HeatmapChart
            label={metricValues?.label}
            setRowIndex={setCompletenessRowIndex}
            setColumnName={setCompletenessColumnName}
            setQualityIssueCnt={setCompletenessQualityIssueCnt}
          />
          <div style={{ position: 'relative', right: 10 }}>
            <div style={{ width: 165, height: 95, border: '1px solid #999999', marginTop: 30 }}>
              <div style={{ position: 'absolute', top: 20, left: 10, fontSize: 13, backgroundColor: '#fff', paddingLeft: 5, paddingRight: 5 }}>information</div>
              <div style={{ marginTop: 10 }}>
                <p>row index {completenessRowIndex}</p>
                <p>column name {completenessColumnName}</p>
                <p>quality issue cnt {completenessQualityIssueCnt}</p>
              </div>
            </div>
            <div style={{ width: 165, height: 60, border: '1px solid #999999', marginTop: 15 }}>
              <div style={{ position: 'absolute', top: 135, left: 10, fontSize: 13, backgroundColor: '#fff', paddingLeft: 5, paddingRight: 5 }}>quality issue</div>
              <div style={{ marginTop: 10, display: 'flex' }}>
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
                <Select className="select"
                  options={columnList}
                  placeholder={<div>select</div>}
                />
              </div>
              <div style={{ width: '45%' }}>
                <Title title="outlier" />
                <Select className="select"
                  options={outlierList}
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
              <div style={{ position: 'absolute', top: 20, left: 270, fontSize: 13, backgroundColor: '#fff', paddingLeft: 5, paddingRight: 5 }}>information</div>
              <div style={{ marginTop: 10 }}>
                <p>outlier standard</p>
                <p>quality issue cnt</p>
              </div>
            </div>
            <div style={{ width: 175, height: 60, border: '1px solid #999999', marginTop: 15 }}>
              <div style={{ position: 'absolute', top: 135, left: 270, fontSize: 13, backgroundColor: '#fff', paddingLeft: 5, paddingRight: 5 }}>quality issue</div>
              <div style={{ marginTop: 10, display: 'flex' }}>
                <p>row index</p>
                <p>value</p>
              </div>
            </div>
          </div>
        </div>

      case "BoxplotChart":
        return <div style={{ display: 'flex' }}>
          <BoxplotChart
            setColumnName={setSimilarityColumnName}
            setMin={setSimilarityMin}
            setMax={setSimilarityMax}
          />
          <div>
            <div style={{ width: 155, height: 80, border: '1px solid #999999', marginTop: 30 }}>
              <div style={{ position: 'absolute', top: 20, left: 290, fontSize: 13, backgroundColor: '#fff', paddingLeft: 5, paddingRight: 5 }}>information</div>
              <div style={{ marginTop: 10 }}>
                <p>column name {similarityColumnName}</p>
                <p>mix {similarityMin}</p>
                <p>max {similarityMax}</p>
              </div>
            </div>
            <div style={{ width: 155, height: 75, border: '1px solid #999999', marginTop: 15 }}>
              <div style={{ position: 'absolute', top: 120, left: 290, fontSize: 13, backgroundColor: '#fff', paddingLeft: 5, paddingRight: 5 }}>quality issue</div>
              <div style={{ marginTop: 10 }}>
                <p>column name</p>
                <p>minDiff</p>
                <p>maxDiff</p>
              </div>
            </div>
          </div>
        </div>

      case "ScatterChart":
        return <div style={{ display: 'flex' }}>
          <div style={{ width: 100, height: 175, marginTop: 25, marginLeft: 10, marginRight: 10 }}>
            <Title title="column" />
            <Select className="select"
              options={columnList}
              placeholder={<div>select</div>}
            />
            <Title title="correlation" />
            <Select className="select"
              options={correlationList}
              placeholder={<div>select</div>}
            />
            <Title title="threshold" />
            <Select className="select"
              options={thresholdList}
              placeholder={<div>select</div>}
            />
          </div>
          <div style={{ width: 315, height: 175, border: '1px solid #999999', marginTop: 30 }}>
            <div style={{ position: 'absolute', top: 20, left: 130, fontSize: 13, backgroundColor: '#fff', paddingLeft: 5, paddingRight: 5 }}>information & quality issue</div>
            <div style={{ marginTop: 10 }}>
              <p>column name {dependencyColumnName}</p>
              <p>correlation {dependencyCorrelation}</p>
            </div>
            <div style={{ display: 'flex', position: 'relative', bottom: 15 }}>
              <PNBarChart
                setColumnName={setDependencyColumnName}
                setCorrelation={setDependencyCorrelation}
              />
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
      }) && settingValues.model && <div style={{
        display: 'flex',
        width: '440px'
      }}>
          <div style={{ display: 'flex', height: '250px' }}>
            <div style={{ width: '440px' }}>
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
            <div style={{
              width: '200px',
              display: 'flex',
              position: 'absolute',
              top: 10,
              left: 10,
            }}>
              <Legend
                onLegendClick={setSelectedLegendIdx}
                dataColorInfo={legendData}
              />
              {donutChartData && donutChartData.donutChartData.map((donutData, idx) => (
                <div style={{ margin: '5px 3px 0' }} key={idx}>
                  <DonutChart
                    donutData={donutData}
                  />
                </div>
              ))}
            </div>
            <CheckTable
              checkTableData={checkTableData}
              setCheckTableData={setCheckTableData}
              data={data}
              renderChartData={renderChartData}
              setRenderChartData={setRenderChartData} />
            <div style={{ display: 'flex' }}>
              <div style={{ position: 'relative', top: '10px' }}>
                <RaderChart data={renderChartData} />
              </div>
              <div style={{ overflowY: 'auto' }}>
                <TreeChart treeData={dataList} setDataIndex={setDataIndex} />
              </div>
            </div>
          </div>
          {dataList && dataIndex &&
          <div style={{
            position: 'relative',
            top: dataIndex.top - 37,
            right: '35px',
            minWidth: '160px',
            height: '100px',
            backgroundColor: '#fff',
            zIndex: 100
          }}>
            <div style={{
              backgroundColor: '#eee',
              height: '30px',
              padding: '2px'
            }}>
              step {dataIndex.index}
            </div>
            <div style={{
              padding: '2px'
            }}>
              method: {dataIndex.index === '0' ? 'none' : dataList[Number.parseInt(dataIndex.index)-1].props.children[0]}</div>
            <div style={{
              padding: '2px'
            }}>detail method: {dataIndex.index === '0' ? 'none' : dataList[Number.parseInt(dataIndex.index)-1].props.children[1]}</div>
          </div>}
        </div>}
    </Box>
  )
}
