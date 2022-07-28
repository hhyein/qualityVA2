import React from "react"

export default function ModelDetailTable(props) {
  const { data = [] } = props

  return data.length > 0 ? (
    <table style={{ minWidth: "100%", margin: 0 }}>
      <thead>
        <tr>
          {Object.keys(data[0]).map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(({ key, ...others }, rowIdx) => (
          <tr key={rowIdx}>
            {Object.values(others).map((chart, colIdx) => (
              <td
                key={`${rowIdx}${colIdx}`}
                style={{
                  width: "70px",
                  textAlign: "center",
                }}
              >
                {chart}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <></>
  )
}
