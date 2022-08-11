import React, { useMemo } from 'react'
import { Box } from '../../Box'
import { useFileData } from '../../../contexts/FileDataContext'
import TreeChart from '../../charts/TreeChart'
import BarChart from '../../charts/BarChart'

export default function ActionDetail() {
  const {
    isEmptyData,
    combinationTableData,
    myCombinationRadioValue
  } = useFileData();
  const { combinationData } = combinationTableData
  const [changeData, setChangeData] = React.useState();
  const [distortData, setDistortData] = React.useState();
  
  React.useEffect(() => {
    if (myCombinationRadioValue === 'knn') {
      setChangeData([
        { 'group': 'banana', 'Nitrogen': 10, 'normal': 5, 'stress': 15 },
        { 'group': 'banana', 'Nitrogen': 15, 'normal': 15, 'stress': 15 },
        { 'group': 'banana', 'Nitrogen': 10, 'normal': 5, 'stress': 15 }
      ]);
      setDistortData([0.07, 0.06, 0.05]);
    } else if (myCombinationRadioValue === 'lr') {
      setChangeData([
        { 'group': 'banana', 'Nitrogen': 15, 'normal': 5, 'stress': 15 },
        { 'group': 'banana', 'Nitrogen': 5, 'normal': 5, 'stress': 5 },
        { 'group': 'banana', 'Nitrogen': 10, 'normal': 15, 'stress': 5 }
      ]);
      setDistortData([0.08, 0.07, 0.05]);
    } else if (myCombinationRadioValue === 'svm') {
      setChangeData([
        { 'group': 'banana', 'Nitrogen': 10, 'normal': 5, 'stress': 15 },
        { 'group': 'banana', 'Nitrogen': 15, 'normal': 15, 'stress': 15 },
        { 'group': 'banana', 'Nitrogen': 10, 'normal': 5, 'stress': 15 }
      ]);
      setDistortData([0.09, 0.09, 0.08]);
    }
  }, [myCombinationRadioValue])

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

  return (
    <Box title="action-detail">
      {!isEmptyData({ combinationData }) && data.length > 0 && (
        <React.Fragment>
          <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr 1fr', textAlign: 'center', paddingRight: '15px' }}>
            <p style={{ margin: 0 }}>action id</p>
            <p style={{ margin: 0 }}>change</p>
            <p style={{ margin: 0 }}>distort</p>
          </div>
          <hr class="solid" />
          <div style={{ overflow: 'auto', height: '85%', display: 'grid', gridTemplateColumns: '70px 1fr 1fr' }}>
            <TreeChart />
            <div>
              {changeData.map((item) => (
                <div style={{ height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <BarChart data={[item]} />
                </div>
              ))}
            </div>
            <div>
              {distortData.map((item) => (
                <div style={{ height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </React.Fragment>
      )}
    </Box>
  )
}
