import React, { useCallback, useMemo } from 'react'
import { Box } from '../../Box'
import MyCombinationTable from './MyCombinationTable'
import { useFileData } from '../../../contexts/FileDataContext'

export default function MyCombination() {
  const {
    isEmptyData,
    combinationTableData,
    myCombinationData
  } = useFileData()
  const { combinationData } = combinationTableData
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
      {!isEmptyData({ combinationData }) && data.length > 0 && (
        <MyCombinationTable data={data} />
      )}
    </Box>
  )
}