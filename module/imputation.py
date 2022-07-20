import numpy as np
import pandas as pd
from scipy import stats
import impyute as impy

def LowerUpper(df):
    df = df.dropna()

    q25 = np.quantile(df, 0.25)
    q75 = np.quantile(df, 0.75)
    iqr = q75 - q25
    cut_off = iqr * 1.5
    lower, upper = q25 - cut_off, q75 + cut_off

    return lower, upper

def densityDf(df1, df2):
    tmpIndex = []
    tmpValue  = []
    data = {}

    for i in range(len(df1)):
        tmpIndex.append('normal')
        tmpValue.append(df1.iloc[i][0])

    for i in range(len(df2)):
        tmpIndex.append('data')
        tmpValue.append(df2.iloc[i][0])
    
    data['index'] = tmpIndex
    data['value'] = tmpValue

    outputDf = pd.DataFrame(data)
    return outputDf

def ecdfDf(df, index):
    tmpIndex, tmpX, tmpY = [], [], []
    data = {}

    if type(df) == 'pandas.core.frame.DataFrame':
        x = np.sort(df.to_numpy())
    else:
        x = np.sort(df)
        
    y = 1. * np.arange(len(x))/float(len(x) - 1)

    for i in range(0,len(x)):
        tmpIndex.append(index)
        tmpX.append(x[i])
        tmpY.append(y[i])

    data['index'] = tmpIndex
    data['x'] = tmpX
    data['y'] = tmpY

    outputDf = pd.DataFrame(data)
    return outputDf

def heatmapDf(columnList, df):
    size = int(len(df)/10)
    
    tmpIndex, tmpY, tmpValue = [], [], []
    data = {}

    for i in range(len(columnList)):
        tmpDf = df[columnList[i]]

        for j in range(int(len(df)/size)):
            sliceDf = tmpDf.iloc[size * j : size * (j + 1)]
            missing = sliceDf.isnull().sum()

            tmpIndex.append(columnList[i])
            tmpY.append(size * (j + 1))
            tmpValue.append(missing)

    data['index'] = tmpIndex
    data['y'] = tmpY
    data['value'] = tmpValue
    
    outputDf = pd.DataFrame(data)
    return outputDf, tmpY

def custom_imp_min(df, colName):
    minValue = df.min()
    df = df.fillna(minValue)
    output = df.to_frame(name = colName)
    return output

def custom_imp_max(df, colName):
    maxValue = df.max()
    df = df.fillna(maxValue)
    output = df.to_frame(name = colName)
    return output

def custom_imp_mode(df, colName):
    modeValue = df.mode(dropna = True)[0]
    df = df.fillna(modeValue)
    output = df.to_frame(name = colName)
    return output

def custom_imp_mean(df, colName):
    df = df.to_frame(name = colName)
    df = impy.mean(df.values)
    output = pd.DataFrame(df, columns = [colName])
    return output

def custom_imp_median(df, colName):
    df = df.to_frame(name = colName)
    df = impy.median(df.values)
    output = pd.DataFrame(df, columns = [colName])
    return output

def custom_imp_em(df, colName):
    df = df.to_frame(name = colName)
    df = impy.em(df.values, loops = 50)
    output = pd.DataFrame(df, columns = [colName])
    return output

def custom_imp_locf(df, colName):
    df = df.to_frame(name = colName)
    df = impy.locf(df.values, axis = 1)
    output = pd.DataFrame(df, columns = [colName])
    return output
