import React from 'react'
import Select from 'react-select'
import Title from '../../Title'
import { Box } from '../../Box'
import { useFileData } from '../../../contexts/FileDataContext'
import Legend from '../../charts/Legend'
import DonutChart from '../../charts/DonutChart'
import HeatmapChart from '../../charts/HeatmapChart'
import HistogramChart from '../../charts/HistogramChart'
import CorrelationChart from '../../charts/CorrelationChart'
import RaderChart from '../../charts/RaderChart'
import TreeChart from '../../charts/TreeChart'
import PNBarChart from '../../charts/PNBarChart'
import CheckTable from './CheckTable'

const legendData = [
  { label: 0, text: 'completeness', color: 'darkorange' },
  { label: 1, text: 'outlier', color: 'steelblue' },
  { label: 2, text: 'homogeneity', color: 'yellowgreen' },
  { label: 3, text: 'duplicate', color: 'lightcoral' },
  { label: 4, text: 'correlation', color: 'cadetblue' },
  { label: 5, text: 'relevance', color: 'mediumpurple' },
]

const metricList = [
  { label: 'completeness', visualChart: 'heatmapChart', value: 0 },
  { label: 'outlier', visualChart: 'histogramChart', value: 1 },
  { label: 'homogeneity', visualChart: 'heatmapChart', value: 2 },
  { label: 'duplicate', visualChart: 'duplicate', value: 3 },
  { label: 'correlation', visualChart: 'correlationChart', value: 4 },
  { label: 'relevance', visualChart: 'rankBarChart', value: 5 },
]

const outlierList = [
  { label: 'iqr', value: 0 },
  { label: 'z-score', value: 1 }
];

const correlationList = [
  { label: 'person', value: 0 },
  { label: 'kendall', value: 1 },
  { label: 'spearman', value: 2 }
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
    updateVisualizationData,
    modelTableData,
    actionRadioValue,
    setTreeChartNode,
    treeChartNode
  } = useFileData()
  
  const [metricValues, setMetricValues] = React.useState({
    label: "completeness",
    visualChart: "heatmapChart",
    value: 0
  });
  const [visualizationList, setVisualizationList] = React.useState([]);
  const [completenessRowIndex, setCompletenessRowIndex] = React.useState('');
  const [completenessColumnName, setCompletenessColumnName] = React.useState('');
  const [completenessQualityIssueCnt, setCompletenessQualityIssueCnt] = React.useState('');
  const [correlationColumnName, setCorrelationColumnName] = React.useState('');
  const [highCorrelationColumnCnt, setHighCorrelationColumnCnt] = React.useState('');
  const [highCorrelationColumnName, setHighCorrelationColumnName] = React.useState('');
  const [relevanceColumnName, setRelevanceColumnName] = React.useState('');
  const [relevanceRank, setRelevanceRank] = React.useState('');
  const [relevanceScore, setRelevanceScore] = React.useState('');
  const [dataList, setDataList] = React.useState();
  const [dataIndex, setDataIndex] = React.useState();
  const [checkTableData, setCheckTableData] = React.useState([1]);
  const [renderChartData, setRenderChartData] = React.useState([{
    key: 1,
    name: 'et',
    data: [0.461, 0.351, 0.571, 0.548, 0.042, 0.036],
  }]);
  const [columnData, setColumnData] = React.useState();
  const [outlierData, setOutlierData] = React.useState();
  const [corrData, setCorrData] = React.useState();
  const [cntList, setCntList] = React.useState([]);
  const [cntData, setCntData] = React.useState();

  React.useEffect(() => {
    if(columnList) {
      setColumnData(columnList[0].label)
      setOutlierData(outlierList[0].label)
      setCorrData(correlationList[0].label)

      setCntList([...Array(columnList.length).keys()].map(x => ({ label: x, value: x })))
      setCntData(0)
    }
  }, [columnList])

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
    setMetricValues(metricList[selectedLegendIdx])
  }, [selectedLegendIdx])

  React.useEffect(() => {
    if (metricValues?.label) {
      setVisualizationList([metricValues.visualChart]);
      if (metricValues.visualChart === 'histogramChart') {
        updateVisualizationData(treeChartNode, metricValues.visualChart, metricValues.label, columnData, outlierData)
      } else {
        updateVisualizationData(treeChartNode, metricValues.visualChart, metricValues.label)
      }
    }
  }, [metricValues, columnData, outlierData])

  const chartData = (value) => {
    switch (value) {
      // completeness, homogeneity
      case "heatmapChart":
        return <div style={{ display: 'flex', marginLeft: -5 }}>
          <HeatmapChart
            label={metricValues?.label}
            setRowIndex={setCompletenessRowIndex}
            setColumnName={setCompletenessColumnName}
            setQualityIssueCnt={setCompletenessQualityIssueCnt}
            visualizationData={visualizationData}
          />
          <div style={{ position: 'relative', right: 10 }}>
            <div style={{ width: 163, height: 95, border: '1px solid #999999', marginTop: 30 }}>
              <div style={{ position: 'absolute', top: 20, left: 10, fontSize: 13, backgroundColor: '#fff', paddingLeft: 5, paddingRight: 5 }}>information</div>
              <div style={{ marginTop: 10 }}>
                <p>row index {completenessRowIndex}</p>
                <p>column name {completenessColumnName}</p>
                <p>quality issue cnt {completenessQualityIssueCnt}</p>
              </div>
            </div>
            <div style={{ width: 163, height: 60, border: '1px solid #999999', marginTop: 15 }}>
              <div style={{ position: 'absolute', top: 135, left: 10, fontSize: 13, backgroundColor: '#fff', paddingLeft: 5, paddingRight: 5 }}>quality issue</div>
              <div style={{ marginTop: 10, display: 'flex' }}>
                <p>row index</p>
                <p>value</p>
              </div>
            </div>
          </div>
        </div>

      // outlier
      case "histogramChart":
        return <div style={{ display: 'flex' }}>
          <div>
            <div style={{ display: 'flex', marginTop: 20, marginRight: 10 }}>
              <div style={{
                width: '45%',
                margin: '0 5%'
              }}>
                <Title title="method" />
                <Select className="select"
                  options={outlierList}
                  placeholder={<div>{outlierData}</div>}
                  defaultValue={outlierData}
                  onChange={v => {
                    setOutlierData(v.label)
                  }}
                />
              </div>
              <div style={{ width: '45%' }}>
                <Title title="column" />
                <Select className="select"
                  options={columnList}
                  placeholder={<div>{columnData}</div>}
                  defaultValue={columnData}
                  onChange={v => {
                    setColumnData(v.label)
                  }}
                />
              </div>
            </div>
            <div style={{ position: 'relative', bottom: 15 }}>
              <HistogramChart />
            </div>
          </div>
          <div>
            <div style={{ width: 168, height: 95, border: '1px solid #999999', marginTop: 30 }}>
              <div style={{ position: 'absolute', top: 20, left: 270, fontSize: 13, backgroundColor: '#fff', paddingLeft: 5, paddingRight: 5 }}>information</div>
              <div style={{ marginTop: 10 }}>
                <p>outlier standard</p>
                <p>quality issue cnt</p>
              </div>
            </div>
            <div style={{ width: 168, height: 60, border: '1px solid #999999', marginTop: 15 }}>
              <div style={{ position: 'absolute', top: 135, left: 270, fontSize: 13, backgroundColor: '#fff', paddingLeft: 5, paddingRight: 5 }}>quality issue</div>
              <div style={{ marginTop: 10, display: 'flex' }}>
                <p>row index</p>
                <p>value</p>
              </div>
            </div>
          </div>
        </div>

      case "duplicate":
        return <>
          <div style={{ position: 'relative', height: 172, left: 10, marginTop: 30, border: '1px solid #999999', width: 418 }}>
            <div style={{ position: 'absolute', top: -10, left: 10, fontSize: 13, backgroundColor: '#fff', paddingLeft: 5, paddingRight: 5 }}>information &amp; quality issue</div>
            <div style={{ marginTop: 10 }}>
              <p>duplicate cnt</p>
              <p>row index value</p>
            </div>
          </div>
        </>

      // correlation
      case "correlationChart":
        return <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '60px auto', marginTop: 20, marginRight: 10 }}>
            <div style={{ gridRow: '1 / 3', marginTop: -20, marginLeft: -10 }}>
              <CorrelationChart />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr' }}>
            <div>
                <Title title="method" />
                <Select className="select"
                  options={correlationList}
                  placeholder={<div>{corrData}</div>}
                  defaultValue={corrData}
                  onChange={v => {
                    setCorrData(v.label)
                  }}
                />
              </div>
            </div>
            <div style={{ gridColumn: '2 / 3'}}>
              <div style={{ position: 'relative', height: 112, marginTop: 10, border: '1px solid #999999' }}>
                <div style={{ position: 'absolute', top: -10, left: 2, fontSize: 13, backgroundColor: '#fff', paddingLeft: 5, paddingRight: 5 }}>information &amp; quality issue</div>
                <div style={{ marginTop: 10 }}>
                  <p>column name {correlationColumnName}</p>
                  <p>high correlation column cnt</p>
                  <p>high correlation column name</p>
                </div>
              </div>
            </div>
          </div>
        </>
      
      // relevance
      case "rankBarChart":
        return <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '60px auto', marginTop: 20, marginRight: 10 }}>
            <div style={{ gridRow: '1 / 3' }}>
              <PNBarChart />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr' }}>
              <div>
                <Title title="method" />
                <Select className="select"
                  options={correlationList}
                  placeholder={<div>{corrData}</div>}
                  defaultValue={corrData}
                  onChange={v => {
                    setCorrData(v.label)
                  }}
                />
              </div>
            </div>
            <div style={{ gridColumn: '2 / 3'}}>
              <div style={{ position: 'relative', height: 112, marginTop: 10, border: '1px solid #999999' }}>
                <div style={{ position: 'absolute', top: -10, left: 2, fontSize: 13, backgroundColor: '#fff', paddingLeft: 5, paddingRight: 5 }}>information &amp; quality issue</div>
                <div style={{ marginTop: 10 }}>
                  <p>column name {relevanceColumnName}</p>
                  <p>rank {relevanceRank}</p>
                  <p>score {relevanceScore}</p>
                </div>
              </div>
            </div>
          </div>
        </>

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
          <div style={{ display: 'flex', height: '275px' }}>
            <div style={{ width: '440px' }}>
              <div style={{
                position: 'absolute',
                top: 75,
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
                <div style={{ margin: '17px 3px 0' }} key={idx}>
                  <DonutChart
                    donutData={donutData}
                  />
                </div>
              ))}
            </div>

            {modelTableData && <CheckTable
              checkTableData={checkTableData}
              setCheckTableData={setCheckTableData}
              data={modelTableData}
              renderChartData={renderChartData}
              setRenderChartData={setRenderChartData} /> }
            
            <div style={{ display: 'flex' }}>
              <div style={{ position: 'relative', top: 10, left: 10, marginRight: 10 }}>
                <RaderChart data={renderChartData} />
              </div>
              <div style={{ overflowY: 'auto', zIndex: 100 }}>
                <TreeChart 
                treeData={dataList} 
                setDataIndex={setDataIndex} 
                actionRadioValue={actionRadioValue}
                onNodeClick = {setTreeChartNode} />
              </div>
            </div>
          </div>
          {dataList && dataIndex &&
            <div style={{
              position: 'relative',
              top: dataIndex.top - 37,
              right: '15px',
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
                method: {dataIndex.index === '0' ? 'none' : dataList[Number.parseInt(dataIndex.index) - 1].props.children[0]}</div>
              <div style={{
                padding: '2px'
              }}>detail method: {dataIndex.index === '0' ? 'none' : dataList[Number.parseInt(dataIndex.index) - 1].props.children[1]}</div>
            </div>}
        </div>}
    </Box>
  )
}
