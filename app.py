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

fileName = 'wine'
purpose = ''
column = ''
inputModelList = []
inputEvalList = []

@app.route('/fileUpload', methods=['GET', 'POST'])
def fileUpload():
  req = request.files['file']

  fileUploadList = []
  stream = codecs.iterdecode(req.stream, 'utf-8')
  for row in csv.reader(stream, dialect = csv.excel):
    if row:
      fileUploadList.append(row)

  fileUploadDf = pd.DataFrame(fileUploadList)
  fileUploadDf = fileUploadDf.rename(columns = fileUploadDf.iloc[0])
  fileUploadDf = fileUploadDf.drop(fileUploadDf.index[0])
  fileUploadDf = fileUploadDf.reset_index(drop = True)

  originDf = fileUploadDf.reindex(sorted(fileUploadDf.columns), axis = 1)
  originDf.to_json('static/file.json', orient = 'records', indent = 4)

  return json.dumps({'fileUpload': 'success'})

@app.route('/setting', methods=['GET', 'POST'])
def setting():
  global purpose, column, inputModelList, inputEvalList

  originDf = pd.read_csv('static/' + fileName + '.csv')
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
    req = request.get_data().decode('utf-8')
    req = eval(req)

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
  req = request.get_data().decode('utf-8')
  req = eval(req)
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

  dataList = []
  for i in range(0, 5):
    dataList.append({'label': i, 'color': colorList[i], 'data': {'issue': rateList[i], 'normal': 100 - rateList[i]}})

  response = {}
  response['donutChartData'] = dataList

  return json.dumps(response)

@app.route('/checkVisualization', methods=['GET', 'POST'])
def checkVisualization():
  # req = request.get_data().decode('utf-8')
  # req = eval(req)
  # vis = req["visualization"]
  # metric = req["metricValues"]

  vis = 'histogramChart'
  metric = 'completeness'
  columnName = 'ash'

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

      seriesDataList.append({'name': 'r' + str(i), 'data': columnCntList})

  # accuracy
  if vis == 'histogramChart':
    seriesDataList = []
    categoryDataList = []

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

    for i in range(sliceCnt):
      minRange = float(minValue + (sliceSize * i))
      maxRange = float(minValue + (sliceSize * (i + 1)))
      categoryDataList.append(maxRange)

      for j in range(len(columnList)):
        if math.isnan(columnList[j]) == False:
          if columnList[j] >= minRange and columnList[j] <= maxRange:
            columnCntList[i] = columnCntList[i] + 1

    seriesDataList.append({'name': columnName, 'data': columnCntList})

  # if vis == 'boxplotChart':
  # if vis == 'scatterChart':

  return json.dumps({'checkVisualization': 'success'})

@app.route('/tablePoint', methods=['GET', 'POST'])
def tablePoint():
  req = request.get_data().decode('utf-8')
  req = eval(req)
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
  return

@app.route('/rowSummary', methods=['GET', 'POST'])
def rowSummary():
  return

@app.route('/combination', methods=['GET', 'POST'])
def combinationTable():
  with open('static/combination.json') as f:
    combinationData = json.load(f)

  return json.dumps(combinationData)

@app.route('/new', methods=['GET', 'POST'])
def new():
  req = request.get_data().decode('utf-8')
  req = eval(req)
  # req example: {'type': row 또는 column, 'name': idx명 또는 column명

  return jsonify({'new: success'})

if __name__ == '__main__':
  app.jinja_env.auto_reload = True
  app.config['TEMPLATES_AUTO_RELOAD'] = True
  app.run(debug = True)