export const mainLayoutStyle = {
  gridGap: '10px',
  gridTemplateColumns: '250px 400px 400px',
  gridTemplateRows: '80px 80px 250px 80px 80px 80px 80px',
  gridTemplateAreas: `
    'dataset overview overview'
    'setting overview overview'
    'setting improvement evaluation'
    'combination improvement evaluation'
    'combination improvement evaluation'
    'combination improvement evaluation'
    'combination improvement evaluation'
  `,
}

export const boxTitles = {
  'dataset': 'dataset',
  'setting': 'setting',
  'overview': 'overview',
  'combination': 'combination',
  'improvement': 'improvement',
  'evaluation': 'evaluation',
}

export const PORT = 5000