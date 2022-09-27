import React from 'react'
import { mainLayoutStyle } from '../const'
import Dataset from '../components/modules/dataset'
import Setting from '../components/modules/setting'
import Check from '../components/modules/check'
import Effect from '../components/modules/effect'
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
        <Check />
        <Effect />
        <Table />
        <Action />
        <MyCombination />
        <Change />
      </div>
    </FileDataProvider>
  )
}

export default Home
