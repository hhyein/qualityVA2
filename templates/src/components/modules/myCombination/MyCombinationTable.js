import React from 'react'
import Select from 'react-select'

export default function MyCombination({
}) {

  const data = [{
    combination: '1',
    combinationDetail: '1',
    key: 1,
    model: "1"
  }]

  console.log(data);

  const columnKeys = Object.keys(data[0]).slice(1)
  const [selectList, setSelectList] = React.useState([
    {
      label: 'item0',
      value: 0
    },
    {
      label: 'item1',
      value: 1
    }
  ])

  return data.length > 0 ? (
    <>
      <div style={{
        display: 'flex',
        marginBottom: '30px'
      }}>
        <div style={{
          width: '66%',
          margin: '0 2%'
        }}>
          <Select
            options={selectList}
            placeholder={<div>select</div>}
          />
        </div>
        <div style={{
          width: '22%',
          margin: '2% 2% 0 6%'
        }}>
          order: 2
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `auto auto auto auto`,
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

        <React.Fragment>
          <div
            className="grid-td"
            style={{
              fontWeight: 'bold',
              borderBottom: undefined,
            }}
          >
            1
          </div>
          {Object.values([1, 2, 3]).map((chart, colIdx) => (
            <div
              className="grid-td"
              key={`${123}${colIdx}`}
              style={{
                borderRight:
                  colIdx === columnKeys.length - 1 ? 'none' : undefined,
                borderBottom: undefined,
              }}
            >
              {chart}
            </div>
          ))}
        </React.Fragment>
      </div>
    </>
  ) : (
    <></>
  )
}
