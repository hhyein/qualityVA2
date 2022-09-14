import React, { useState } from 'react'
import Legend from '../../charts/Legend'
import { useFileData } from '../../../contexts/FileDataContext'

export default function ChangeTable() {
  const {
    file
  } = useFileData();

  const [columnDatas, setcolumnDatas] = useState([]);
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


  return columnDatas.length > 0 ? (
    <div style={{
      overflow: 'scroll',
      maxWidth: '300px',
      maxHeight: '280px',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'auto auto auto auto auto auto auto auto auto auto auto auto auto'
        // gridTemplateColumns: `110px 55px 35px 95px 70px 35px 80px 80px 140px 95px 110px 55px 90px`,
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
                          // width: '160px',
                          cursor: 'default',
                          background: undefined,
                          textAlign: 'center',
                          fontWeight: 'bold',
                          borderRight: idx === data.length - 1 ? 'none' : undefined,
                        }}
                      >
                        {data}
                      </div>
                      : <div
                        className="grid-td"
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
  ) : (
    <></>
  )
}