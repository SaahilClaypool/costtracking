# Cost Sharing

http://d18fyddwidf81f.cloudfront.net/

(TODO: make a real url)

App to show spending and help calculate what is owed between two people at the end of the month

## Features

- Show cost by day of the month
- Integrate with google sheets
- Calculate how much each has payed total
- Calculate how much each owes the other

## Org

Trello: https://trello.com/b/Nz1DZk2j/costsavings

## misk 

- setup env: 'heroku config:set google_secrets="`cat ./client_secret.json | paste -sd \"\t\"`"'
    - 'export google_secrets="`cat ./client_secret.json | paste -sd \"\t\"`"'
- deploy: git push heroku master

## AWS

[link](https://medium.com/@wolovim/deploying-create-react-app-to-s3-or-cloudfront-48dae4ce0af)


- bucket:
    https://console.aws.amazon.com/s3/buckets/costsaving-react/?region=us-east-2&tab=properties
- CDN: 

1. Create a bucket for static hosting

    npm run build && aws s3 sync build s3://costsaving-react

2. Create a cloudfront cdn for the static files

3. Create a lambda function

4. Create a API gateway so that I can send requests to my lambda function and get back its json responses 

    - set as lambda 
    - configure /GET as only resource
    - https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-getting-started-with-rest-apis.html
    - Action -> Deploy to deploy the api gateway 

5. Configure the lambda to use secrets

    - this is easy: just take the json file and set it to a variable
    - build the lambda as a zip
        - TODO make a docker image with the base layers see here: https://aws.amazon.com/premiumsupport/knowledge-center/lambda-layer-simulated-docker/
        - This takes a while
    - change runtime to match system runtime