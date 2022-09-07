import React from 'react'
import { mainLayoutStyle } from '../const'
import Dataset from '../components/modules/dataset'
import Setting from '../components/modules/setting'
import Check from '../components/modules/check'
import Change from '../components/modules/change'
import Combination from '../components/modules/combination'
import Action from '../components/modules/action'
import MyCombination from '../components/modules/myCombination'
import ActionDetail from '../components/modules/actionDetail'
import { FileDataProvider } from '../contexts/FileDataContext'

const Home = () => {
  return (
    <FileDataProvider>
      <div className="main" style={mainLayoutStyle}>
        <Dataset />
        <Setting />
        <Check />
        <Change />
        <Combination />
        <MyCombination />
        <Action />
        <ActionDetail />
      </div>
    </FileDataProvider>
  )
}

export default Home
