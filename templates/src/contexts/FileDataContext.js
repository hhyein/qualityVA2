import axios from 'axios'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { PORT } from '../const'

export const fetchData = async route => {
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

export const postData = async (route, params, config) => {
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
  const [settingValues, setSettingValues] = useState({
    purpose: undefined,
    column: undefined,
    model: undefined,
    eval: undefined,
    metric: undefined
  })
  const [purposeList, setPurposeList] = useState()
  const [modelSettingData, setModelSettingData] = useState({})
  const [combinationTableData, setCombinationTableData] = useState({})
  const [combinationTableSortingInfo, setCombinationTableSortingInfo] = useState({})
  const [selectedCombinationTableRow, setSelectedCombinationTableRow] = useState()
  const [myCombinationRadioValue, setMyCombinationRadioValue] = React.useState('knn');
  const [myCombinationData, setMyCombinationData] = React.useState();
  const [selectedLegendIdx, setSelectedLegendIdx] = useState(0);
  const [treeChartData, setTreeChartData] = useState();
  const [donutChartData, setDonutChartData] = useState();
  const [tablePointData, setTablePointData] = useState();
  const [actionRadioValue, setActionRadioValue] = useState('recommend');
  const [visualizationData, setVisualizationData] = useState();
  const [modelTableData, setModelTableData] = useState();
  const [changeCntData, setChangeCntData] = useState();
  const [changeDistortData, setChangeDistort] = useState();

  const isEmptyData = data => {
    return Object.values(data).some(value => value === undefined)
  }

  const handleSettingValuesChange = useCallback(async () => {
    if (Object.values(settingValues).some(value => value === undefined)) {
      return
    }
    await postData('/setting', settingValues)
  }, [settingValues])

  useEffect(() => {
    handleSettingValuesChange()
  }, [handleSettingValuesChange])

  const updatePurposeList = useCallback(async () => {
    const { purposeList } = await fetchData('/setting')
    setPurposeList(purposeList)
  }, [])

  const handlePurposeChange = useCallback(async () => {
    if (!settingValues.purpose) {
      return
    }
    setCombinationTableSortingInfo(prev => ({
      ...prev,
      isAscending: settingValues.purpose.label === 'prediction',
    }))
    await postData('/setting', settingValues)
    const { columnList, modelList, evalList, dimensionList } = await fetchData('/setting')
    setModelSettingData({
      columnList,
      modelList,
      evalList,
      dimensionList,
    })
    updateDonutChartData(0)
    updateTablePointData(0)
  }, [settingValues])

  useEffect(() => {
    handlePurposeChange()
  }, [handlePurposeChange])

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
    },
    [updatePurposeList]
  )

  const updateCombinationTable = useCallback(async () => {
    const combinationData = await fetchData('/combination')
    setCombinationTableSortingInfo(prev => ({
      ...prev,
      column: combinationData.inputEvalList[0],
    }))
    setCombinationTableData({ combinationData })
  }, [])

  const updateDonutChartData = async (fileName) => {
    const option = {
      fileName: fileName
    }
    const donutData = await postData('/donutChart', option);
    setDonutChartData(donutData);
  }

  const updateTablePointData = async (fileName) => {
    const option = {
      fileName: fileName
    }
    const tableData = await postData('/tablePoint', option);
    setTablePointData(tableData);
  }

  const updateVisualizationData = async (fileName, visualization, metricValue, column, outlier) => {
    const option = {
      fileName: fileName,
      visualization: visualization,
      metricValue: metricValue,
      column: column,
      outlier: outlier
    }
    const visualizationData = await postData('/checkVisualization', option);
    setVisualizationData(visualizationData);
  }

  const updateModelTableData = async (fileName) => {
    const option = {
      fileName: fileName
    }
    const modelTableData = await postData('/modelTable', option);
    setModelTableData(modelTableData);
  }

  const updateChangeCntData = async (fileName) => {
    const option = {
      fileName: fileName
    }
    const changeCntData = await postData('/changeCnt', option);
    setChangeCntData(changeCntData);
  }

  const updateChangeDistortData = async (fileName) => {
    const option = {
      fileName: fileName
    }
    const changeDistortData = await postData('/changeDistort', option);
    setChangeDistort(changeDistortData);
  }

  useEffect(() => {
    if (!file || isEmptyData(settingValues)) {
      return
    }
    updateCombinationTable()
    updateVisualizationData(0, 'heatmapChart', 'completeness')
    updateModelTableData(0)
    updateChangeCntData(0)
    updateChangeDistortData(0)
  }, [
    file,
    updateCombinationTable,
    settingValues,
  ])

  return (
    <FileDataContext.Provider
      value={{
        file,
        isEmptyData,
        handleDrop,
        purposeList,
        modelSettingData,
        combinationTableData,
        combinationTableSortingInfo,
        setCombinationTableSortingInfo,
        selectedCombinationTableRow,
        setSelectedCombinationTableRow,
        setSettingValues,
        settingValues,
        setMyCombinationRadioValue,
        myCombinationRadioValue,
        setMyCombinationData,
        myCombinationData,
        selectedLegendIdx,
        setSelectedLegendIdx,
        treeChartData,
        setTreeChartData,
        donutChartData,
        tablePointData,
        actionRadioValue,
        setActionRadioValue,
        visualizationData,
        updateVisualizationData,
        modelTableData,
        changeCntData,
        changeDistortData
      }}
    >
      {children}
    </FileDataContext.Provider>
  )
}

export const useFileData = () => useContext(FileDataContext)