from sklearn.linear_model import LinearRegression
from joblib import dump, load
import numpy as np
import pandas as pd
import random

def load_model_for_img(feature):
    
    clfs = [load('../model/pic_fibrousness.pkl'), load('../model/pic_sweetness.pkl'), load('../model/pic_sourness.pkl'), load('../model/pic_crispness.pkl')]
    result = []
    for clf in clfs:
        res = clf.predict(feature)
        result.append(res[0])
    return result

def load_model_for_spec(input_file_path, result_file_path = "result.csv"):
    csv_data = pd.read_csv(input_file_path).values.tolist()  # 读取训练数据
    clfs = [load('../model/spec_Acidity.pkl'), load('../model/spec_cellulose.pkl'), load('../model/spec_moisture.pkl'), load('../model/spec_soluble_solids.pkl'), load('../model/spec_sugar.pkl'), load('../model/spec_vitamins.pkl')]
    result = []
    for clf in clfs:
        res = clf.predict(csv_data) # 80 * 1
        result.append(res) # 6 * 80 * 1
    result_arr = np.array(result).reshape(len(result), len(result[0]))
    result_arr = np.swapaxes(result_arr,0,1)
    if input_file_path == "spec.csv":
        rand = random.randint(0, 10)
        return result_arr[rand]
    else:
        np.savetxt(result_file_path, result_arr, delimiter=",")
        return None


if __name__ == "__main__":
    load_model_for_img()
    load_model_for_spec("input.csv", "result.csv")
