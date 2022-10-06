import React from 'react'
import { Box } from '../../Box'
import { useFileData } from '../../../contexts/FileDataContext'
import RowSummaryChart from '../../charts/RowSummaryChart'
import ColumnSummaryChart from '../../charts/ColumnSummaryChart'

export default function Table() {
  const {
    isEmptyData,
    selectedLegendIdx,
    modelSettingData: { columnList },
    settingValues
  } = useFileData()

  const pointData = {
    com: {
      color: 'darkorange',
      points: [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 }, { x: 5, y: 1 }],
    },
    acc: {
      color: 'steelblue',
      points: [{ x: 4, y: 5 }],
    },
    con: {
      color: 'yellowgreen',
      points: [{ x: 1, y: 4 }],
    },
    sim: {
      color: 'lightcoral',
      points: [],
    },
    dep: {
      color: 'cadetblue',
      points: [],
    }
  };
  const [colorData, setColorData] = React.useState({});

  const {
    file
  } = useFileData();

  const [columnDatas, setcolumnDatas] = React.useState([]);
  const fileReader = new FileReader();

  React.useEffect(() => {
    const colorData = {};
    for (let key in pointData) {
      const color = pointData[key]['color'];
      for (let point of pointData[key]['points']) {
        if (colorData[point.x] === undefined)
          colorData[point.x] = {};
        colorData[point.x][point.y] = color;
      }
    }
    setColorData(colorData);
  }, []);

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
  }, [file]);

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
              width: '710px',
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
                        const rowNumber = Math.floor(idx / columnList.length);
                        const columnNumber = idx % columnList.length;

                        return (
                          <React.Fragment key={idx}>
                            {rowNumber === 0
                              ? <div
                                className="grid-th"
                                key={idx}
                                style={{
                                  width: '40px',
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
                                style={{backgroundColor: colorData[rowNumber] ? colorData[rowNumber][columnNumber] : "none"}}
                                key={idx}
                              >
                                {data.slice(0, 5)}
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