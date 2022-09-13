import React, { useState } from 'react'
import Legend from '../../charts/Legend'
import { useFileData } from '../../../contexts/FileDataContext'

export default function ChangeTable() {
  const {
    file
  } = useFileData();
  const colors = ['steelblue', 'darkorange', 'darkgreen']
  const data = [
    { label: 'missing', data: { a: 20, b: 80 } },
    { label: 'outlier', data: { a: 20, b: 80 } },
    { label: 'inconsistent', data: { a: 60, b: 40 } },
  ];

  const [legend, setLegend] = useState(0);
  const [columnKeys, setColumnKeys] = useState([]);
  // const columnKeys = ['idx', 'idx', 'idx', 'idx', 'idx'];
  const columnData = ['idx', 'idx', 'idx', 'idx', 'idx'];
  const fileReader = new FileReader();

  React.useEffect(() => {
    if (file) {
      fileReader.onload = (e) => {
        const csvOutput = e.target.result;
        // console.log(csvOutput);
        const code = csvOutput.toString().split('\r\n');
        setColumnKeys(code[0].split(","));
        console.log(code[0].split(","));
      };
      fileReader.readAsText(file);
    }
  }, [file])


  return columnKeys.length > 0 ? (
    <>
      <div style={{
        display: 'flex',
        // overflow: 'scroll',
        // maxWidth: '300px',
      }}>
      {columnKeys.map((key, i) => {
        return (
          <div
          className="grid-th"
          key={i}
          style={{
            // width: '160px',
            cursor: 'default',
            background: undefined,
            textAlign: 'center',
            fontWeight: 'bold',
            borderRight: i === columnKeys.length - 1 ? 'none' : undefined,
          }}
        >
          {key}
        </div>
        )
      })}
      </div>
      <div style={{
        display: 'flex',
      }}>
      {columnData.map((data, rowIdx) => {
        return (
          <React.Fragment key={data}>
              <div
                className="grid-td"
              >
                {data}
              </div>
          </React.Fragment>
        )
      })}
      </div>
    </>
  ) : (
    <></>
  )
}