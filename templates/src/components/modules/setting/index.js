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
    setDataSettingValues,
    setDistortSettingValues
  } = useFileData()

  const [modelValues, setModelValues] = React.useState(modelSettingValues);
  const [dataValues, setDataValues] = React.useState();
  const [distortValues, setDistortValues] = React.useState();
  const [radioValue, setRadioValue] = React.useState('data');

  const [buttonActive, setButtonActive] = React.useState(false);

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
    setModelValues(modelSettingValues);
  }, [modelSettingValues])

  React.useEffect(() => {
    if (dataValues?.issue && dataValues?.issue.length > 0 &&
      modelValues?.column &&
      modelValues?.eval && modelValues.eval.length > 0 &&
      modelValues?.model && modelValues.model.length > 0 &&
      modelValues?.purpose &&
      distortValues?.metric) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [modelValues, dataValues, distortValues])

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
      setModelValues(prev => ({
        ...prev,
        [key]: value,
      }))
    }
  }

  const handleDataChange = (key, value) => {
    setDataValues(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleDistortChange = (key, value) => {
    setDistortValues(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  const submitModelSetting = () => {
    setModelSettingValues(modelValues);
    setDataSettingValues(dataValues);
    setDistortSettingValues(distortValues);
  }

  return (
    <Box title="setting" style={{ overflow: 'auto' }}>
      {!isEmptyData({
        purposeList,
      }) && (
          <React.Fragment>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              height: '22px',
              marginBottom: '5px',
            }}>
              {['data', 'model', 'distort'].map((item) => (
                <React.Fragment key={item}>
                  <input
                    type='radio'
                    name='radio'
                    value={item}
                    onClick={handleChangeRadio}
                    checked={radioValue === item} />
                  {item}
                </React.Fragment>
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
                  isMulti
                  options={dataList}
                  placeholder={<div>select</div>}
                  defaultValue={dataValues?.issue ? dataValues.issue : undefined}
                  onChange={v => {
                    handleDataChange('issue', v)
                  }}
                />
              </>}
              {radioValue === 'model' && <>
                <Title title="purpose" />
                <Select
                  options={purposeList}
                  placeholder={<div>select</div>}
                  defaultValue={modelValues?.purpose ? modelValues.purpose : undefined}
                  onChange={v => {
                    handleChange('purpose', v)
                  }}
                />
                <Title title="column" />
                <Select
                  options={columnList}
                  value={modelSettingValues.column}
                  placeholder={<div>select</div>}
                  defaultValue={modelValues?.column ? modelValues.column : undefined}
                  onChange={v => {
                    handleChange('column', v)
                  }}
                />
                <Title title="model" />
                <Select
                  isMulti
                  options={modelList}
                  placeholder={<div>select</div>}
                  defaultValue={modelValues?.model ? modelValues.model : undefined}
                  onChange={v => handleChange('model', v)}
                />
                <Title title="eval" />
                <Select
                  isMulti
                  options={evalList}
                  placeholder={<div>select</div>}
                  defaultValue={modelValues?.eval ? modelValues.eval : undefined}
                  onChange={v => handleChange('eval', v)}
                />
              </>}
              {radioValue === 'distort' && <>
                <Title title="metric" />
                <Select
                  options={metricList}
                  placeholder={<div>select</div>}
                  defaultValue={distortValues?.metric ? distortValues.metric : undefined}
                  onChange={v => {
                    handleDistortChange('metric', v)
                  }}
                />
              </>}
            </div>
            <button
              disabled={buttonActive ? false : true}
              style={{ width: '40%', margin: '5px 0 0 60%' }}
              onClick={submitModelSetting}>submit</button>
          </React.Fragment>
        )}
    </Box>
  )
}
