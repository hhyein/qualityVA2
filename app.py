from flask import *
from flask_cors import CORS

import os
import ast
import csv
import math
import json
import codecs
import itertools
import numpy as np
import pandas as pd
from io import StringIO
from scipy import stats
from collections import Counter
from pycaret.regression import *

import module.main as main
import module.tree as tree

app = Flask(__name__)
CORS(app)

uploadFileName = 'wine'
column = 'alcohol'
inputModelList = []
inputEvalList = []

combination = []
combinationDetail = []

@app.route('/fileUpload', methods=['GET', 'POST'])
def fileUpload():
  req = request.files['file']
  return json.dumps({'fileUpload': 'success'})

@app.route('/setting', methods=['GET', 'POST'])
def setting():
  global uploadFileName, column, inputModelList, inputEvalList

  originDf = pd.read_csv('static/' + uploadFileName + '.csv')
  originDf = originDf.reindex(sorted(originDf.columns), axis = 1)

  if request.method == 'GET':
    columnList = []
    tmpList = list(originDf.columns)
    for i in range(len(tmpList)):
      columnList.append({'label': tmpList[i], 'value': i})

    modelList = []
    tmpList = ['lr', 'knn', 'nb', 'dt', 'svm', 'rbfsvm', 'gpc', 'mlp', 'ridge', 'rf',
                'qda', 'ada', 'gbc', 'lda', 'et', 'xgboost', 'lightgbm', 'catboost']
    for i in range(len(tmpList)):
      modelList.append({'label': tmpList[i], 'value': i})

    evalList = []
    tmpList = ['MAE', 'MSE', 'RMSE', 'R2', 'RMSLE', 'MAPE', 'TT']
    for i in range(len(tmpList)):
      evalList.append({'label': tmpList[i], 'value': i})

    response = {}
    response['columnList'] = columnList
    response['modelList'] = modelList
    response['evalList'] = evalList
    
    return json.dumps(response)

  if request.method == 'POST':
    req = eval(request.get_data().decode('utf-8'))
    column = req["column"]["label"]
    modelList = req["model"]
    evalList = req["eval"]

    inputModelList = []
    for i in range(len(modelList)):
      inputModelList.append(modelList[i]["label"])

    inputEvalList = []
    for i in range(len(evalList)):
      inputEvalList.append(evalList[i]["label"])

    return json.dumps({'setting': 'success'})

@app.route('/donutChart', methods=['GET', 'POST'])
def donutChart():
  req = eval(request.get_data().decode('utf-8'))
  fileName = req["fileName"]

  originDf = pd.read_csv('static/dataset/' + str(fileName) + '.csv')
  originDf = originDf.reindex(sorted(originDf.columns), axis = 1)
  columnList = list(originDf.columns)
  totalNum = len(originDf) * len(list(originDf.columns))

  # completeness
  mis = sum(list(originDf.isnull().sum().values))
  misRate = round((mis/totalNum) * 100)
  
  # outlier
  tmpList = []
  for column in columnList:
    df = pd.DataFrame(pd.to_numeric(originDf[column], errors = 'coerce'))
    df = df.dropna()

    lower, upper = main.lower_upper(df[column])
    lowerIdxList = list(df[df[column] > upper].index.values)
    upperIdxList = list(df[df[column] < lower].index.values)
    tmpList.append(len(lowerIdxList + upperIdxList))
  out = sum(tmpList)
  outRate = round((out/totalNum) * 100)

  # homogeneity
  tmpList = []
  for column in columnList:
    df = originDf[column].dropna()
    df = pd.DataFrame(pd.to_numeric(df, errors = 'coerce'))
    conIdxList = list(df[df[column].isnull()].index)
    tmpList.append(len(conIdxList))
  inc = sum(tmpList)
  incRate = round((inc/totalNum) * 100)

  ##### dup, cor, rel
  dupRate = round(10)
  corRate = round(20)
  relRate = round(30)

  rateList = [misRate, outRate, incRate, dupRate, corRate, relRate]
  colorList = ['darkorange', 'steelblue', 'yellowgreen', 'lightcoral', 'cadetblue', 'mediumpurple']

  donutChartList = []
  for i in range(0, 6):
    donutChartList.append({'label': i, 'color': colorList[i], 'data': {'issue': rateList[i], 'normal': 100 - rateList[i]}})

  response = {}
  response['donutChartData'] = donutChartList

  return json.dumps(response)

@app.route('/checkVisualization', methods=['GET', 'POST'])
def checkVisualization():
  req = eval(request.get_data().decode('utf-8'))
  fileName = req["fileName"]
  vis = req["visualization"]
  metric = req["metricValue"]

  originDf = pd.read_csv('static/dataset/' + str(fileName) + '.csv')
  originDf = originDf.reindex(sorted(originDf.columns), axis = 1)
  columnList = list(originDf.columns)

  response = {}
  
  # completeness, homogeneity
  if vis == 'heatmapChart':
    sliceCnt = 10
    sliceSize = int(len(originDf)/sliceCnt)

    seriesDataList = []
    for i in range(sliceCnt):
      rowSliceDf = originDf.iloc[sliceSize * i : sliceSize * (i + 1)]
      columnCntList = []

      for column in columnList:
        columnDf = rowSliceDf[column]

        if metric == 'homogeneity':
          columnDf = rowSliceDf[column]
          columnDf = columnDf.dropna()
          columnDf = pd.to_numeric(columnDf, errors = 'coerce')

        columnCnt = columnDf.isnull().sum()
        columnCntList.append(int(columnCnt))
      seriesDataList.append({'name': 'r' + str(i), 'data': columnCntList})
      categoryDataList = []
      for i in range(len(columnList)):
        categoryDataList.append('c' + str(i))

    response['seriesData'] = seriesDataList
    response['categoryData'] = categoryDataList

  # outlier
  if vis == 'histogramChart':
    outlierMethod = req["outlier"]
    columnName = req["column"]

    columnDf = originDf[columnName]
    columnDf = columnDf.apply(pd.to_numeric, errors = 'coerce')
    lower, upper = main.lower_upper(columnDf)

    columnList = columnDf.values.tolist()
    minValue = columnDf.min()
    maxValue = columnDf.max()

    sliceCnt = 20
    sliceSize = (maxValue - minValue)/sliceCnt
    columnCntList = [0 for i in range(sliceCnt)]

    seriesDataList = []
    categoryDataList = []

    for i in range(sliceCnt):
      minRange = float(minValue + (sliceSize * i))
      maxRange = float(minValue + (sliceSize * (i + 1)))
      categoryDataList.append(maxRange)

      for j in range(len(columnList)):
        if math.isnan(columnList[j]) == False:
          if columnList[j] >= minRange and columnList[j] <= maxRange:
            columnCntList[i] = columnCntList[i] + 1

    seriesDataList.append({'name': columnName, 'data': columnCntList})
    
    response['seriesData'] = seriesDataList
    response['categoryData'] = categoryDataList

  return json.dumps(response)

# 모델 성능 계산할 시에는 mis, inc drop 처리
@app.route('/modelTable', methods=['GET', 'POST'])
def modelTable():
  req = eval(request.get_data().decode('utf-8'))
  fileName = req["fileName"]

  # originDf = pd.read_csv('static/dataset/' + str(fileName) + '.csv')
  # originDf = originDf.reindex(sorted(originDf.columns), axis = 1)
  # columnList = list(originDf.columns)

  # df = originDf.apply(pd.to_numeric, errors = 'coerce')
  # df = pd.DataFrame(df, columns = columnList)
  # df = df.dropna()

  # global column
  # clf = setup(data = df, target = column, preprocess = False, session_id = 42, use_gpu = True, silent = True)
  # model = compare_models()
  # modelResultDf = pull()

  # modelResultDf = modelResultDf.drop(['Model'], axis = 1)
  # modelResultDf = modelResultDf.drop(['TT (Sec)'], axis = 1)
  # modelResultDf['Model'] = modelResultDf.index
  
  # firstColumnList = list(modelResultDf.columns[-1:])
  # remainColumnList = list(modelResultDf.columns[:-1])
  # arrangeColumnList = firstColumnList + remainColumnList

  # modelResultDf = modelResultDf[arrangeColumnList]
  # modelResultDf.to_csv('example_modelTable.csv', index = False)

  modelResultDf = pd.read_csv('static/example_modelTable.csv')
  modelResultDf = modelResultDf.round(3)

  modelResultList = [list(modelResultDf.columns)]
  for i in range(len(modelResultDf)):
    modelResultList.append(list(modelResultDf.iloc[i]))

  response = {}
  response['modelResultData'] = modelResultList

  return json.dumps(response)

@app.route('/tableData', methods=['GET', 'POST'])
def tableData():
  req = eval(request.get_data().decode('utf-8'))
  fileName = req["fileName"]

  originDf = pd.read_csv('static/dataset/' + str(fileName) + '.csv')
  originDf = originDf.reindex(sorted(originDf.columns), axis = 1)
  originDf = originDf.fillna('')
  columnList = list(originDf.columns)

  originDfList = originDf.values.tolist()
  originDfList.insert(0, columnList)

  response = {}
  response['tableData'] = originDfList

  return json.dumps(response)

@app.route('/tablePoint', methods=['GET', 'POST'])
def tablePoint():
  req = eval(request.get_data().decode('utf-8'))
  fileName = req["fileName"]

  originDf = pd.read_csv('static/dataset/' + str(fileName) + '.csv')
  originDf = originDf.reindex(sorted(originDf.columns), axis = 1)
  columnList = list(originDf.columns)
  
  misPointList = []
  for column in columnList:
    misIdxList = list(originDf[originDf[column].isnull()].index)

    if len(misIdxList) > 0:
      for row in misIdxList:
        misPointList.append({'x': str(row + 1), 'y': columnList.index(column)})

  outPointList = []
  for column in columnList:
    df = pd.DataFrame(pd.to_numeric(originDf[column], errors = 'coerce'))
    df = df.dropna()

    lower, upper = main.lower_upper(df[column])
    lowerIdxList = list(df[df[column] > upper].index.values)
    upperIdxList = list(df[df[column] < lower].index.values)
    outIdxList = lowerIdxList + upperIdxList

    if len(outIdxList) > 0:
      for row in outIdxList:
        outPointList.append({'x': str(row + 1), 'y': columnList.index(column)})

  conPointList = []
  for column in columnList:  
    df = originDf[column].dropna()
    df = pd.DataFrame(pd.to_numeric(df, errors = 'coerce'))
    conIdxList = list(df[df[column].isnull()].index)

    if len(conIdxList) > 0:
      for row in conIdxList:
        conPointList.append({'x': str(row + 1), 'y': columnList.index(column)})

  response = {}
  response['comPointList'] = misPointList
  response['accPointList'] = outPointList
  response['conPointList'] = conPointList

  return json.dumps(response)

@app.route('/columnSummary', methods=['GET', 'POST'])
def columnSummary():
  return json.dumps({'columnSummary': 'success'})

@app.route('/rowSummary', methods=['GET', 'POST'])
def rowSummary():
  return json.dumps({'rowSummary': 'success'})

@app.route('/combination', methods=['GET', 'POST'])
def combinationTable():
  with open('static/example_combination.json') as f:
    combinationData = json.load(f)

  return json.dumps(combinationData)

@app.route('/recommend', methods=['GET', 'POST'])
def recommend():
  # req = request.get_data().decode('utf-8')
  ##### for test
  req = {'combination': ['completeness', 'outlier'], 'combinationDetail': ['min', 'iqr']}

  global uploadFileName, combination, combinationDetail
  combination = req["combination"]
  combinationDetail = req["combinationDetail"]

  originDf = pd.read_csv('static/' + uploadFileName + '.csv')
  originDf = originDf.reindex(sorted(originDf.columns), axis = 1)
  columnList = list(originDf.columns)

  beforeDf = originDf
  beforeDf.to_csv('static/dataset/0.csv', index = False)

  for i in range(len(combination)):
    issue = combination[i]
    action = combinationDetail[i]

    if issue == 'completeness':
      actionColumnDfList = []

      if action == "remove":
        columnConcatDf = beforeDf.dropna()
        columnConcatDf = columnConcatDf.reset_index(drop = True)

      else:
        for column in columnList:
          columnDf = beforeDf.loc[:, [column]]
          missingIndex = [index for index, row in columnDf.iterrows() if row.isnull().any()]

          if len(missingIndex) > 0:
            inconsNaNDf = pd.DataFrame(pd.to_numeric(columnDf.squeeze(), errors = 'coerce'))
            inconsDropDf = inconsNaNDf.dropna()

            if action == "min":
              columnDf = main.imp_min(columnDf, inconsDropDf)
            if action == "max":
              columnDf = main.imp_max(columnDf, inconsDropDf)
            if action == "mean":
              columnDf = main.imp_mean(columnDf, inconsDropDf)
            if action == "median":
              columnDf = main.imp_median(columnDf, inconsDropDf)

          else:
            columnDf = columnDf

          actionColumnDfList.append(columnDf)

        columnConcatDf = actionColumnDfList[0]
        for k in range(len(actionColumnDfList) - 1):
          columnConcatDf = pd.concat([columnConcatDf, actionColumnDfList[k + 1]], axis = 1, join = 'inner')
          columnConcatDf = columnConcatDf.reset_index(drop = True)

      beforeDf = columnConcatDf

    if issue == 'outlier':
      actionColumnDfList = []

      for column in columnList:
        columnDf = beforeDf.loc[:, [column]]
        missingIndex = [index for index, row in columnDf.iterrows() if row.isnull().any()]

        inconsNaNDf = pd.DataFrame(pd.to_numeric(columnDf.squeeze(), errors = 'coerce'))
        missingAndInconsIndex = [index for index, row in inconsNaNDf.iterrows() if row.isnull().any()]
        inconsIndex = list(set(missingAndInconsIndex) - set(missingIndex))

        if action == 'iqr':
          lower, upper = main.lower_upper(inconsNaNDf)
          lowerIdxList = list(inconsNaNDf[inconsNaNDf[column] > upper].index.values)
          upperIdxList = list(inconsNaNDf[inconsNaNDf[column] < lower].index.values)
          outlierIndex = lowerIdxList + upperIdxList

        if action == 'zscore':
          inconsNaNSeries = inconsNaNDf.dropna()
          meanValue = np.mean(inconsNaNSeries)
          stdValue = np.std(inconsNaNSeries)

          outlierIndex = []
          zscoreThreshold = 3
          for i in range(len(inconsNaNDf)):
              value = inconsNaNDf.iloc[i].values[0]
              zscore = ((value - meanValue)/stdValue).values[0]

              if zscore > zscoreThreshold:
                outlierIndex.append(i)
      
        for idx in missingIndex:
          columnDf.loc[idx, column] = np.nan

        for idx in inconsIndex:
          columnDf.loc[idx, column] = 'incons'
        
        columnDf = columnDf.drop(outlierIndex)
        actionColumnDfList.append(columnDf)

      columnConcatDf = actionColumnDfList[0]
      for k in range(len(actionColumnDfList) - 1):
        columnConcatDf = pd.concat([columnConcatDf, actionColumnDfList[k + 1]], axis = 1, join = 'inner')
        columnConcatDf = columnConcatDf.reset_index(drop = True)

      beforeDf = columnConcatDf

    if issue == 'homogeneity':
      actionColumnDfList = []

      for column in columnList:
        columnDf = beforeDf.loc[:, [column]]
        missingIndex = [index for index, row in columnDf.iterrows() if row.isnull().any()]
        
        inconsNaNDf = pd.DataFrame(pd.to_numeric(columnDf.squeeze(), errors = 'coerce'))
        missingAndInconsIndex = [index for index, row in inconsNaNDf.iterrows() if row.isnull().any()]
        inconsIndex = list(set(missingAndInconsIndex) - set(missingIndex))

        columnDf = columnDf.drop(inconsIndex)
        actionColumnDfList.append(columnDf)

      columnConcatDf = actionColumnDfList[0]
      for k in range(len(actionColumnDfList) - 1):
        columnConcatDf = pd.concat([columnConcatDf, actionColumnDfList[k + 1]], axis = 1, join = 'inner')
        columnConcatDf = columnConcatDf.reset_index(drop = True)

      beforeDf = columnConcatDf

    if issue == 'duplicate':
      df = beforeDf.drop_duplicates()
      df = df.reset_index(drop = True)

      beforeDf = df

    if issue == 'correlation' or issue == 'relevance':
      tmpList = []
      for column in columnList:
        columnSeries = beforeDf[column].dropna()
        tmpList.append(pd.to_numeric(columnSeries, errors = 'coerce'))

      inconsNaNDf = pd.concat(tmpList, axis = 1)
      allCorrDf = inconsNaNDf.corr(method = action)

      highCorrList = []
      if issue == 'correlation':
        for row in columnList:
          for column in columnList:
            if row == column: break
            if allCorrDf.loc[row][column] > corrThreshold:
              highCorrList.append([row, column])

        for i in range(len(highCorrList)):
          dropColumnName = highCorrList[i][0]
          if dropColumnName == column:
            dropColumnName = highCorrList[i][1]
          allCorrDf = allCorrDf.drop([dropColumnName], axis = 1)

      if issue == 'relevance':
        columnCorrDf = allCorrDf[column]
        
        for row in columnList:
          if columnCorrDf[row] > corrThreshold:
            highCorrList.append(row)

        for i in range(len(highCorrList)):
          dropColumnName = highCorrList[i]
          allCorrDf = allCorrDf.drop([dropColumnName], axis = 1)

      beforeDf = allCorrDf
    beforeDf.to_csv('static/dataset/' + str(i + 1) + '.csv', index = False)

  return json.dumps({'recommend': 'success'})

@app.route('/new', methods=['GET', 'POST'])
def new():
  # req = request.get_data().decode('utf-8')
  ##### for test
  req = {'fileName': '1', 'select': 'column', 'selectDetail': 'pH', 'action': 'max'}
  fileName = req["fileName"]
  select = req["select"]
  selectDetail = req["selectDetail"]
  action = req["action"]

  global combination, combinationDetail
  ##### for test
  combination = ['completeness', 'outlier']
  combinationDetail = ['min', 'iqr']
  customIssue = combination[int(fileName) - 1]
  originAction = combinationDetail[int(fileName) - 1]

  originDf = pd.read_csv('static/dataset/' + str(int(fileName) - 1) + '.csv')
  originDf = originDf.reindex(sorted(originDf.columns), axis = 1)
  columnList = list(originDf.columns)

  # customization
  if select == 'column':
    if customIssue == 'correlation' or customIssue == 'relevance':
      originDf = originDf.drop([selectDetail], axis = 1)

    if customIssue == 'homogeneity':
      actionColumnDfList = []

      for column in columnList:
        columnDf = beforeDf.loc[:, [column]]
        missingIndex = [index for index, row in columnDf.iterrows() if row.isnull().any()]
        
        inconsNaNDf = pd.DataFrame(pd.to_numeric(columnDf.squeeze(), errors = 'coerce'))
        missingAndInconsIndex = [index for index, row in inconsNaNDf.iterrows() if row.isnull().any()]
        inconsIndex = list(set(missingAndInconsIndex) - set(missingIndex))

        if column == selectDetail:
          columnDf = columnDf
        else:
          columnDf = columnDf.drop(inconsIndex)
        
        actionColumnDfList.append(columnDf)

      columnConcatDf = actionColumnDfList[0]
      for k in range(len(actionColumnDfList) - 1):
        columnConcatDf = pd.concat([columnConcatDf, actionColumnDfList[k + 1]], axis = 1, join = 'inner')
        columnConcatDf = columnConcatDf.reset_index(drop = True)

      originDf = columnConcatDf

    if customIssue == 'completeness':
      actionColumnDfList = []

      if action == 'remove':
        originDf = originDf[selectDetail].dropna()
        originDf = originDf.reset_index(drop = True)

      else:
        for column in columnList:
          columnDf = originDf.loc[:, [column]]
          missingIndex = [index for index, row in columnDf.iterrows() if row.isnull().any()]

          if len(missingIndex) > 0:
            inconsNaNDf = pd.DataFrame(pd.to_numeric(columnDf.squeeze(), errors = 'coerce'))
            inconsDropDf = inconsNaNDf.dropna()

            if column == selectDetail:
              if action == 'none':
                columnDf = columnDf
              if action == 'min':
                columnDf = main.imp_min(columnDf, inconsDropDf)
              if action == 'max':
                columnDf = main.imp_max(columnDf, inconsDropDf)
              if action == 'mean':
                columnDf = main.imp_mean(columnDf, inconsDropDf)
              if action == 'median':
                columnDf = main.imp_median(columnDf, inconsDropDf)

            else:
              if originAction == 'min':
                columnDf = main.imp_min(columnDf, inconsDropDf)
              if originAction == 'max':
                columnDf = main.imp_max(columnDf, inconsDropDf)
              if originAction == 'mean':
                columnDf = main.imp_mean(columnDf, inconsDropDf)
              if originAction == 'median':
                columnDf = main.imp_median(columnDf, inconsDropDf)
          
          else:
            columnDf = columnDf
          
          actionColumnDfList.append(columnDf)

        columnConcatDf = actionColumnDfList[0]
        for k in range(len(actionColumnDfList) - 1):
          columnConcatDf = pd.concat([columnConcatDf, actionColumnDfList[k + 1]], axis = 1, join = 'inner')
          columnConcatDf = columnConcatDf.reset_index(drop = True)

      originDf = columnConcatDf
    
    if customIssue == 'outlier':
      actionColumnDfList = []

      for column in columnList:
        columnDf = originDf.loc[:, [column]]
        missingIndex = [index for index, row in columnDf.iterrows() if row.isnull().any()]

        inconsNaNDf = pd.DataFrame(pd.to_numeric(columnDf.squeeze(), errors = 'coerce'))
        missingAndInconsIndex = [index for index, row in inconsNaNDf.iterrows() if row.isnull().any()]
        inconsIndex = list(set(missingAndInconsIndex) - set(missingIndex))

        if column == selectDetail:
          if action == 'none':
            columnDf = columnDf

          if action == 'iqr':
            lower, upper = main.lower_upper(inconsNaNDf)
            lowerIdxList = list(inconsNaNDf[inconsNaNDf[column] > upper].index.values)
            upperIdxList = list(inconsNaNDf[inconsNaNDf[column] < lower].index.values)
            outlierIndex = lowerIdxList + upperIdxList

          if action == 'zscore':
            inconsNaNSeries = inconsNaNDf.dropna()
            meanValue = np.mean(inconsNaNSeries)
            stdValue = np.std(inconsNaNSeries)

            outlierIndex = []
            zscoreThreshold = 3
            for i in range(len(inconsNaNDf)):
                value = inconsNaNDf.iloc[i].values[0]
                zscore = ((value - meanValue)/stdValue).values[0]

                if zscore > zscoreThreshold:
                  outlierIndex.append(i)

        else:
          if originAction == 'iqr':
            lower, upper = main.lower_upper(inconsNaNDf)
            lowerIdxList = list(inconsNaNDf[inconsNaNDf[column] > upper].index.values)
            upperIdxList = list(inconsNaNDf[inconsNaNDf[column] < lower].index.values)
            outlierIndex = lowerIdxList + upperIdxList

          if originAction == 'zscore':
            inconsNaNSeries = inconsNaNDf.dropna()
            meanValue = np.mean(inconsNaNSeries)
            stdValue = np.std(inconsNaNSeries)

            outlierIndex = []
            zscoreThreshold = 3
            for i in range(len(inconsNaNDf)):
                value = inconsNaNDf.iloc[i].values[0]
                zscore = ((value - meanValue)/stdValue).values[0]

                if zscore > zscoreThreshold:
                  outlierIndex.append(i)
      
        for idx in missingIndex:
          columnDf.loc[idx, column] = np.nan

        for idx in inconsIndex:
          columnDf.loc[idx, column] = 'incons'
        
        columnDf = columnDf.drop(outlierIndex)
        actionColumnDfList.append(columnDf)

      columnConcatDf = actionColumnDfList[0]
      for k in range(len(actionColumnDfList) - 1):
        columnConcatDf = pd.concat([columnConcatDf, actionColumnDfList[k + 1]], axis = 1, join = 'inner')
        columnConcatDf = columnConcatDf.reset_index(drop = True)

      originDf = columnConcatDf

  if select == 'row':
    originDf = originDf.drop([int(selectDetail)])

  originDf.to_csv('static/dataset/' + fileName + '.csv', index = False)

  # customization after dataset
  beforeDf = originDf

  for i in range(int(fileName), len(combination)):
    issue = combination[i]
    action = combinationDetail[i]

    if issue == 'completeness':
      actionColumnDfList = []

      if action == "remove":
        columnConcatDf = beforeDf.dropna()
        columnConcatDf = columnConcatDf.reset_index(drop = True)

      else:
        for column in columnList:
          columnDf = beforeDf.loc[:, [column]]
          missingIndex = [index for index, row in columnDf.iterrows() if row.isnull().any()]

          if len(missingIndex) > 0:
            inconsNaNDf = pd.DataFrame(pd.to_numeric(columnDf.squeeze(), errors = 'coerce'))
            inconsDropDf = inconsNaNDf.dropna()

            if action == "min":
              columnDf = main.imp_min(columnDf, inconsDropDf)
            if action == "max":
              columnDf = main.imp_max(columnDf, inconsDropDf)
            if action == "mean":
              columnDf = main.imp_mean(columnDf, inconsDropDf)
            if action == "median":
              columnDf = main.imp_median(columnDf, inconsDropDf)

          else:
            columnDf = columnDf

          actionColumnDfList.append(columnDf)

        columnConcatDf = actionColumnDfList[0]
        for k in range(len(actionColumnDfList) - 1):
          columnConcatDf = pd.concat([columnConcatDf, actionColumnDfList[k + 1]], axis = 1, join = 'inner')
          columnConcatDf = columnConcatDf.reset_index(drop = True)

      beforeDf = columnConcatDf

    if issue == 'outlier':
      actionColumnDfList = []

      for column in columnList:
        columnDf = beforeDf.loc[:, [column]]
        missingIndex = [index for index, row in columnDf.iterrows() if row.isnull().any()]

        inconsNaNDf = pd.DataFrame(pd.to_numeric(columnDf.squeeze(), errors = 'coerce'))
        missingAndInconsIndex = [index for index, row in inconsNaNDf.iterrows() if row.isnull().any()]
        inconsIndex = list(set(missingAndInconsIndex) - set(missingIndex))

        if action == 'iqr':
          lower, upper = main.lower_upper(inconsNaNDf)
          lowerIdxList = list(inconsNaNDf[inconsNaNDf[column] > upper].index.values)
          upperIdxList = list(inconsNaNDf[inconsNaNDf[column] < lower].index.values)
          outlierIndex = lowerIdxList + upperIdxList

        if action == 'zscore':
          inconsNaNSeries = inconsNaNDf.dropna()
          meanValue = np.mean(inconsNaNSeries)
          stdValue = np.std(inconsNaNSeries)

          outlierIndex = []
          zscoreThreshold = 3
          for i in range(len(inconsNaNDf)):
              value = inconsNaNDf.iloc[i].values[0]
              zscore = ((value - meanValue)/stdValue).values[0]

              if zscore > zscoreThreshold:
                outlierIndex.append(i)
      
        for idx in missingIndex:
          columnDf.loc[idx, column] = np.nan

        for idx in inconsIndex:
          columnDf.loc[idx, column] = 'incons'
        
        columnDf = columnDf.drop(outlierIndex)
        actionColumnDfList.append(columnDf)

      columnConcatDf = actionColumnDfList[0]
      for k in range(len(actionColumnDfList) - 1):
        columnConcatDf = pd.concat([columnConcatDf, actionColumnDfList[k + 1]], axis = 1, join = 'inner')
        columnConcatDf = columnConcatDf.reset_index(drop = True)

      beforeDf = columnConcatDf

    if issue == 'homogeneity':
      actionColumnDfList = []

      for column in columnList:
        columnDf = beforeDf.loc[:, [column]]
        missingIndex = [index for index, row in columnDf.iterrows() if row.isnull().any()]
        
        inconsNaNDf = pd.DataFrame(pd.to_numeric(columnDf.squeeze(), errors = 'coerce'))
        missingAndInconsIndex = [index for index, row in inconsNaNDf.iterrows() if row.isnull().any()]
        inconsIndex = list(set(missingAndInconsIndex) - set(missingIndex))

        columnDf = columnDf.drop(inconsIndex)
        actionColumnDfList.append(columnDf)

      columnConcatDf = actionColumnDfList[0]
      for k in range(len(actionColumnDfList) - 1):
        columnConcatDf = pd.concat([columnConcatDf, actionColumnDfList[k + 1]], axis = 1, join = 'inner')
        columnConcatDf = columnConcatDf.reset_index(drop = True)

      beforeDf = columnConcatDf

    if issue == 'duplicate':
      df = beforeDf.drop_duplicates()
      df = df.reset_index(drop = True)

      beforeDf = df

    if issue == 'correlation' or issue == 'relevance':
      tmpList = []
      for column in columnList:
        columnSeries = beforeDf[column].dropna()
        tmpList.append(pd.to_numeric(columnSeries, errors = 'coerce'))

      inconsNaNDf = pd.concat(tmpList, axis = 1)
      allCorrDf = inconsNaNDf.corr(method = action)

      highCorrList = []
      if issue == 'correlation':
        for row in columnList:
          for column in columnList:
            if row == column: break
            if allCorrDf.loc[row][column] > corrThreshold:
              highCorrList.append([row, column])

        for i in range(len(highCorrList)):
          dropColumnName = highCorrList[i][0]
          if dropColumnName == column:
            dropColumnName = highCorrList[i][1]
          allCorrDf = allCorrDf.drop([dropColumnName], axis = 1)

      if issue == 'relevance':
        columnCorrDf = allCorrDf[column]
        
        for row in columnList:
          if columnCorrDf[row] > corrThreshold:
            highCorrList.append(row)

        for i in range(len(highCorrList)):
          dropColumnName = highCorrList[i]
          allCorrDf = allCorrDf.drop([dropColumnName], axis = 1)

      beforeDf = allCorrDf
    beforeDf.to_csv('static/dataset/' + str(i + 1) + '.csv', index = False)

  return json.dumps({'new': 'success'})

@app.route('/changeCnt', methods=['GET', 'POST'])
def changeCnt():
  global uploadFileName
  beforeDf = pd.read_csv('static/' + uploadFileName + '.csv')
  beforeList = [len(beforeDf), len(beforeDf.columns), len(beforeDf) * len(beforeDf.columns)]
  
  req = eval(request.get_data().decode('utf-8'))
  fileName = req["fileName"]

  afterDf = pd.read_csv('static/dataset/' + str(fileName) + '.csv')
  afterList = [len(afterDf), len(afterDf.columns), len(afterDf) * len(afterDf.columns)]

  seriesDataList = []
  seriesDataList.append({'name': 'before', 'data': beforeList})
  seriesDataList.append({'name': 'after', 'data': afterList})

  response = {}
  response['seriesData'] = seriesDataList

  return json.dumps(response)

@app.route('/changeDistort', methods=['GET', 'POST'])
def changeDistort():
  global uploadFileName, column
  beforeDf = pd.read_csv('static/' + uploadFileName + '.csv')
  beforeDf = beforeDf.apply(pd.to_numeric, errors = 'coerce')
  beforeColumnDf = beforeDf[column]
  beforeColumnList = beforeColumnDf.values.tolist()

  req = eval(request.get_data().decode('utf-8'))
  fileName = req["fileName"]

  afterDf = pd.read_csv('static/dataset/' + str(fileName) + '.csv')
  afterDf = afterDf.apply(pd.to_numeric, errors = 'coerce')
  afterColumnDf = afterDf[column]
  afterColumnList = afterColumnDf.values.tolist()

  minValue = beforeColumnDf.min()
  maxValue = beforeColumnDf.max()

  sliceCnt = 20
  sliceSize = (maxValue - minValue)/sliceCnt
  beforeColumnCntList = [0 for i in range(sliceCnt)]
  afterColumnCntList = [0 for i in range(sliceCnt)]

  seriesDataList = []
  categoryDataList = []

  for i in range(sliceCnt):
    minRange = float(minValue + (sliceSize * i))
    maxRange = float(minValue + (sliceSize * (i + 1)))
    categoryDataList.append(maxRange)

    for j in range(len(beforeColumnList)):
      if math.isnan(beforeColumnList[j]) == False:
        if beforeColumnList[j] >= minRange and beforeColumnList[j] <= maxRange:
          beforeColumnCntList[i] = beforeColumnCntList[i] + 1

    for j in range(len(afterColumnList)):
      if math.isnan(afterColumnList[j]) == False:
        if afterColumnList[j] >= minRange and afterColumnList[j] <= maxRange:
          afterColumnCntList[i] = afterColumnCntList[i] + 1

  seriesDataList.append({'name': 'before', 'data': beforeColumnCntList})
  seriesDataList.append({'name': 'after', 'data': afterColumnCntList})

  response = {}
  response['seriesData'] = seriesDataList
  response['categoryData'] = categoryDataList

  return json.dumps(response)

if __name__ == '__main__':
  app.jinja_env.auto_reload = True
  app.config['TEMPLATES_AUTO_RELOAD'] = True
  app.run(debug = True)