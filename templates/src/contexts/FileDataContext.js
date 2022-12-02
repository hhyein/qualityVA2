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
    column: undefined,
    model: undefined,
    eval: undefined
  })
  const [modelSettingData, setModelSettingData] = useState({})
  const [combinationTableData, setCombinationTableData] = useState({})
  const [combinationTableSortingInfo, setCombinationTableSortingInfo] = useState({})
  const [selectedCombinationTableRow, setSelectedCombinationTableRow] = useState()
  const [myCombinationRadioValue, setMyCombinationRadioValue] = React.useState('knn');
  const [selectedLegendIdx, setSelectedLegendIdx] = useState(0);
  const [treeChartData, setTreeChartData] = useState(0);
  const [donutChartData, setDonutChartData] = useState();
  const [tablePointData, setTablePointData] = useState();
  const [actionRadioValue, setActionRadioValue] = useState('recommend');
  const [visualizationData, setVisualizationData] = useState();
  const [modelTableData, setModelTableData] = useState();
  const [changeCntData, setChangeCntData] = useState();
  const [changeDistortData, setChangeDistort] = useState();
  const [checkTableData, setCheckTableData] = useState({
    key: 'row',
    data: 1
  });
  const [treeChartNode, setTreeChartNode] = useState(0);
  const [tableData, setTableData] = useState();
  const [customValues, setCustomValues] = useState({
    select: 'row',
    selectDetail: 1,
    action: undefined
  })
  const [selectedCombinationTableData, setSelectedCombinationTableData] = useState();

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

  const updateSettingList = useCallback(async () => {
    const { columnList, modelList, evalList, dimensionList } = await fetchData('/setting')
    setModelSettingData({
      columnList,
      modelList,
      evalList,
      dimensionList,
    })
  }, [])

  const handleDrop = useCallback(
    async files => {
      setFile(files[0])
      var formData = new FormData()
      const config = {
        header: { 'content-type': 'multipart/form-data' },
      }
      formData.append('file', files[0])
      await postData('/fileUpload', formData, config)
      await updateSettingList()
    },
    [updateSettingList]
  )

  const updateCombinationTable = useCallback(async () => {
    const combinationData = await fetchData('/combination')
    setCombinationTableSortingInfo(prev => ({
      ...prev,
      column: combinationData.inputEvalList[0],
    }))
    setCombinationTableData({ combinationData })
  }, [])
  
  useEffect(() => {
    if (!file || isEmptyData(settingValues)) {
      return
    }
    updateCombinationTable()
    updateChangeDistortData(treeChartNode)
  }, [file, updateCombinationTable, settingValues, treeChartNode])

  useEffect(() => {
    if (!file) {
      return
    }
    updateDonutChartData(treeChartNode)
    updateTablePointData(treeChartNode)
    updateModelTableData(treeChartNode)
    updateVisualizationData(treeChartNode, 'heatmapChart', 'completeness', {rowIdx: 0, columnIdx: 0})
    updateChangeCntData(treeChartNode)
    updateTableData(treeChartNode)
  }, [file, treeChartNode])

  useEffect(() => {
    if (!selectedCombinationTableData) {
      return
    }
    updateRecommendData()
    // updateVisualizationData(treeChartNode, 'heatmapChart', 'completeness', {rowIdx: 0, columnIdx: 0})
  }, [selectedCombinationTableData])

  const updateRecommendData = async () => {
    const option = {
      ...selectedCombinationTableData,
    }
    const tableData = await postData('/recommend', option);
  }

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

  const updateVisualizationData = async (fileName, visualization, metricValue, params) => {
    const option = {
      fileName: fileName,
      visualization: visualization,
      metricValue: metricValue,
      ...params,
    }
    const visualizationData = await postData('/checkVisualization', option);
    setVisualizationData(visualizationData);
  }

  const updateModelTableData = async (fileName) => {
    const option = {
      fileName: fileName 
    }
    const modelTableData = await postData('/modelTable', option);
    setModelTableData(modelTableData.modelResultData);
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

  const updateTableData = async (fileName) => {
    const option = {
      fileName: fileName 
    }
    const tableData = await postData('/tableData', option);
    setTableData(tableData);
  }

  const updateCustomData = async (fileName) => {
    const option = {
      ...customValues,
      fileName: fileName 
    }
    const tableData = await postData('/new', option);
  }

  return (
    <FileDataContext.Provider
      value={{
        file,
        isEmptyData,
        handleDrop,
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
        changeDistortData,
        checkTableData,
        setCheckTableData,
        treeChartNode,
        setTreeChartNode,
        tableData,
        setCustomValues,
        customValues,
        updateCustomData,
        setSelectedCombinationTableData,
        selectedCombinationTableData
      }}
    >
      {children}
    </FileDataContext.Provider>
  )
}

export const useFileData = () => useContext(FileDataContext)