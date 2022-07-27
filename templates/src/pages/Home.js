import React from 'react'
import { mainLayoutStyle } from '../const'
import Dataset from '../components/modules/dataset'
import Setting from '../components/modules/setting'
import ActionDetail from '../components/modules/actionDetail'
import Check from '../components/modules/check'
import Overview from '../components/modules/overview'
import Combination from '../components/modules/combination'
import Action from '../components/modules/action'
import { FileDataProvider } from '../contexts/FileDataContext'

const Home = () => {
  return (
    <FileDataProvider>
      <div className="main" style={mainLayoutStyle}>
        <Dataset />
        <Setting />
        <Check />
        <Combination />
        <Action />
        <ActionDetail />
        <Overview />
      </div>
    </FileDataProvider>
  )
}

export default Home
