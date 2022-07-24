import React from 'react'
import { Box } from '../../Box'
import Title from '../../Title'
import { useFileData } from '../../../contexts/FileDataContext'

export default function CombinationSetting() {
  const {
    isEmptyData,
    combinationSettingValues,
    setCombinationSettingValues,
  } = useFileData();

  const setRange = (e, name) => {
    setCombinationSettingValues({
      ...combinationSettingValues,
      [name]: parseInt(e.target.value),
    });
  }

  return (
    <Box title="combination-setting">
      {!isEmptyData({
        combinationSettingValues,
      }) && <>
        <Title title="value1" />
        <div style={{ display: 'flex' }}>
          <input style={{ width: '80%' }} type="range" min="0" max="100" value={combinationSettingValues.value1} onChange={(e) => setRange(e, 'value1')}></input>
          <p style={{ marginLeft: '5%', width: '15%' }}>{combinationSettingValues.value1}</p>
        </div>

        <Title title="value2" />
        <div style={{ display: 'flex' }}>
          <input style={{ width: '80%' }} type="range" min="0" max="100" value={combinationSettingValues.value2} onChange={(e) => setRange(e, 'value2')}></input>
          <p style={{ marginLeft: '5%', width: '15%' }}>{combinationSettingValues.value2}</p>
        </div>

        <Title title="value3" />
        <div style={{ display: 'flex' }}>
          <input style={{ width: '80%' }} type="range" min="0" max="100" value={combinationSettingValues.value3} onChange={(e) => setRange(e, 'value3')}></input>
          <p style={{ marginLeft: '5%', width: '15%' }}>{combinationSettingValues.value3}</p>
        </div>
      </>}
    </Box>
  )
}
