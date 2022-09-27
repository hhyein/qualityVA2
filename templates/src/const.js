export const mainLayoutStyle = {
  gridGap: '10px',
  gridTemplateColumns: '220px 190px 350px 330px 180px',
  gridTemplateRows: '80px 35px 30px 120px 115px 110px 150px 100px',
  gridTemplateAreas: `
    'dataset check check check check'
    'setting check check check check'
    'setting check check check check'
    'setting check check check check'
    'table table table effect my-combination'
    'table table table action change'
    'table table table action change'
    'table table table action change'
  `,
}

export const boxTitles = {
  'dataset': 'dataset',
  'setting': 'setting',
  'check': 'check',
  'effect': 'effect',
  'table': 'table',
  'action': 'action',
  'my-combination': 'my-combination',
  'change': 'change'
}

export const PORT = 5000