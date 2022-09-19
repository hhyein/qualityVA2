export const mainLayoutStyle = {
  gridGap: '10px',
  gridTemplateColumns: '220px 100px 350px 280px 200px',
  gridTemplateRows: '80px 20px 30px 250px 100px 110px 150px 100px',
  gridTemplateAreas: `
    'dataset check check check check'
    'setting check check check check'
    'setting check check check check'
    'setting check check check check'
    'summary column-summary column-summary effect change'
    'row-summary combination combination action change'
    'row-summary combination combination action change'
    'row-summary my-combination my-combination my-combination change'
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
  'combination': 'combination',
  'action': 'action',
  'my-combination': 'my-combination',
  'change': 'change'
}

export const PORT = 5000