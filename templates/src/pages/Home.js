import React from 'react'
import { mainLayoutStyle } from '../const'
import Dataset from '../components/modules/dataset'
import Setting from '../components/modules/setting'
import ActionDetail from '../components/modules/actionDetail'
import Check from '../components/modules/check'
import Overview from '../components/modules/overview'
import Combination from '../components/modules/combination'
import MyCombination from '../components/modules/myCombination'
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
        <div style={{
          position: 'absolute',
          top: '310px',
          left: '238px',
          width: '350px'
        }}>
          <MyCombination />
        </div>
        <Action />
        <ActionDetail />
        <Overview />
      </div>
    </FileDataProvider>
  )
}

export default Home
