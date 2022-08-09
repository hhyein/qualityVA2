import React, { useCallback, useMemo } from 'react'
import { Box } from '../../Box'
import MyCombinationTable from './MyCombinationTable'
import { useFileData } from '../../../contexts/FileDataContext'

export default function MyCombination() {
  const {
    isEmptyData,
    combinationTableData,
  } = useFileData()
  const { combinationData } = combinationTableData

  const data = [{
    key: 1,
    combination: ['transformation'],
    combinationDetail: ['mm', 'std'],
  },
]

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
                    // onClick={handleChangeRadio}
                    // checked={radioValue === item} 
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
