import os
import pandas as pd
import src.sheets as sheets

def load_data():
    host = os.environ.get('FLASK_HOST', 'remote')
    print(host)
    if (host == 'local'):
        print("reading local file")
        return pd.read_csv('./Things-Data View.csv')
    else:
        return sheets.load_data()