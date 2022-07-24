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

import module.imputation as imputation
import module.tree as tree

app = Flask(__name__)
CORS(app)

purpose = ''
purposeColumn = ''
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

  print('fileUpload: success')
  return json.dumps({'fileUpload': 'success'})

@app.route('/modelSetting', methods=['GET', 'POST'])
def modelSetting():
  global purpose, purposeColumn, inputModelList, inputEvalList

  if request.method == 'GET':
    with open('static/file.json', 'r', encoding = 'utf-8') as f:
      data = json.load(f) 

    originDf = pd.DataFrame(data)

    purposeList = []
    tmpList = ['prediction', 'classification']
    for i in range(len(tmpList)):
      purposeList.append({'label': tmpList[i], 'value': i})      

    columnList = []
    tmpList = list(originDf.columns)
    for i in range(len(tmpList)):
      columnList.append({'label': tmpList[i], 'value': i})

    modelList = []
    if purpose == 'prediction':
      tmpList = ['lr', 'knn', 'nb', 'dt', 'svm', 'rbfsvm', 'gpc', 'mlp', 'ridge', 'rf',
                'qda', 'ada', 'gbc', 'lda', 'et', 'xgboost', 'lightgbm', 'catboost']
    
    else:
      tmpList = ['lr', 'knn', 'nb', 'dt', 'svm', 'ridge', 'rf', 'qda', 'ada',
                  'gbc', 'lda', 'et', 'xgboost', 'lightgbm', 'catboost']
    for i in range(len(tmpList)):
      modelList.append({'label': tmpList[i], 'value': i})

    evalList = []
    if purpose == 'prediction':
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
    purposeColumn = req["column"]["label"]
    modelList = req["model"]
    evalList = req["eval"]

    inputModelList = []
    for i in range(len(modelList)):
        inputModelList.append(modelList[i]["label"])

    inputEvalList = []
    for i in range(len(evalList)):
        inputEvalList.append(evalList[i]["label"])

    print('setting: success')
    return json.dumps({'setting': 'success'})

@app.route('/combinationSetting', methods=['GET', 'POST'])
def combinationSetting():
  req = request.get_data().decode('utf-8')
  req = eval(req)

  print(req)
  return json.dumps(combinationData)

@app.route('/combination', methods=['GET', 'POST'])
def combinationTable():
  with open('static/combination.json') as f:
    combinationData = json.load(f)

  return json.dumps(combinationData)

if __name__ == '__main__':
  app.jinja_env.auto_reload = True
  app.config['TEMPLATES_AUTO_RELOAD'] = True
  app.run(debug = True)