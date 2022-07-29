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

  const [values, setValues] = React.useState(modelSettingValues);
  React.useEffect(() => {
    setValues(modelSettingValues);
  }, [modelSettingValues])

  const handleChange = (key, value) => {
    if (key === 'purpose') {
      setModelSettingValues({
        purpose: value,
        column: undefined,
        model: undefined,
        eval: undefined,
      });
    } else {
      setValues(prev => ({
        ...prev,
        [key]: value,
      }))
    }
  }

  const submitModelSetting = () => {
    setModelSettingValues(values);
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
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}>
              <input type='radio' name='data' value='data'/>data
              <input type='radio' name='model' value='model'/>model
              <input type='radio' name='distort' value='distort'/>distort
            </div>
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

            <button
              style={{ width: '40%', margin: '6px 0 5px 60%' }}
              onClick={submitModelSetting}>submit</button>
          </>
        )}
    </Box>
  )
}
