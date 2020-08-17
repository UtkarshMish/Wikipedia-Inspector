import requests
from flask import Flask, render_template, request

application = Flask(__name__)
CHECK_API = "https://tweet-inspector-api-v2.herokuapp.com/predict"
prediction_headers = {'Content-Type': 'application/json'}


@application.route("/")
def main_page():
    return render_template("./index.html")


@application.route("/predict", methods=['POST'])
def get_prediction():
    if request.method == 'POST':
        text_data = request.data
        r = requests.post(CHECK_API,
                          data=text_data, headers=prediction_headers)
        return r.json()['results']['0']
    else:
        return {"code": "505"}


if __name__ == "__main__":
    application.run()
