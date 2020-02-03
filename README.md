# Cost Sharing

https://costsavings.herokuapp.com/

App to show spending and help calculate what is owed between two people at the end of the month

## Features

- Show cost by day of the month
- Integrate with google sheets
- Calculate how much each has payed total
- Calculate how much each owes the other

## Org

Trello: https://trello.com/b/Nz1DZk2j/costsavings

## misk 

```
- setup env: 'heroku config:set google_secrets="`cat ./client_secret.json | paste -sd \"\t\"`"'
    - 'export google_secrets="`cat ./client_secret.json | paste -sd \"\t\"`"'
- deploy: git push heroku master
```