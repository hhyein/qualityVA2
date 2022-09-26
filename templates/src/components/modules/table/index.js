import React from 'react'
import { Box } from '../../Box'
import { useFileData } from '../../../contexts/FileDataContext'

export default function Table() {
  const {
    isEmptyData,
    selectedLegendIdx,
    settingValues
  } = useFileData()

  const colorData = ['darkorange', 'steelblue', 'yellowgreen', 'lightcoral', 'darkgray'];
  const point = { x: 1, y: 1 };

  const {
    file
  } = useFileData();

  const [columnDatas, setcolumnDatas] = React.useState([]);
  const fileReader = new FileReader();

  React.useEffect(() => {
    if (file) {
      fileReader.onload = (e) => {
        const csvOutput = e.target.result;
        const code = csvOutput.toString().split('\r\n');
        const codeData = [];
        for (let i = 0; i < code.length; i++) {
          codeData.push(code[i].split(","));
        }
        setcolumnDatas(codeData);
      };
      fileReader.readAsText(file);
    }
  }, [file])

  return (
    <Box title="table">
      {!isEmptyData({
        settingValues
      }) && settingValues.model && columnDatas.length > 0 && (
          <div style={{
            overflow: 'scroll',
            marginTop: '5px',
            maxWidth: '530px',
            maxHeight: '330px',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'auto auto auto auto auto auto auto auto auto auto auto auto auto'
            }}>
              {columnDatas.map((columnData, rowIdx) => {
                return (
                  <React.Fragment key={`col${rowIdx}`}>
                    {columnData.map((data, idx) => {
                      return (
                        <React.Fragment key={idx}>
                          {rowIdx === 0
                            ? <div
                              className="grid-th"
                              key={idx}
                              style={{
                                cursor: 'default',
                                background: undefined,
                                textAlign: 'center',
                                fontWeight: 'bold',
                              }}
                            >
                              {data}
                            </div>
                            : <div
                              className="grid-td"
                              style={point.x === rowIdx && point.y === idx ? { backgroundColor: colorData[selectedLegendIdx] } : undefined}
                              key={idx}
                            >
                              {data}
                            </div>
                          }

                        </React.Fragment>
                      )
                    })}
                  </React.Fragment>
                )
              })}
            </div>
          </div>
        )}
    </Box>
  )
}