# bank of america format:
# Posted Date,Reference Number,Payee,Address,Amout
import sys
import pandas as pd

csvfile = '/mnt/c/Users/Saahi/Downloads/currentTransaction_5798.csv'
csvfile = '/mnt/c/Users/Saahi/Downloads/April2020_5798.csv'

df = pd.read_csv(csvfile)

user = 'Saahil Claypool'

out = pd.DataFrame(columns=['Cost', 'What', 'Who', 'Date', 'Personal'])



out['Cost'] = - df['Amount']
out['What'] = df['Payee']
out['Who'] = df['Payee'].map(lambda c: user)
out['Date'] = df['Posted Date']
out['Personal'] =df['Payee'].map(lambda c: False )

print(out.to_csv(index=False))