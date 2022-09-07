export const mainLayoutStyle = {
  gridGap: '10px',
  gridTemplateColumns: '220px 100px 330px 250px',
  gridTemplateRows: '80px 20px 30px 300px 150px 150px 100px',
  gridTemplateAreas: `
    'dataset check check change'
    'setting check check change'
    'setting check check change'
    'setting check check change'
    'combination combination action my-combination'
    'combination combination action action-detail'
    'combination combination action action-detail'
  `,
}

export const boxTitles = {
  'dataset': 'dataset',
  'setting': 'setting',
  'check': 'check',
  'change': 'change',
  'combination': 'combination',
  'action': 'action',
  'my-combination': 'my-combination',
  'action-detail': 'action-detail',
}

export const PORT = 5000