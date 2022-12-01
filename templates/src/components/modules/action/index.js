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
    setTreeChartData,
    actionRadioValue,
    setActionRadioValue
  } = useFileData();

  const { combinationData } = combinationTableData
  const handleChangeRadio = (e) => {
    setActionRadioValue(e.target.value);
  }

  // const data = useMemo(() => {
  //   if (!combinationData) {
  //     return []
  //   }
  //   return combinationData.combinationList.map((combination, i) => ({
  //     key: combination,
  //     model: combinationData.modelNames[i],
  //     combination: combinationData.combinationIconList[i],
  //     combinationDetail: combinationData.combinationDetailIconList[i],
  //     ...combinationData.inputEvalList.reduce(
  //       (acc, cur) => ({
  //         ...acc,
  //         [cur]: combinationData[cur][i],
  //       }),
  //       {}
  //     ),
  //   }))
  // }, [combinationData])

  React.useEffect(() => {
    let imgData;
    if (!selectedCombinationTableRow) {
      return;
    }
    imgData = [selectedCombinationTableRow];
    const len = Math.max(imgData[0].combination.length, imgData[0].combinationDetail.length);
      const treeData = Array.from({length: len}, () => []);
      for(let i=0;i<len;i++) {
        const [comb, combDetail] = [imgData[0].combination[i], imgData[0].combinationDetail[i]];
        if(!comb) {
          treeData[i].push(combDetail, combDetail);
        } else if(!combDetail) {
          treeData[i].push(comb, comb);
        } else {
          treeData[i].push(comb, combDetail);
        }
      }
      setTreeChartData(treeData);
  }, [selectedCombinationTableRow, setTreeChartData])

  return (
    <Box title="action">
      {!isEmptyData({ combinationData }) && (
        <React.Fragment>
          <div style={{
            display: 'flex',
            height: '20px',
            marginBottom: '5px',
          }}>
            {['recommend', 'new'].map((item) => (
              <div key={item} style={{ display: 'flex', fontSize: 13, alignItems: 'center', width: '50%' }}>
                <input
                  type='radio'
                  name='radio'
                  value={item}
                  style={{ marginRight: '10px' }}
                  onClick={handleChangeRadio}
                  checked={actionRadioValue === item}
                />
                {item}
              </div>
            ))}
          </div>
          {actionRadioValue === 'recommend' && <Recommend />}
          {actionRadioValue === 'new' && <New />}
        </React.Fragment>
      )}
    </Box>
  )
}