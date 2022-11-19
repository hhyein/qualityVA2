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

import module.main as main
import module.tree as tree

app = Flask(__name__)
CORS(app)

uploadFileName = 'wine'
purpose = ''
column = ''
inputModelList = []
inputEvalList = []

# if purpose == '' or 'regression':
#   from pycaret.regression import *

# if purpose == 'classification':
#   from pycaret.classification import *

@app.route('/fileUpload', methods=['GET', 'POST'])
def fileUpload():
  req = request.files['file']

  # fileUploadList = []
  # stream = codecs.iterdecode(req.stream, 'utf-8')
  # for row in csv.reader(stream, dialect = csv.excel):
  #   if row:
  #     fileUploadList.append(row)

  # fileUploadDf = pd.DataFrame(fileUploadList)
  # fileUploadDf = fileUploadDf.rename(columns = fileUploadDf.iloc[0])
  # fileUploadDf = fileUploadDf.drop(fileUploadDf.index[0])
  # fileUploadDf = fileUploadDf.reset_index(drop = True)

  # originDf = fileUploadDf.reindex(sorted(fileUploadDf.columns), axis = 1)
  # originDf.to_json('static/file.json', orient = 'records', indent = 4)

  return json.dumps({'fileUpload': 'success'})

@app.route('/setting', methods=['GET', 'POST'])
def setting():
  global uploadFileName, purpose, column, inputModelList, inputEvalList

  originDf = pd.read_csv('static/' + uploadFileName + '.csv')
  originDf = originDf.reindex(sorted(originDf.columns), axis = 1)

  if request.method == 'GET':
    purposeList = []
    tmpList = ['regression', 'classification']
    for i in range(len(tmpList)):
      purposeList.append({'label': tmpList[i], 'value': i})      

    columnList = []
    tmpList = list(originDf.columns)
    for i in range(len(tmpList)):
      columnList.append({'label': tmpList[i], 'value': i})

    modelList = []
    if purpose == 'regression':
      tmpList = ['lr', 'knn', 'nb', 'dt', 'svm', 'rbfsvm', 'gpc', 'mlp', 'ridge', 'rf',
                'qda', 'ada', 'gbc', 'lda', 'et', 'xgboost', 'lightgbm', 'catboost']
    
    else:
      tmpList = ['lr', 'knn', 'nb', 'dt', 'svm', 'ridge', 'rf', 'qda', 'ada',
                  'gbc', 'lda', 'et', 'xgboost', 'lightgbm', 'catboost']
    for i in range(len(tmpList)):
      modelList.append({'label': tmpList[i], 'value': i})

    evalList = []
    if purpose == 'regression':
      tmpList = ['MAE', 'MSE', 'RMSE', 'R2', 'RMSLE', 'MAPE', 'TT']
    
    else:
      tmpList = ['Accuracy', 'AUC', 'Recall', 'Precision', 'F1', 'Kappa', 'MCC', 'TT']
    for i in range(len(tmpList)):
      evalList.append({'label': tmpList[i], 'value': i})

    response = {}
    response['purposeList'] = purposeList
    response['columnList'] = columnList
    response['modelList'] = modelList
    response['evalList'] = evalList
    
    return json.dumps(response)

  if request.method == 'POST':
    req = eval(request.get_data().decode('utf-8'))
    purpose = req["purpose"]["label"]
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

  originDf = pd.read_csv('static/' + str(fileName) + '.csv')
  originDf = originDf.reindex(sorted(originDf.columns), axis = 1)
  columnList = list(originDf.columns)

  totalNum = len(originDf) * len(list(originDf.columns))

  mis = sum(list(originDf.isnull().sum().values))
  misRate = round((mis/totalNum) * 100)
  
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

  tmpList = []
  for column in columnList:
    df = originDf[column].dropna()
    df = pd.DataFrame(pd.to_numeric(df, errors = 'coerce'))
    conIdxList = list(df[df[column].isnull()].index)
    tmpList.append(len(conIdxList))
    
  inc = sum(tmpList)
  incRate = round((inc/totalNum) * 100)

  ##### sim, dep
  simRate = round(60)
  depRate = round(60)

  rateList = [misRate, outRate, incRate, simRate, depRate]
  colorList = ['darkorange', 'steelblue', 'yellowgreen', 'lightcoral', 'cadetblue']

  donutChartList = []
  for i in range(0, 5):
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

  originDf = pd.read_csv('static/' + str(fileName) + '.csv')
  originDf = originDf.reindex(sorted(originDf.columns), axis = 1)
  columnList = list(originDf.columns)
  
  # completeness, consistency
  if vis == 'heatmapChart':
    sliceCnt = 10
    sliceSize = int(len(originDf)/sliceCnt)

    seriesDataList = []
    for i in range(sliceCnt):
      rowSliceDf = originDf.iloc[sliceSize * i : sliceSize * (i + 1)]
      columnCntList = []

      for column in columnList:
        columnDf = rowSliceDf[column]

        if metric == 'consistency':
          columnDf = rowSliceDf[column]
          columnDf = columnDf.dropna()
          columnDf = pd.to_numeric(columnDf, errors = 'coerce')

        columnCnt = columnDf.isnull().sum()
        columnCntList.append(columnCnt)
      seriesDataList.append({'name': 'r' + str(i), 'data': str(columnCntList)})

      categoryDataList = []
      for i in range(len(columnList)):
        categoryDataList.append('c' + str(i))

  # accuracy
  if vis == 'histogramChart':
    columnName = req["column"]
    outlierMethod = req["outlier"]
    # calculate threshold outlier
    columnDf = originDf[columnName]
    columnDf = columnDf.apply(pd.to_numeric, errors = 'coerce')
    lower, upper = main.lower_upper(columnDf)

    # generate histogram chart dataset
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

    seriesDataList.append({'name': columnName, 'data': str(columnCntList)})

  response = {}
  response['seriesData'] = seriesDataList
  response['categoryData'] = categoryDataList

  return json.dumps(response)

# 모델 성능 계산할 시에는 mis, inc drop 처리
@app.route('/modelTable', methods=['GET', 'POST'])
def modelTable():
  req = eval(request.get_data().decode('utf-8'))
  fileName = req["fileName"]

  # originDf = pd.read_csv('static/' + str(fileName) + '.csv')
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

@app.route('/tablePoint', methods=['GET', 'POST'])
def tablePoint():
  req = eval(request.get_data().decode('utf-8'))
  fileName = req["fileName"]

  originDf = pd.read_csv('static/' + str(fileName) + '.csv')
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

@app.route('/new', methods=['GET', 'POST'])
def new():
  req = request.get_data().decode('utf-8')

  return json.dumps({'new': 'success'})

@app.route('/changeCnt', methods=['GET', 'POST'])
def changeCnt():
  global uploadFileName
  beforeDf = pd.read_csv('static/' + str(uploadFileName) + '.csv')
  beforeList = [len(beforeDf), len(beforeDf.columns), len(beforeDf) * len(beforeDf.columns)]
  
  req = eval(request.get_data().decode('utf-8'))
  fileName = req["fileName"]

  afterDf = pd.read_csv('static/' + str(fileName) + '.csv')
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
  beforeDf = pd.read_csv('static/' + str(uploadFileName) + '.csv')
  beforeDf = beforeDf.apply(pd.to_numeric, errors = 'coerce')
  beforeColumnDf = beforeDf[column]
  beforeColumnList = beforeColumnDf.values.tolist()

  req = eval(request.get_data().decode('utf-8'))
  fileName = req["fileName"]

  afterDf = pd.read_csv('static/' + str(fileName) + '.csv')
  afterDf = afterDf.apply(pd.to_numeric, errors = 'coerce')
  afterColumnDf = afterDf[column]
  afterColumnList = afterColumnDf.values.tolist()

  # calculate value and range based on before dataframe
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