from flask import Flask, escape, request, render_template
import pandas as pd

import src.calculate as calculate

app = Flask(__name__, template_folder="views")

@app.route('/')
def index():
    print('hello world')
    df = pd.read_csv('./Things-Data View.csv')
    msgs = calculate.owe(df)
    return render_template('index.html', msgs=msgs)

