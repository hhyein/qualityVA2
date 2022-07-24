export const mainLayoutStyle = {
  gridGap: '10px',
  gridTemplateColumns: '180px 300px 500px 400px',
  gridTemplateRows: '30px 80px 250px 80px 80px 80px 80px',
  gridTemplateAreas: `
    'dataset overview overview overview'
    'dataset overview overview overview'
    'model-setting check improvement evaluation'
    'model-setting check improvement evaluation'
    'combination-setting check improvement evaluation'
    'combination-setting check improvement evaluation'
    'combination-setting check improvement evaluation'
  `,
}

export const boxTitles = {
  'dataset': 'dataset',
  'model-setting': 'model-setting',
  'combination-setting': 'combination-setting',
  'overview': 'overview',
  'check': 'check',
  'improvement': 'improvement',
  'evaluation': 'evaluation',
}

export const PORT = 5000