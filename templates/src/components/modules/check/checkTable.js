import React from 'react'
import { useFileData } from '../../../contexts/FileDataContext'

export default function checkTable() {

  const data = [
    ['Model', 'Acc', 'Pre', 'Rec', 'AUC'],
    ['LR', '2.43', '5.64', '3.06', '1.04'],
    ['NB', '2.43', '5.64', '3.06', '1.04'],
    ['DT', '2.43', '5.64', '3.06', '1.04'],
    ['SVM', '2.43', '5.64', '3.06', '1.04'],
    ['RBFSVM', '2.43', '5.64', '3.06', '1.04'],
    ['GPC', '2.43', '5.64', '3.06', '1.04'],
    ['MLP', '2.43', '5.64', '3.06', '1.04'],
  ];

  const colorData = ['', 'darkorange', 'steelblue', 'yellowgreen', 'lightcoral', 'darkgray', 'lightblue', 'lightgreen'];

  return data.length > 0 && (
    <div style={{
      // overflow: 'scroll',
      marginTop: '5px',
      width: '250px',
      height: '300px',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'auto auto auto auto auto'
      }}>
        {data.map((columnData, rowIdx) => {
          return (
            <React.Fragment key={`col${rowIdx}`}>
              {columnData.map((data, idx) => {
                return (
                  <React.Fragment key={idx}>
                    {rowIdx === 0
                      ? <div
                        className="grid-td"
                        key={idx}
                        style={{
                          cursor: 'default',
                          background: undefined,
                          textAlign: 'center',
                          fontWeight: 'bold',
                          borderRight: 'none',
                          height: '20px',
                        }}
                      >
                        {data}
                      </div>
                      : <div
                        className="grid-td"
                        style={{
                          borderRight: 'none',
                          height: '20px',
                        }}
                        key={idx}
                      >
                        {idx === 0
                          ? <div style={{
                            backgroundColor: colorData[rowIdx],
                            padding: '1px 7px',
                            borderRadius: '3px',
                            color: 'white'
                          }}>{data}</div>
                          : data
                        }
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
  )
}
