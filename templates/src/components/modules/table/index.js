import React from 'react'
import { Box } from '../../Box'
import { useFileData } from '../../../contexts/FileDataContext'
import RowSummaryChart from '../../charts/RowSummaryChart'
import ColumnSummaryChart from '../../charts/ColumnSummaryChart'

export default function Table() {
  const {
    isEmptyData,
    selectedLegendIdx,
    settingValues
  } = useFileData()

  const colorData = ['darkorange', 'steelblue', 'yellowgreen', 'lightcoral', 'cadetblue'];
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
    <>
      {!isEmptyData({
        settingValues
      }) && settingValues.model && columnDatas.length > 0 ? (
        <div style={{ display: 'flex', marginTop: -30, marginLeft: -25 }}>
          <div>
            <div style={{ marginTop: 30, height: 65 }} />
            <RowSummaryChart />
          </div>
          <div>
            <div style={{ marginLeft: -30 }}>
              <ColumnSummaryChart />
            </div>
            <div style={{
              overflowY: 'scroll',
              marginLeft: -10,
              marginTop: -20,
              width: '715px',
              height: '440px',
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
                                  {data.slice(0, 5)}
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
                }
                )
                }
              </div>
            </div>
          </div>
        </div>
      ) : <Box title="table" />
      }
    </>
  )
}
