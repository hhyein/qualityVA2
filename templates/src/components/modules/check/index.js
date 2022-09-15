import React, { useMemo, useState } from 'react'
import { Box } from '../../Box'
import { useFileData } from '../../../contexts/FileDataContext'
import Legend from '../../charts/Legend'
import DonutChart from '../../charts/DonutChart'
import HeatmapChart from '../../charts/HeatmapChart'
import HistogramChart from '../../charts/HistogramChart'
import CheckTable from './checkTable'


const checkDonutData = [
  { label: 0, color: 'steelblue', data: { a: 20, b: 80 } },
  { label: 1, color: 'darkorange', data: { a: 20, b: 80 } },
  { label: 2, color: 'darkgreen', data: { a: 60, b: 40 } },
]
// const exampleDonutData = [{ a: 20, b: 80 }, { a: 20, b: 80 }, { a: 60, b: 40 }]
// const exampleDonutColors = ['steelblue', 'darkorange', 'darkgreen']

export default function Check() {
  const {
    isEmptyData,
    dataSettingValues,
    modelSettingValues,
    distortSettingValues
  } = useFileData()

  const [selectedLegendIdx, setSelectedLegendIdx] = useState(0)
  const [radioValue, setRadioValue] = React.useState('visualization');
  const handleChangeRadio = (e) => {
    setRadioValue(e.target.value);
  }

  const legendData = [
    { text: 'missing', color: 'steelblue' },
    { text: 'outlier', color: 'darkorange' },
    { text: 'inconsistent', color: 'darkgreen' },
  ]

  const detailChart = useMemo(() => {
    switch (selectedLegendIdx) {
      case 0:
        return {
          chart: <HeatmapChart />,
        }
      case 1:
        return {
          chart: <HistogramChart />,
        }
      default:
        return {
          chart: <HistogramChart />,
        }
    }
  }, [selectedLegendIdx])

  return (
    <Box title="check">
      {!isEmptyData({
        dataSettingValues,
        modelSettingValues,
        distortSettingValues
      }) && <>
          <Legend
            onLegendClick={setSelectedLegendIdx}
            dataColorInfo={legendData}
          />

          <div style={{ display: 'flex' }}>
            {checkDonutData.map((donutData, idx) => (
              <div key={idx} style={{margin: '0 25px 0 5px'}}>
                <DonutChart
                  data={donutData.data}
                  color={donutData.color}
                  idx={idx}
                />
              </div>
            ))}
          </div>

          <div style={{
            display: 'flex',
            height: '20px',
            marginBottom: '5px',
            width: '300px'
          }}>
            {['visualization', 'table'].map((item) => (
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

          <div style={{ display: 'flex' }}>
            {radioValue === 'visualization' && detailChart.chart}
            {radioValue === 'table' && <CheckTable colorIdx={selectedLegendIdx} />}
          </div>
        </>}
    </Box>
  )
}
