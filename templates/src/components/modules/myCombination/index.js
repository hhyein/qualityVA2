import React from 'react'
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
  const [dataSetting, setDataSetting] = React.useState(false);

  React.useEffect(() => {
    if(!selectedCombinationTableRow) {
      return;
    }
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
    setDataSetting(true);
  }, [myCombinationData, selectedCombinationTableRow])

  return (
    <Box title="my-combination">
      {!isEmptyData({ combinationData }) && dataSetting && (
        <MyCombinationTable data={data} />
      )}
    </Box>
  )
}