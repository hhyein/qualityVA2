import axios from 'axios'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { PORT } from '../const'

const fetchData = async route => {
  try {
    const res = await axios.get(
      `http://${window.location.hostname}:${PORT}${route}?${Math.random()}`
    )
    return res.data
  } catch (e) {
    console.log(`ERROR - ${e.message}`)
    return undefined
  }
}

const postData = async (route, params, config) => {
  try {
    const res = await axios.post(
      `http://${window.location.hostname}:${PORT}${route}?${Math.random()}`,
      params,
      config
    )
    return res.data
  } catch (e) {
    console.log(`ERROR - ${e.message}`)
    return undefined
  }
}

const FileDataContext = React.createContext()

export const FileDataProvider = ({ children }) => {
  const [file, setFile] = useState()
  const [modelSettingValues, setModelSettingValues] = useState({
    purpose: undefined,
    column: undefined,
    model: undefined,
    eval: undefined,
  })
  const [combinationSettingValues, setCombinationSettingValues] = useState()

  const [purposeList, setPurposeList] = useState()
  const [modelSettingData, setModelSettingData] = useState({})
  const [combinationTableData, setCombinationTableData] = useState({})
  const [combinationTableSortingInfo, setCombinationTableSortingInfo] = useState({})
  const [selectedCombinationTableRow, setSelectedCombinationTableRow] = useState()

  const isEmptyData = data => {
    return Object.values(data).some(value => value === undefined)
  }

  const handleModelSettingValuesChange = useCallback(async () => {
    if (Object.values(modelSettingValues).some(value => value === undefined)) {
      return
    }
    await postData('/modelSetting', modelSettingValues)
  }, [modelSettingValues])

  useEffect(() => {
    handleModelSettingValuesChange()
  }, [handleModelSettingValuesChange])

  const updatePurposeList = useCallback(async () => {
    const { purposeList } = await fetchData('/modelSetting')
    setPurposeList(purposeList)
  }, [])

  const handlePurposeChange = useCallback(async () => {
    if (!modelSettingValues.purpose) {
      return
    }
    setCombinationTableSortingInfo(prev => ({
      ...prev,
      isAscending: modelSettingValues.purpose.label === 'prediction',
    }))
    await postData('/modelSetting', modelSettingValues)
    const { columnList, modelList, evalList, dimensionList } = await fetchData('/modelSetting')
    setModelSettingData({
      columnList,
      modelList,
      evalList,
      dimensionList,
    })
  }, [modelSettingValues.purpose])

  const handleDrop = useCallback(
    async files => {
      setFile(files[0])
      var formData = new FormData()
      const config = {
        header: { 'content-type': 'multipart/form-data' },
      }
      formData.append('file', files[0])
      await postData('/fileUpload', formData, config)
      await updatePurposeList()
      setCombinationSettingValues({
        value1: 0,
        value2: 0,
        value3: 0
      })
    },
    [updatePurposeList]
  )

  useEffect(() => {
    handlePurposeChange()
  }, [handlePurposeChange])

  const postCombinationValue = async () => {
    await postData('/combinationSetting', combinationSettingValues);
  };

  const updateCombinationTable = useCallback(async () => {
    const combinationData = await fetchData('/combination')
    setCombinationTableSortingInfo(prev => ({
      ...prev,
      column: combinationData.inputEvalList[0],
    }))
    setCombinationTableData({ combinationData })
  }, [])

  useEffect(() => {
    if (!file || isEmptyData(modelSettingValues)) {
      return
    }
    updateCombinationTable()
  }, [
    file,
    updateCombinationTable,
    modelSettingValues,
  ])

  return (
    <FileDataContext.Provider
      value={{
        file,
        isEmptyData,
        handleDrop,
        modelSettingValues,
        setModelSettingValues,
        purposeList,
        modelSettingData,
        combinationSettingValues,
        setCombinationSettingValues,
        combinationTableData,
        combinationTableSortingInfo,
        setCombinationTableSortingInfo,
        selectedCombinationTableRow,
        setSelectedCombinationTableRow,
      }}
    >
      {children}
    </FileDataContext.Provider>
  )
}

export const useFileData = () => useContext(FileDataContext)