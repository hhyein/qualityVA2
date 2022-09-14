import React from 'react'

export default function MyCombination({data}) {
  const columnKeys = Object.keys(data[0]).slice(1)
  const [dataList, setDataList] = React.useState();
  
  React.useEffect(() => {
    setDataList(data.map(d => ({
      key: d.key,
      ...['combination', 'combinationDetail'].reduce(
        (acc, cur) => ({
          ...acc,
          [cur]: (
            <div style={{ display: 'flex' }}>
              {d[cur].map(imgName => (
                <img
                  src={require(`../../icons/${imgName}.png`)}
                  alt={''}
                  style={{ height: '25px', width: '25px' }}
                />
              ))}
            </div>
          ),
        }),
        {}
      ),
    })));
  }, [data])


  return dataList && dataList.length > 0 ? (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `auto auto auto`,
        }}
      >
        <div className="grid-th" />
        {columnKeys.map((key, i) => {
          return (
            <div
              className="grid-th"
              key={key}
              style={{
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

        {dataList.map(({ key, ...others }, rowIdx) => {
          const isLastRow = rowIdx === dataList.length - 1
          return (
            <React.Fragment key={key}>
              <div
                className="grid-td"
                style={{
                  fontWeight: 'bold',
                  borderBottom: isLastRow ? 'none' : undefined,
                }}
              >
                {key}
              </div>
              {Object.values(others).map((chart, colIdx) => (
                <div
                  className="grid-td"
                  key={`${key}${colIdx}`}
                  style={{
                    borderRight:
                      colIdx === columnKeys.length - 1 ? 'none' : undefined,
                    borderBottom: isLastRow ? 'none' : undefined,
                  }}
                >
                  {chart}
                </div>
              ))}
            </React.Fragment>
          )
        })}
      </div>
    </>
  ) : (
    <></>
  )
}
