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
  'dataset': 'data upload',
  'setting': 'system setting',
  'check': 'data quality assessment',
  'effect': 'quality impact by action',
  'table': 'table',
  'action': 'data quality improvement',
  'my-combination': 'my combination',
  'change': 'data change'
}

export const PORT = 5000