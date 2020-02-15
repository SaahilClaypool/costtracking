"""
df should have columns:

    Cost,What,Who,Date,Description
"""

import json
import plotly

import pandas as pd
import numpy as np
import re

SAA_PAYS = 0.6
SAR_PAYS = 0.4

def money(num):
    return f"${round(num, 2)}"

def owe(df):
    """
    TODO: make this work for any people

    return: 
        string for how much sarah and saa each spent
    """
    people = df.groupby("Who")

    total = df['Cost'].sum()

    saa_should = SAA_PAYS * total 
    sar_should = SAR_PAYS * total 

    print(f"Saahil should pay {SAA_PAYS * 100}% of {total} = {saa_should}")
    print(f"Sarah should pay {SAR_PAYS * 100}% of {total} = {sar_should}")

    saa_spent = 0
    sar_spent = 0

    for name, group in people:
        person_spent = group['Cost'].sum()
        if (name == "Saahil Claypool"):
            saa_spent = person_spent
        else:
            sar_spent = person_spent
            
    saa_str = f"Saahil payed {money(saa_spent)}, he owes sarah {money(saa_should - saa_spent)}"
    sar_str = f"Sarah payed {money(sar_spent)}, she owes saa {money(sar_should - sar_spent)}"
    return saa_str, sar_str


def as_json(graphs):
    """
    return:
        json(graphs)
    """
    return json.dumps(graphs, cls=plotly.utils.PlotlyJSONEncoder)
    

def parse_date_string(datestring):
    return re.search('(.*)/(.*)/(.*)', datestring)


def date_to_day_of_month(datestring):
    return int(parse_date_string(datestring).group(2))

def plot_purchases(df):
    plots = []
    for name, data in df.groupby("Who"):
        y = data.Cost
        plots.append({
            "x": data.DayOfMonth,
            "y": y,
            "name": name,
            "mode": "markers",
            "type": "scatter",
            "text": data.What.tolist()
        })

    layout = {
        "title": {
            "text": "Purchases"
        },
        "xaxis": {
            "title": {
                "text": "Day of month",
            }
        },
        "yaxis": {
            "title": {
                "text": "Cost",
            }
        }
    }

    return ["Individual Purchases", plots, layout]

def plot_spending(df):
    plots = []
    df['TotalSpending'] = df.Cost.cumsum()
    x = [0]
    x += df.DayOfMonth.tolist()
    x += [31]
    y = [0]
    y += df.TotalSpending.tolist()
    y += [df.Cost.sum()]
    text = [""]
    text += df.What.tolist()
    text += [""]

    plots.append({
        "x": x,
        "y": y,
        "name": "Total",
        "mode": "lines+markers",
        "type": "scatter",
        "line": {"shape": 'hv'},
        "text": text
    })

    for name, data in df.groupby("Who"):
        data['PersonalSpending'] = data.Cost.cumsum()
        x = [0]
        x += data.DayOfMonth.tolist()
        x += [31]
        y = [0]
        y += data.PersonalSpending.tolist()
        y += [data.Cost.sum()]
        text = [""]
        text += data.What.tolist()
        text += [""]

        plots.append({
            "x": x,
            "y": y,
            "name": name,
            "mode": "lines+markers",
            "type": "scatter",
            "line": {"shape": 'hv'},
            "text": text
        })

    layout = {
        "title": {
            "text": "Spending"
        },
        "xaxis": {
            "title": {
                "text": "Day of month",
            }
        },
        "yaxis": {
            "title": {
                "text": "Total Spent",
            }
        }
    }

    return ["Total Spending", plots, layout]


# TODO find the 'correct' way to do this
def flatmap(df):
    l = []
    for v in df.values:
        d = {}
        for ci, c in enumerate(v):
            d[df.columns[ci]] = c
        l.append(d)
    return l

def graph_ploty_data(df):
    df['DayOfMonth'] = df.apply(lambda row: date_to_day_of_month(row.Date), axis=1)
    df.sort_values('DayOfMonth', inplace=True)
    ids, graphs, layouts = [], [], []

    plot_name, plot_data, layout = plot_purchases(df)
    ids.append(plot_name)
    graphs.append(plot_data)
    layouts.append(layout)

    plot_name, plot_data, layout = plot_spending(df)
    ids.append(plot_name)
    graphs.append(plot_data)
    layouts.append(layout)

    return [ids, as_json(graphs), as_json(layouts)]


def raw_data(df):
    return as_json(flatmap(df))