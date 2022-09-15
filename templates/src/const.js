export const mainLayoutStyle = {
  gridGap: '10px',
  gridTemplateColumns: '220px 100px 350px 280px',
  gridTemplateRows: '80px 20px 30px 250px 110px 150px 100px',
  gridTemplateAreas: `
    'dataset check check check'
    'setting check check check'
    'setting check check check'
    'setting check check check'
    'combination combination action my-combination'
    'combination combination action action-detail'
    'combination combination action action-detail'
  `,
}

export const boxTitles = {
  'dataset': 'dataset',
  'setting': 'setting',
  'check': 'check',
  'combination': 'combination',
  'action': 'action',
  'my-combination': 'my-combination',
  'action-detail': 'action-detail',
}

export const PORT = 5000