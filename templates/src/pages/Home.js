import React from 'react'
import { mainLayoutStyle } from '../const'
import Dataset from '../components/modules/dataset'
import Setting from '../components/modules/setting'
import Combination from '../components/modules/combination'
import Overview from '../components/modules/overview'
import Improvement from '../components/modules/improvement'
import Evaluation from '../components/modules/evaluation'
import { FileDataProvider } from '../contexts/FileDataContext'

const Home = () => {
  return (
    <FileDataProvider>
      <div className="main" style={mainLayoutStyle}>
        <Dataset />
        <Setting />
        <Combination />
        <Overview />
        <Improvement />
        <Evaluation />
      </div>
    </FileDataProvider>
  )
}

export default Home
