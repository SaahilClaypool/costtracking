from flask import Flask, escape, request, render_template
import pandas as pd

import src.calculate as calculate
from src.data import load_data

app = Flask(__name__, template_folder="views")

@app.route('/')
def index():
    print('hello world')
    df = load_data()
    msgs = calculate.owe(df)
    ids, graph_data, layouts = calculate.graph_data(df)
    return render_template('index.html.j2', msgs=msgs, ids=ids, graphs=graph_data, layouts=layouts)

if __name__ == "__main__":
    app.run()
 