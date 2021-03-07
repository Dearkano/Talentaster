from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from werkzeug.datastructures import ImmutableMultiDict
import requests, os

from extract_from_img import extract_feature
from feature_prediction import load_model_for_img, load_model_for_spec

api = Flask(__name__)
cors = CORS(api, resources={r"*": {"origins": "*"}})

@api.route('/postServer', methods=['POST'])
def post_Server():
    file = request.files["file"]
    input_path_key = str(hash(file.name + "/" + file.filename))
    result_path_key = str(hash(file.name + "/" + file.filename + "result"))
    file.save(input_path_key)
    feature_extract = load_model_for_spec(input_path_key, result_path_key)
    return_file = send_file(result_path_key, attachment_filename='result.csv')
    os.remove(input_path_key)
    os.remove(result_path_key)
    return return_file

@api.route('/postMobile', methods=['POST'])
def post_Mobile():

    file = request.files['file']
    input_file_path = str(hash(file.name + "/" + file.filename))
    file.save(input_file_path)
    result = call_cv_api(input_file_path).json()
    fruit_types = ["orange", "apple", "watermelon", "melon","pear"]
    fruit_type = ""
    flag = False
    for tag in result["description"]["tags"]:
        for fruit in fruit_types:
            if tag == fruit:
                fruit_type = tag
                flag = True
                break
        if flag:
            break

    return_dict = {}

    
    if fruit_type != "":
        feature_extract = extract_feature(input_file_path)
        return_dict["plumpness"] = feature_extract[0][1]
        feature_predict = load_model_for_img(feature_extract) 
        return_dict["tag"] = fruit_type
        return_dict["fibrousness"] = feature_predict[0]
        return_dict["sweetnes"] = feature_predict[1]
        return_dict["sourness"] = feature_predict[2]
        return_dict["crispness"] = feature_predict[3]
        feature_predict_spec = load_model_for_spec("spec.csv")
        return_dict["acidity"] = feature_predict_spec[0]
        return_dict["cellulose"] = feature_predict_spec[1]
        return_dict["moisture"] = feature_predict_spec[2]
        return_dict["soluble"] = feature_predict_spec[3]
        return_dict["sugar"] = feature_predict_spec[4]
        return_dict["vitamins"] = feature_predict_spec[5]
    else:
        return_dict["tag"] = ""
    print("return_dict", return_dict)
    os.remove(input_file_path)
    return return_dict

def call_cv_api(input_file_path):

    img_byte = open(input_file_path, "rb")
    url = 'https://zhixinlai16.cognitiveservices.azure.com/vision/v3.1/describe'
    headers = {
        'Ocp-Apim-Subscription-Key': '',
    }
    files = {'file': img_byte}
    result = requests.post(url, files=files, headers=headers)
    return result

if __name__ == '__main__':
    api.run(debug=True, host='0.0.0.0', port=5010)

