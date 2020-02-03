from oauth2client.service_account import ServiceAccountCredentials
import os
import gspread
import pandas as pd


def load_data(sheet_url = "https://docs.google.com/spreadsheets/d/18BEYYJE51eQsAFXwU7eIcPbNZVx6KzJpMdwD2lGAbH4/edit#gid=0"):

    # use creds to create a client to interact with the Google Drive API
    scope = ['https://spreadsheets.google.com/feeds']
    json_secrets = os.environ.get('google_secrets', "").replace("\t", "\n")
    with open('temp_client_secret.json', 'w') as outfile:
        outfile.write(json_secrets)
    creds = ServiceAccountCredentials.from_json_keyfile_name('temp_client_secret.json', scope)
    client = gspread.authorize(creds)

    # Find a workbook by name and open the first sheet
    # Make sure you use the right name here.

    sheet = client.open_by_url(sheet_url)

    # Extract and print all of the values
    list_of_hashes = sheet.sheet1.get_all_records()

    df = pd.DataFrame(list_of_hashes)

    print(df)

    return df

load_data()