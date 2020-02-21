import os
import pandas as pd
import src.sheets as sheets
import random


def randomData():
    Who = ['Ted Stark Contrast', 'Jimothy Tim']
    What = ['apples', 'cars', 'phones', 'groceries', 'computers', 'desk', 'chair']
    Cost = [0, 2000]
    Months = [1, 12]
    Days = [1, 31]
    Year = 2020

    things = []

    for month in range(*Months):
        for day in range(*Days):
            date = f"{month}/{day}/{Year}"

            for person in Who:
                if random.uniform(0, 1) > 0.5:
                    what = random.choice(What)
                    thing = {
                        "Date": date,
                        "Cost": float(f"{random.uniform(Cost[0], Cost[1]):.2f}"),
                        "What": what,
                        "Who": person,
                        "Description": person + ": " + " ".join([what, what, what]),
                    }
                    things.append(thing)


    return pd.DataFrame(things)





def load_data(random=False):
    host = os.environ.get('FLASK_HOST', 'remote')
    print(host)
    if (random):
        # print("reading local file")
        # return pd.read_csv('./Things-Data View.csv')
        print("random data")
        return randomData()
    else:
        if (host == 'local'):
            print("reading local file")
            return pd.read_csv('./Things-Data View.csv')
        else:
            return sheets.load_data()