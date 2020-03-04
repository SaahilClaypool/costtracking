#!/bin/sh

pip install -r ./requirements.txt --target ./package
cd package
zip -r9 ${OLDPWD}/function.zip .
cd ${OLDPWD}
zip -g function.zip fetch_data.py

# aws --region us-east-2 lambda update-function-code --function-name costsaving-fetch-sheets --zip-file fileb://function.zip