import React from 'react'
import Select from 'react-select'
import Title from '../../Title'
import { Box } from '../../Box'
import { useFileData } from '../../../contexts/FileDataContext'

export default function Setting() {
  const {
    isEmptyData,
    purposeList,
    modelSettingData: { columnList, modelList, evalList },
    modelSettingValues,
    setModelSettingValues,
  } = useFileData()

  const handleChange = (key, value) => {
    setModelSettingValues(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <Box
      title="setting"
      style={{
        display: 'grid',
        overflow: 'visible',
        gridGap: '5px',
      }}
    >
      {!isEmptyData({
        purposeList,
      }) && (
        <>
          <Title title="purpose" />
          <Select
            options={purposeList}
            placeholder={<div>select</div>}
            onChange={v => {
              handleChange('purpose', v)
            }}
          />
          <Title title="column" />
          <Select
            options={columnList}
            value={modelSettingValues.column}
            placeholder={<div>select</div>}
            onChange={v => {
              handleChange('column', v)
            }}
          />
          <Title title="model" />
          <Select
            isMulti
            options={modelList}
            placeholder={<div>select</div>}
            onChange={v => handleChange('model', v)}
          />
          <Title title="metric" />
          <Select
            isMulti
            options={evalList}
            placeholder={<div>select</div>}
            onChange={v => handleChange('eval', v)}
          />
        </>
      )}
    </Box>
  )
}
