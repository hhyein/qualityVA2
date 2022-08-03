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
  const [radioValue, setRadioValue] = React.useState('');

  const dataList = [
    {
      label: "missing",
      value: 0
    },
    {
      label: "outlier",
      value: 1
    },
    {
      label: "inconsistent",
      value: 2
    },
    {
      label: "overlap",
      value: 3
    }];
  const metricList = [
    {
      label: "normality test",
      value: 0
    },
    {
      label: "bayesian test",
      value: 1
    },
    {
      label: "chi squared test",
      value: 2
    }];

  React.useEffect(() => {
    setValues(modelSettingValues);
  }, [modelSettingValues])

  const handleChangeRadio = (e) => {
    setRadioValue(e.target.value);
  }

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
    <Box title="setting">
      {!isEmptyData({
        purposeList,
      }) && (
          <React.Fragment>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              height: '22px',
              marginBottom: '5px'
            }}>
              {['data', 'model', 'distort'].map((item) => (
                <React.Fragment key={item}><input type='radio' name='radio' value={item} onClick={handleChangeRadio} />{item}</React.Fragment>
              ))}
            </div>
            <div
              style={{
                display: 'grid',
                overflow: 'visible',
                gridGap: '5px',
              }}
            >
              {radioValue === 'data' && <>
                <Title title="quality issue" />
                <Select
                  options={dataList}
                  placeholder={<div>select</div>}
                  // onChange={v => {
                  //   handleChange('purpose', v)
                  // }}
                />
              </>}
              {radioValue === 'model' && <>
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
              </>}
              {radioValue === 'distort' && <>
                <Title title="metric" />
                <Select
                  options={metricList}
                  placeholder={<div>select</div>}
                  // onChange={v => {
                  //   handleChange('purpose', v)
                  // }}
                />
              </>}
            </div>
            <button
              style={{ width: '40%', margin: '0 0 0 60%', position: 'absolute', bottom: '11px', right: '10px' }}
              onClick={submitModelSetting}>submit</button>
          </React.Fragment>
        )}
    </Box>
  )
}
