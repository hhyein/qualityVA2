import React from 'react'
import Select from 'react-select'
import Title from '../../Title'
import { useFileData } from '../../../contexts/FileDataContext'
import ColumnHistogramChart from '../../charts/ColumnHistogramChart'
import ColumnBoxplotChart from '../../charts/ColumnBoxplotChart'
import RowScatterChart from '../../charts/RowScatterChart'

export default function Action() {
  const {
    checkTableData
  } = useFileData()

  const actionList = ['remove', 'missing', 'outlier', 'inconsistent', 'transformation'].map((item, idx) => {
    return {
      label: item,
      value: idx
    }
  });

  const [actionValues, setActionValues] = React.useState({
    label: "remove",
    value: 0
  });

  const [actionDetailList, setActionDetailList] = React.useState();
  const [actionDetailValues, setActionDetailValues] = React.useState();

  React.useEffect(() => {
    if(actionValues?.label === 'transformation') {
      setActionDetailValues();
      setActionDetailList(['log', 'mbs', 'mm', 'rob', 'sqt', 'std'].map((item, idx) => {
        return {
          label: item,
          value: idx
        }
      }));
    } else {
      setActionDetailValues();
      setActionDetailList(['em', 'lof', 'max', 'med', 'men', 'min', 'mod', 'rem'].map((item, idx) => {
        return {
          label: item,
          value: idx
        }
      }));
    }
  }, [actionValues])

  const handleChange = (key, value) => {
    if (key === 'action') {
      setActionValues(value);
    } else {
      setActionDetailValues(value);
    }
  }

  return (
      <React.Fragment>
        {checkTableData.key === 'col' ?
          <React.Fragment>
            <ColumnBoxplotChart />
            <ColumnHistogramChart />
          </React.Fragment>
          :
          <RowScatterChart />
        }
        <div style={{ display: 'flex', position: 'relative', bottom: (checkTableData.key === 'col' ? 80 : 20) }}>
          <div style={{
            width: '47.5%',
            margin: '0 5%'
          }}>
            <Title title="action" />
            <Select className="select"
              options={actionList}
              placeholder={<div>select</div>}
              defaultValue={actionValues}
              onChange={v => {
                handleChange('action', v)
              }}
            />
          </div>
          <div style={{ width: '47.5%' }} >
            {actionValues?.label !== 'remove' && 
              <React.Fragment>
              <Title title="actionDetail" />
              <Select className="select"
                options={actionDetailList}
                placeholder={<div>select</div>}
                defaultValue={actionDetailValues}
                onChange={v => {
                  handleChange('actionDetail', v)
                }}
              />
            </React.Fragment>
            }
          </div>
        </div>
      </React.Fragment>
  )
}