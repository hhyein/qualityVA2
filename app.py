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
  originDf = pd.read_csv('static/' + fileName + '.csv')
  originDf = originDf.reindex(sorted(originDf.columns), axis = 1)
  totalNum = len(originDf) * len(list(originDf.columns))

  mis = sum(list(originDf.isnull().sum().values))
  misRate = round((mis/totalNum) * 100)
  
  tmpList = []
  for column in originDf:
    df = pd.DataFrame(pd.to_numeric(originDf[column], errors = 'coerce'))
    df = df.dropna()

    lower, upper = main.lower_upper(df[column])
    data1 = df[df[column] > upper]
    data2 = df[df[column] < lower]
    tmpList.append(data1.shape[0] + data2.shape[0])
  out = sum(tmpList)
  outRate = round((out/totalNum) * 100)

  tmpList = []
  for column in originDf:
    df = originDf[column].dropna()
    df = pd.DataFrame(pd.to_numeric(df, errors = 'coerce'))
    tmpList.append(list(df.isnull().sum().values[0]))
  inc = sum(tmpList)
  incRate = round((inc/totalNum) * 100)

  ##### sim, dep
  simRate = round(60)
  depRate = round(60)
  #####

  rateList = [misRate, outRate, incRate, simRate, depRate]
  colorList = ['darkorange', 'steelblue', 'yellowgreen', 'lightcoral', 'cadetblue']

  dataList = []
  for i in range(0, 5):
    dataList.append({'label': i, 'color': colorList[i], 'data': {'issue': rateList[i], 'normal': 100 - rateList[i]}})

  response = {}
  response['donutChartData'] = dataList

  return json.dumps(response)

@app.route('/tablePoint', methods=['GET', 'POST'])
def tablePoint():
  originDf = pd.read_csv('static/' + fileName + '.csv')
  originDf = originDf.reindex(sorted(originDf.columns), axis = 1)
  columnList = list(originDf.columns)
  
  misPointList = []
  for column in columnList:
    misRowIdxList = list(originDf[originDf[column].isnull()].index)

    for row in misRowIdxList:
      misPointList.append({'x': misRowIdxList.index(row), 'y': columnList.index(column)})

  ##### acc, con
  accPointList = []
  conPointList = []

  response = {}
  response['comPointList'] = misPointList

  return json.dumps(response)

@app.route('/columnSummary', methods=['GET', 'POST'])
def columnSummary():
  return

@app.route('/combination', methods=['GET', 'POST'])
def combinationTable():
  with open('static/combination.json') as f:
    combinationData = json.load(f)

  return json.dumps(combinationData)

if __name__ == '__main__':
  app.jinja_env.auto_reload = True
  app.config['TEMPLATES_AUTO_RELOAD'] = True
  app.run(debug = True)