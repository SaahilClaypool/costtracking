import React, { useEffect } from 'react';
import './App.css';
import GraphView from './GraphView';
import InfoView from './InfoView';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// const URL = (process.env.NODE_ENV === "development" ? "http://127.0.0.1:5000" : "https://costsavings.herokuapp.com")
const URL = (process.env.NODE_ENV === "development" ? "https://jierr542m7.execute-api.us-east-2.amazonaws.com/dev/" : "https://jierr542m7.execute-api.us-east-2.amazonaws.com/dev/")

async function loadRemoteData(URL) {

  // let path = (random ? "/rand" : "/data");
  let path = "";

  const resp = await fetch(URL + path,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    }
  );
  let body = await resp.json()

  return body;
}

let choose = (alist) => alist[Math.floor(Math.random() * alist.length)]

function mockData() {
  let Who = ['Saahil Claypool', 'Sarah Bottari'];
  let What = ['apples', 'cars', 'phones', 'groceries', 'computers', 'desk', 'chair'];
  let Cost = [0, 2000];
  let Months = [1, 12];
  let Days = [1, 31];
  let Year = 2020;
  let things = []
  for (var month = Months[0]; month < Months[1]; month++) {
    for (var day = Days[0]; day < Days[1]; day++) {
      let date = `${month}/${day}/${Year}`
      Who.forEach(person => {
        if (Math.random() > 0.5) {
          let what = choose(What);
          let isPersonal = Math.random() > 0.5;
          let thing = {
            "Date": date,
            "Cost": parseFloat((Cost[0] + (Math.random() * (Cost[1] - Cost[0]))).toFixed(2)),
            "What": what,
            "Who": person,
            "Personal": isPersonal,
            "Description": `${person} bought ${what} and it was ${isPersonal ? 'personal' : 'shared'}`,
          }
          things.push(thing)
        }
      })
    }
  };
  return things;
}

function App() {

  const [currentMonth, setCurrentMonth] = React.useState(new Date().getMonth());
  const [data, setData] = React.useState([]);

  const [isCum, setIsCum] = React.useState(true);
  let toggleCummulative = () => setIsCum(!isCum);

  const [random, setRandom] = React.useState(true);
  let toggleRandom = () => setRandom(!random);

  const [personal, setPersonal] = React.useState(false);
  let togglePersonal = () => setPersonal(!personal);
  

  let setMonthRelative = offset => {
    setCurrentMonth((currentMonth + offset + 12) % 12)
  }

  let incMonth = () => setMonthRelative(+1);
  let decMonth = () => setMonthRelative(-1);

  const fetchData = async () => {

    let body = mockData();
    let data = body.map(d => {
        let vals = d.Date.split('/');
        return {
          ...d,
          month: parseInt(vals[0]),
          day: parseInt(vals[1]),
          year: parseInt(vals[2]),
        }
      });

    data.sort((a, b) => {
      let dateVal = a => a.day + a.month * 100 + a.year * 1000
      return (dateVal(a) - dateVal(b))
    });

    setData(data);
  };

  useEffect(() => {
    fetchData();
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    [random]);

  return (
    <div className="App">
      <h1>Cost Savings</h1>
      <div className="Controls">
        <button
          className="ToggleRandom"
          onClick={toggleRandom}
        >
          random data: {random ? "True" : "False"}
        </button>
        <button
          className="ToggleCummulative"
          onClick={toggleCummulative}
        >
          {isCum ? "Cummulative" : "Single Purchases"}
        </button>
        <button
          className="TogglePersonal"
          onClick={togglePersonal}
        >
          personal data: {personal ? "True" : "False"}
        </button>
        <div className="Content">
          <div className="Picker">
            <ul className="MonthPicker">
              <li>
                <button onClick={decMonth}>
                  &larr;
              </button>
              </li>
              <li>
                <button>
                  &darr;
              </button>
              </li>
              <li>
                <button onClick={incMonth}>
                  &rarr;
              </button>
              </li>
            </ul>
          </div>
          <h2>{monthNames[currentMonth]}</h2>
          <GraphView month={currentMonth} data={filterData(data, currentMonth)} isCummulative={isCum} isPersonal={personal}/>
          <InfoView data={filterData(data, currentMonth)} />
        </div>
      </div>
    </div>
  );
}

function parseMonth(datum) {
  return parseInt(datum.Date.split('/')[0])
}

function filterData(data, month) {
  return data.filter(d => parseMonth(d) === month + 1)
}


export default App;
