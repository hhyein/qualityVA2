import React, { useState } from 'react'
import { Box } from "../../Box"
import ChangeTable from './changeTable'
import Legend from '../../charts/Legend'
import { useFileData } from '../../../contexts/FileDataContext'

export default function Change() {
  const {
    isEmptyData,
    dataSettingValues,
    modelSettingValues,
    distortSettingValues
  } = useFileData();

  const [ready, setReady] = useState(true);
  const [legend, setLegend] = useState(0);
  const colors = ['steelblue', 'darkorange', 'darkgreen']
  const data = [
    { label: 'missing', data: { a: 20, b: 80 } },
    { label: 'outlier', data: { a: 20, b: 80 } },
    { label: 'inconsistent', data: { a: 60, b: 40 } },
  ];

  React.useEffect(() => {
    if (!isEmptyData({
      dataSettingValues,
      modelSettingValues,
      distortSettingValues
    })) {
      setReady(true);
    }
  }, [dataSettingValues, distortSettingValues, isEmptyData, modelSettingValues])


  return (
    <Box title="change">
      <div style={ready ? { display: undefined } : { display: 'none' }}>
        <Legend
          onLegendClick={setLegend}
          dataColorInfo={data.reduce(
            (acc, { label }, i) => ({
              ...acc,
              [label]: colors[i],
            }),
            {}
          )}
        />
        <ChangeTable />
      </div>
    </Box>
  )
}
