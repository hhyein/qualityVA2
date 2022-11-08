import React from 'react'
import { Box } from '../../Box'
import MyCombinationTable from './MyCombinationTable'
import { useFileData } from '../../../contexts/FileDataContext'

export default function MyCombination() {
  const {
    isEmptyData,
    combinationTableData,
    myCombinationData,
    selectedCombinationTableRow,
    setTreeChartData
  } = useFileData()
  const { combinationData } = combinationTableData
  const [data, setData] = React.useState();
  const [dataSetting, setDataSetting] = React.useState(false);

  React.useEffect(() => {
    if (!selectedCombinationTableRow) {
      return;
    }
    if (myCombinationData) {
      let newData;
      if (myCombinationData === 'outlier' || myCombinationData === 'inconsistent') {
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

  React.useEffect(() => {
    if (data) {
      const len = Math.max(data[0].combination.length, data[0].combinationDetail.length);
      const treeData = Array.from({length: len}, () => []);
      for(let i=0;i<len;i++) {
        const [comb, combDetail] = [data[0].combination[i], data[0].combinationDetail[i]];
        if(!comb) {
          treeData[i].push(combDetail, combDetail);
        } else if(!combDetail) {
          treeData[i].push(comb, comb);
        } else {
          treeData[i].push(comb, combDetail);
        }
      }
      setTreeChartData(treeData);
    }
  }, [data, setTreeChartData])

  return (
    <Box title="my-combination">
      {/* {!isEmptyData({ combinationData }) && dataSetting && (
        <MyCombinationTable data={data} />
      )} */}
    </Box>
  )
}