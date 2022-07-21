import React from 'react'
import { mainLayoutStyle } from '../const'
import Dataset from '../components/modules/dataset'
import ModelSetting from '../components/modules/modelSetting'
import CombinationSetting from '../components/modules/combinationSetting'
import Check from '../components/modules/check'
import Overview from '../components/modules/overview'
import Improvement from '../components/modules/improvement'
import Evaluation from '../components/modules/evaluation'
import { FileDataProvider } from '../contexts/FileDataContext'

const Home = () => {
  return (
    <FileDataProvider>
      <div className="main" style={mainLayoutStyle}>
        <Dataset />
        <ModelSetting />
        <CombinationSetting />
        <Check />
        <Overview />
        <Improvement />
        <Evaluation />
      </div>
    </FileDataProvider>
  )
}

export default Home
