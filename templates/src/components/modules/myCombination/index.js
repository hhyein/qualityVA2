import React, { useCallback, useMemo } from 'react'
import { Box } from '../../Box'
import MyCombinationTable from './MyCombinationTable'
import { useFileData } from '../../../contexts/FileDataContext'

export default function MyCombination() {
  const {
    isEmptyData,
    combinationTableData,
    myCombinationRadioValue,
    setMyCombinationRadioValue,
    myCombinationData
  } = useFileData()
  const { combinationData } = combinationTableData
  const handleChangeRadio = (e) => {
    setMyCombinationRadioValue(e.target.value);
  }

  const [data, setData] = React.useState();

  React.useEffect(() => {
    if(myCombinationData) {
      let newData;
      if(myCombinationData === 'outlier' || myCombinationData === 'inconsistent') {
        newData = ['transformation', 'missing', myCombinationData];
      } else {
        newData = ['transformation', 'missing'];
      }
      setData([{
        key: 1,
        combination: newData,
        combinationDetail: ['mm', 'std', 'my']
      }]);
    } else {
      setData([{
        key: 1,
        combination: ['transformation', 'missing'],
        combinationDetail: ['mm', 'std'],
      }]);
    }
  }, [myCombinationData])

  return (
    <Box title="my-combination">
      <div style={{ height: '130px' }}>
        {!isEmptyData({ combinationData }) && data.length > 0 && (
          <>
          <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              height: '22px',
              marginBottom: '5px',
            }}>
              {['knn', 'lr', 'svm'].map((item) => (
                <div key={item}>
                  <input
                    type='radio'
                    name='radio'
                    value={item}
                    style={{ marginRight: '15px'}}
                    onClick={handleChangeRadio}
                    checked={myCombinationRadioValue === item} 
                    />
                  {item}
                </div>
              ))}
            </div>
            <MyCombinationTable data={data} />
          </>
        )}
      </div>
    </Box>
  )
}
