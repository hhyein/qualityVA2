import React, { useMemo, useState } from 'react'
import { Box } from '../../Box'
import { useFileData } from '../../../contexts/FileDataContext'
import TreeChart from '../../charts/TreeChart'
import Legend from '../../charts/Legend'
import DonutChart from '../../charts/DonutChart'
import HeatmapChart from '../../charts/HeatmapChart'
import HistogramChart from '../../charts/HistogramChart'
import CheckTable from './checkTable'
import LineChart from '../../charts/LineChart'
import RaderChart from '../../charts/RaderChart'

const checkDonutData = [
  { label: 0, color: 'steelblue', data: { a: 20, b: 80 } },
  { label: 1, color: 'darkorange', data: { a: 20, b: 80 } },
  { label: 2, color: 'darkgreen', data: { a: 60, b: 40 } },
]

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
          <div style={{ display: 'flex' }}>
            <TreeChart />
            <div style={{ width: '350px' }}>
              <Legend
                onLegendClick={setSelectedLegendIdx}
                dataColorInfo={legendData}
              />
              <div style={{ display: 'flex' }}>
                {checkDonutData.map((donutData, idx) => (
                  <div key={idx} style={{margin: '0 30px 0 0'}}>
                    <DonutChart
                      data={donutData.data}
                      color={donutData.color}
                      idx={idx}
                    />
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', marginTop: '5px' }}>
                {['visualization', 'table'].map((item) => (
                  <div key={item} style={{ width: '45%', display: 'flex', alignItems: 'center' }}>
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
              {radioValue === 'visualization' && detailChart.chart}
              {radioValue === 'table' && <CheckTable colorIdx={selectedLegendIdx} />}
            </div>

            <div>
              <div>model table</div>
              <div style={{ display: 'flex' }}>
                <LineChart />
                <RaderChart />
              </div>
            </div>
          </div>
        </>}
    </Box>
  )
}
