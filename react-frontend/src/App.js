import React, { useEffect } from 'react';
import './App.css';
import GraphView from './GraphView';
import InfoView from './InfoView';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const URL = (process.env.NODE_ENV === "development" ? "http://127.0.0.1:5000" : "")

function App() {

  const [currentMonth, setCurrentMonth] = React.useState(new Date().getMonth());
  const [data, setData] = React.useState([]);

  const [isCum, setIsCum] = React.useState(true);
  let toggleCummulative = () => setIsCum(!isCum);

  const [random, setRandom] = React.useState(false);
  let toggleRandom = () => setRandom(!random);


  let setMonthRelative = offset => {
    setCurrentMonth((currentMonth + offset + 12) % 12)
  }

  let incMonth = () => setMonthRelative(+1);
  let decMonth = () => setMonthRelative(-1);

  const fetchData = async () => {
    console.log(URL);

    let path = (random ? "/rand" : "/data");

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

    let data = JSON.parse(body).map(d => {
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
  []);

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
          <GraphView month={currentMonth} data={filterData(data, currentMonth)} isCummulative={isCum} />
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
