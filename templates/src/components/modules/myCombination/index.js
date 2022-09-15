import React, { useCallback, useMemo } from 'react'
import { Box } from '../../Box'
import MyCombinationTable from './MyCombinationTable'
import { useFileData } from '../../../contexts/FileDataContext'

export default function MyCombination() {
  const {
    isEmptyData,
    combinationTableData,
    myCombinationData,
    selectedCombinationTableRow
  } = useFileData()
  const { combinationData } = combinationTableData
  const [data, setData] = React.useState();

  console.log(selectedCombinationTableRow);

  React.useEffect(() => {
    if(myCombinationData) {
      let newData;
      if(myCombinationData === 'outlier' || myCombinationData === 'inconsistent') {
        newData = [...selectedCombinationTableRow.combination, myCombinationData];
      } else {
        newData = selectedCombinationTableRow.combination;
      }
      setData([{
        key: selectedCombinationTableRow.key,
        combination: newData,
        combinationDetail: [...selectedCombinationTableRow.combinationDetail, 'my']
      }]);
    } else {
      setData([selectedCombinationTableRow]);
    }
  }, [myCombinationData, selectedCombinationTableRow])

  return (
    <Box title="my-combination">
      {!isEmptyData({ combinationData }) && data.length > 0 && (
        <MyCombinationTable data={data} />
      )}
    </Box>
  )
}