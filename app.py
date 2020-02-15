from flask import Flask, escape, request, render_template
from flask_cors import CORS
import pandas as pd

import src.calculate as calculate
from src.data import load_data

app = Flask(__name__, template_folder="views")
# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})

@app.route('/')
def index():
    print('index')
    df = load_data()
    msgs = calculate.owe(df)
    ids, graph_ploty_data, layouts = calculate.graph_ploty_data(df)
    return render_template('index.html.j2', msgs=msgs, ids=ids, graphs=graph_ploty_data, layouts=layouts)

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
    return raw_data

if __name__ == "__main__":
    app.run()
 