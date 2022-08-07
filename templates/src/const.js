export const mainLayoutStyle = {
  gridGap: '10px',
  gridTemplateColumns: '220px 330px 400px 245px',
  gridTemplateRows: '80px 20px 30px 300px 100px 150px 150px',
  gridTemplateAreas: `
    'dataset combination action my-combination'
    'setting combination action my-combination'
    'setting combination action my-combination'
    'setting combination action action-detail'
    'check overview overview overview'
    'check overview overview overview'
    'check overview overview overview'
  `,
}

export const boxTitles = {
  'dataset': 'dataset',
  'setting': 'setting',
  'action-detail': 'action-detail',
  'overview': 'overview',
  'check': 'check',
  'combination': 'combination',
  'action': 'action',
  'my-combination': 'my-combination',
}

export const PORT = 5000