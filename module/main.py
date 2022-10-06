import numpy as np
import pandas as pd
import impyute as impy
from scipy import stats

def lower_upper(df):
    df = df.dropna()
    q25 = np.quantile(df, 0.25)
    q75 = np.quantile(df, 0.75)
    iqr = q75 - q25
    cut_off = iqr * 1.5
    lower, upper = q25 - cut_off, q75 + cut_off

    return lower, upper

def imp_min(df, colName):
    minValue = df.min()
    df = df.fillna(minValue)
    output = df.to_frame(name = colName)

    return output

def imp_max(df, colName):
    maxValue = df.max()
    df = df.fillna(maxValue)
    output = df.to_frame(name = colName)

    return output

def imp_mode(df, colName):
    modeValue = df.mode(dropna = True)[0]
    df = df.fillna(modeValue)
    output = df.to_frame(name = colName)

    return output

def imp_mean(df, colName):
    df = df.to_frame(name = colName)
    df = impy.mean(df.values)
    output = pd.DataFrame(df, columns = [colName])

    return output

def imp_median(df, colName):
    df = df.to_frame(name = colName)
    df = impy.median(df.values)
    output = pd.DataFrame(df, columns = [colName])

    return output

def imp_em(df, colName):
    df = df.to_frame(name = colName)
    df = impy.em(df.values, loops = 50)
    output = pd.DataFrame(df, columns = [colName])

    return output

def imp_locf(df, colName):
    df = df.to_frame(name = colName)
    df = impy.locf(df.values, axis = 1)
    output = pd.DataFrame(df, columns = [colName])

    return output
