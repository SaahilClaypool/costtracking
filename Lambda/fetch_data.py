from oauth2client.service_account import ServiceAccountCredentials
import gspread
import os
import pandas as pd
import random
import json

def handle_event(event, context):
    return load_data()

def flatmap(df):
    l = []
    for v in df.values:
        d = {}
        for ci, c in enumerate(v):
            d[df.columns[ci]] = c
        l.append(d)
    return l

def as_json(graphs):
    return json.dumps(graphs)

def raw_data(df):
    data = as_json(flatmap(df))
    msg = {
        "isBase64Encoded": "false",
        "statusCode": "200",
        "headers": {
            "Access-Control-Allow-Origin": '*' ,
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
            "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
        },
        "body": data
    }
    return msg

def load_data(sheet_url = "https://docs.google.com/spreadsheets/d/18BEYYJE51eQsAFXwU7eIcPbNZVx6KzJpMdwD2lGAbH4/edit#gid=0"):

    # use creds to create a client to interact with the Google Drive API
    scope = ['https://spreadsheets.google.com/feeds']
    json_secrets = json.loads(os.environ.get('google_secrets', "").replace("\t", "\n"))
    creds = ServiceAccountCredentials.from_json_keyfile_dict(json_secrets, scope)
    client = gspread.authorize(creds)
    sheet = client.open_by_url(sheet_url)

    # Extract and print all of the values
    list_of_hashes = sheet.sheet1.get_all_records()

    df = pd.DataFrame(list_of_hashes)

    return raw_data(df)
