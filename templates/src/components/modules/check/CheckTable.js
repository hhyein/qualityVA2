import React from 'react'

export default function checkTable(props) {

  const { checkTableData, setCheckTableData } = props

  const data = [
    ['Model', 'MAE', 'MSE', 'RMSE', 'R2', 'RMSLE', 'MAPE'],
    ['LR', '2.43', '5.64', '3.06', '1.04', '3.06', '1.04'],
    ['NB', '2.43', '5.64', '3.06', '1.04', '3.06', '1.04'],
    ['DT', '2.43', '5.64', '3.06', '1.04', '3.06', '1.04'],
    ['SVM', '2.43', '5.64', '3.06', '1.04', '3.06', '1.04'],
    ['RBFSVM', '2.43', '5.64', '3.06', '1.04', '3.06', '1.04'],
    ['GPC', '2.43', '5.64', '3.06', '1.04', '3.06', '1.04'],
  ];

  const colorData = ['', 'darkorange', 'steelblue', 'yellowgreen', 'lightcoral', 'cadetblue', 'lightblue'];

  const handleTableClick = (idx) => {
    setCheckTableData({
      key: idx,
      data: data[idx].splice(1)
    });
  }

  return data.length > 0 && (
    <div style={{
      // overflow: 'scroll',
      marginTop: '5px',
      width: '350px',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'auto auto auto auto auto auto auto'
      }}>
        {data.map((columnData, rowIdx) => {
          return (
            <React.Fragment key={`col${rowIdx}`}>
              {columnData.map((data, idx) => {
                const onClick = () => handleTableClick(rowIdx)
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
                          borderRight: 'none',
                          height: '20px',
                        }}
                      >
                        {data}
                      </div>
                      : <div
                        className="grid-td"
                        onClick={onClick}
                        style={{
                          borderRight: 'none',
                          height: '20px',
                          cursor: 'pointer',
                          backgroundColor: checkTableData.key === rowIdx ? '#eee' : undefined,
                        }}
                        key={idx}
                      >
                        {idx === 0
                          ? <div
                            style={{
                              backgroundColor: colorData[rowIdx],
                              padding: '2px 8px',
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
