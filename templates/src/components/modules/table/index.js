import React from 'react'
import { Box } from '../../Box'
import { useFileData } from '../../../contexts/FileDataContext'
import RowSummaryChart from '../../charts/RowSummaryChart'
import ColumnSummaryChart from '../../charts/ColumnSummaryChart'

export default function Table() {
  const {
    isEmptyData,
    modelSettingData: { columnList },
    settingValues
  } = useFileData()

  const pointData = {
    com: {
      rColor: 255,
      gColor: 140,
      bColor: 0,
      points: [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 }, { x: 5, y: 1 }],
    },
    acc: {
      rColor: 70,
      gColor: 130,
      bColor: 180,
      points: [{ x: 4, y: 5 }],
    },
    con: {
      rColor: 154,
      gColor: 205,
      bColor: 50,
      points: [{ x: 1, y: 4 }],
    },
    sim: {
      rColor: 240,
      gColor: 128,
      bColor: 128,
      points: [],
    },
    dep: {
      rColor: 95,
      gColor: 158,
      bColor: 160,
      points: [],
    }
  };

  const [rColorData, setrColorData] = React.useState({});
  const [gColorData, setgColorData] = React.useState({});
  const [bColorData, setbColorData] = React.useState({});

  const {
    file
  } = useFileData();

  const [columnDatas, setcolumnDatas] = React.useState([]);
  const fileReader = new FileReader();

  const [gridData, setGridData] = React.useState('');

  const [checkTableData, setCheckTableData] = React.useState({
    key: 'row',
    data: 1
  });

  const handleTableClick = (key, idx) => {
    setCheckTableData({
      key: key,
      data: idx
    });
  }


  React.useEffect(() => {
    const rColorData = {};
    const gColorData = {};
    const bColorData = {};

    for (let key in pointData) {
      const rColor = pointData[key]['rColor'];
      const gColor = pointData[key]['gColor'];
      const bColor = pointData[key]['bColor'];

      for (let point of pointData[key]['points']) {
        if (rColorData[point.x] === undefined)
          rColorData[point.x] = {};
        rColorData[point.x][point.y+1] = rColor;

        if (gColorData[point.x] === undefined)
          gColorData[point.x] = {};
        gColorData[point.x][point.y+1] = gColor;

        if (bColorData[point.x] === undefined)
          bColorData[point.x] = {};
        bColorData[point.x][point.y+1] = bColor;
      }
    }

    setrColorData(rColorData);
    setgColorData(gColorData);
    setbColorData(bColorData);
  }, []);

  React.useEffect(() => {
    if (file) {
      fileReader.onload = (e) => {
        const csvOutput = e.target.result;
        const code = csvOutput.toString().split('\r\n');
        const codeData = [];
        for (let i = 0; i < code.length-1; i++) {
          codeData.push(code[i].split(","));
        }
        codeData[0].unshift('idx');
        for(let i=1;i<codeData.length;i++) {
          codeData[i].unshift(`${i}`);
        }
        const columnWidth = 685/(codeData[0].length);
        setGridData(Array.from({length: codeData[0].length }, () => `${columnWidth}px`).join(" "));
        setcolumnDatas(codeData);
      };
      fileReader.readAsText(file);
    }
  }, [file]);

  const getBgColor = (rowNumber, columnNumber) => {
    if((checkTableData.key === 'row' && checkTableData.data === rowNumber) || (checkTableData.key === 'col' && checkTableData.data === columnNumber)) {
      if(columnNumber > 0 && rColorData[rowNumber] && rColorData[rowNumber][columnNumber]) {
        return `rgba(${rColorData[rowNumber][columnNumber]}, ${gColorData[rowNumber][columnNumber]}, ${bColorData[rowNumber][columnNumber]}, 0.7)`;
      }
      return '#eee';
    }
    if(columnNumber > 0 && rColorData[rowNumber] && rColorData[rowNumber][columnNumber]) {
      return `rgba(${rColorData[rowNumber][columnNumber]}, ${gColorData[rowNumber][columnNumber]}, ${bColorData[rowNumber][columnNumber]}, 0.5)`;
    }
    return undefined;
  }

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
                gridTemplateColumns: gridData
              }}>
                {columnDatas.map((columnData, rowIdx) => {
                  const onClickRow = () => handleTableClick('row', rowIdx)
                  return (
                    <React.Fragment key={`col${rowIdx}`}>
                      {columnData.map((data, idx) => {
                        const rowNumber = rowIdx;
                        const columnNumber = idx;
                        const onClickCol = () => handleTableClick('col', idx)
                        return (
                          <React.Fragment key={idx}>
                            {rowNumber === 0
                              ? <div
                                className="grid-th"
                                key={idx}
                                onClick={idx > 0 ? onClickCol : undefined}
                                style={{
                                  cursor: idx > 0 ? 'pointer' : 'default',
                                  background: getBgColor(rowNumber, columnNumber),
                                  textAlign: 'center',
                                  fontWeight: 'bold',
                                }}
                                >
                                  {data.slice(0, 5)}
                                </div>
                              : <div
                                className="grid-td"
                                onClick={idx === 0 ? onClickRow : undefined}
                                style={{
                                  backgroundColor: getBgColor(rowNumber, columnNumber),
                                  cursor: idx === 0 ? 'pointer' : 'default',
                                }}
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