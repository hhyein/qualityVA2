import React from 'react'
import { mainLayoutStyle } from '../const'
import Dataset from '../components/modules/dataset'
import Setting from '../components/modules/setting'
import Summary from '../components/modules/summary'
import RowSummary from '../components/modules/rowSummary'
import ColumnSummary from '../components/modules/columnSummary'
import Check from '../components/modules/check'
import Effect from '../components/modules/effect'
import Combination from '../components/modules/combination'
import Action from '../components/modules/action'
import MyCombination from '../components/modules/myCombination'
import Change from '../components/modules/change'
import Table from '../components/modules/table'
import { FileDataProvider } from '../contexts/FileDataContext'

const Home = () => {
  return (
    <FileDataProvider>
      <div className="main" style={mainLayoutStyle}>
        <Dataset />
        <Setting />
        <Summary />
        <RowSummary />
        <ColumnSummary />
        <Check />
        <Effect />
        {/* <Combination /> */}
        <Table />
        <Action />
        <MyCombination />
        <Change />
      </div>
    </FileDataProvider>
  )
}

export default Home
