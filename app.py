from flask import Flask, escape, request, render_template, jsonify, send_from_directory
from flask_cors import CORS
import pandas as pd

import src.calculate as calculate
from src.data import load_data

app = Flask(__name__, template_folder="views", static_url_path='',
            static_folder='react-frontend/build')
# enable CORS
CORS(
    app,
    resources={
        r'/data': {'origins': '*'},
        r'/rand': {'origins': '*'}
    }
)


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/d3')
def d3Version():
    print('d3')
    df = load_data()
    raw_data = calculate.raw_data(df)
    return render_template('d3.html.j2', raw_data=raw_data)


@app.route('/data')
def data():
    print('data')
    df = load_data()
    raw_data = calculate.raw_data(df)
    print("sending back raw data: ", raw_data)
    return jsonify(raw_data)


@app.route('/rand')
def randomData():
    print('data')
    df = load_data(random=True)
    raw_data = calculate.raw_data(df)
    print("sending back random data: ", raw_data)
    return jsonify(raw_data)


if __name__ == "__main__":
    app.run()
