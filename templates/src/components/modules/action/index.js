import React, { useMemo } from 'react'
import { Box } from "../../Box"
import { useFileData } from '../../../contexts/FileDataContext'
import Recommend from './Recommend'
import New from './New'

export default function Action() {
  const {
    isEmptyData,
    combinationTableData,
    selectedCombinationTableRow,
    setMyCombinationData
  } = useFileData();

  const { combinationData } = combinationTableData
  const [radioValue, setRadioValue] = React.useState('recommend');
  const handleChangeRadio = (e) => {
    setRadioValue(e.target.value);
  }

  const data = useMemo(() => {
    if (!combinationData) {
      return []
    }
    return combinationData.combinationList.map((combination, i) => ({
      key: combination,
      model: combinationData.modelNames[i],
      combination: combinationData.combinationIconList[i],
      combinationDetail: combinationData.combinationDetailIconList[i],
      ...combinationData.inputEvalList.reduce(
        (acc, cur) => ({
          ...acc,
          [cur]: combinationData[cur][i],
        }),
        {}
      ),
    }))
  }, [combinationData])

  React.useEffect(() => {
    if (radioValue === 'new') {
      setMyCombinationData('transformation');
    } else {
      const key = selectedCombinationTableRow?.key;
      if (key) {
        setMyCombinationData();
      }
    }
  }, [combinationData, selectedCombinationTableRow?.key, radioValue, setMyCombinationData])

  return (
    <Box title="action">
      {!isEmptyData({ combinationData }) && data.length > 0 && (
        <React.Fragment>
          <div style={{
            display: 'flex',
            height: '20px',
            marginBottom: '5px',
          }}>
            {['recommend', 'new'].map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', width: '50%' }}>
                <input
                  type='radio'
                  name='radio'
                  value={item}
                  style={{ marginRight: '10px' }}
                  onClick={handleChangeRadio}
                  checked={radioValue === item}
                />
                {item}
              </div>
            ))}
          </div>
          {radioValue === 'recommend' && <Recommend />}
          {radioValue === 'new' && <New />}
        </React.Fragment>
      )}
    </Box>
  )
}