import React, { useMemo } from 'react'
import Select from 'react-select'
import Title from '../../Title'
import { useFileData } from '../../../contexts/FileDataContext'

export default function Action() {
  const {
    setMyCombinationData,
    modelSettingData: { columnList },
  } = useFileData();
  
  const [actionList, setActionList] = React.useState();
  const [actionValues, setActionValues] = React.useState({
    label: "transformation",
    value: 0
  });
  const [columnValues, setColumnValues] = React.useState();

  React.useEffect(() => {
    setActionList(['transformation', 'missing', 'outlier', 'inconsistent'].map((item, idx) => {
      return {
        label: item,
        value: idx
      }
    }))
    setMyCombinationData(actionValues.label);
  }, [actionValues])

  const handleChange = (key, value) => {
    if (key === 'combination') {
      setActionValues(value);
    } else {
      setColumnValues(prev => ({
        ...prev,
        [key]: value,
      }))
    }
  }

  return (
      <React.Fragment>
        <div style={{
          display: 'flex',
          marginBottom: '5px',
        }}>
          <div style={{
            width: '47.5%',
            margin: '0 5%'
          }}>
            <Title title="action" />
            <Select
              options={actionList}
              placeholder={<div>select</div>}
              defaultValue={actionValues}
              onChange={v => {
                handleChange('action', v)
              }}
            />
          </div>
          <div style={{
            width: '47.5%',
          }}>
            <React.Fragment>
              <Title title="actionDetail" />
              <Select
                isMulti
                options={columnList}
                placeholder={<div>select</div>}
                defaultValue={columnValues}
                onChange={v => {
                  handleChange('column', v)
                }}
              />
            </React.Fragment>
          </div>
        </div>
      </React.Fragment>
  )
}