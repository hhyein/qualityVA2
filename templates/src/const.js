export const mainLayoutStyle = {
  gridGap: '10px',
  gridTemplateColumns: '220px 190px 350px 330px 180px',
  gridTemplateRows: '80px 20px 30px 160px 115px 110px 150px 100px',
  gridTemplateAreas: `
    'dataset check check check check'
    'setting check check check check'
    'setting check check check check'
    'setting check check check check'
    'summary column-summary column-summary effect change'
    'row-summary table table action change'
    'row-summary table table action change'
    'row-summary table table my-combination change'
  `,
}

export const boxTitles = {
  'dataset': 'dataset',
  'setting': 'setting',
  'summary': 'summary',
  'row-summary': 'row-summary',
  'column-summary': 'column-summary',
  'check': 'check',
  'effect': 'effect',
  'table': 'table',
  'action': 'action',
  'my-combination': 'my-combination',
  'change': 'change'
}

export const PORT = 5000