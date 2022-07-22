import React from 'react'
import { Box } from '../../Box'
import Title from '../../Title'
import { useFileData } from '../../../contexts/FileDataContext'

export default function CombinationSetting() {

  const {
    combinationValue,
    setCombinationValue,
  } = useFileData();

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setCombinationValue({
      value1: 0,
      value2: 0,
      value3: 0
    })
    setLoading(false);
  }, [setCombinationValue]);

  const setRange = (e, name) => {
    // console.log(e.target.value);
    // console.log(name);
    setCombinationValue({
      ...combinationValue, // 기존의 value 객체를 복사한 뒤
      [name]: parseInt(e.target.value), // name 키를 가진 값을 value 로 설정
    });
  }

  return (
    <Box title="combination-setting">
      {combinationValue && !loading && <>
        <Title title="value1" />
        <div style={{ display: 'flex' }}>
          <input style={{ width: '80%' }} type="range" min="0" max="100" value={combinationValue.value1} onChange={(e) => setRange(e, 'value1')}></input>
          <p style={{ marginLeft: '5%', width: '15%' }}>{combinationValue.value1}</p>
        </div>

        <Title title="value2" />
        <div style={{ display: 'flex' }}>
          <input style={{ width: '80%' }} type="range" min="0" max="100" value={combinationValue.value2} onChange={(e) => setRange(e, 'value2')}></input>
          <p style={{ marginLeft: '5%', width: '15%' }}>{combinationValue.value2}</p>
        </div>

        <Title title="value3" />
        <div style={{ display: 'flex' }}>
          <input style={{ width: '80%' }} type="range" min="0" max="100" value={combinationValue.value3} onChange={(e) => setRange(e, 'value3')}></input>
          <p style={{ marginLeft: '5%', width: '15%' }}>{combinationValue.value3}</p>
        </div>
      </>}
    </Box>
  )
}
