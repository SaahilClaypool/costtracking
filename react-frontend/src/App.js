import React, { useEffect } from 'react';
import './App.css';
import GraphView from './GraphView';
import InfoView from './InfoView';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


function App() {

  const [currentMonth, setCurrentMonth] = React.useState(new Date().getMonth());
  const [data, setData] = React.useState([]);
  const [isCum, setIsCum] = React.useState(true);

  let toggleCummulative = () => setIsCum(!isCum);

  let setMonthRelative = offset => {
    setCurrentMonth((currentMonth + offset + 12) % 12)
  }

  let incMonth = () => setMonthRelative(+1);
  let decMonth = () => setMonthRelative(-1);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch("http://127.0.0.1:5000/data",
        {
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
      })

      console.log(data)

      setData(data);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Cost Savings</h1>
      <h2>{monthNames[currentMonth]}</h2>
      <div className="Controls">
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
            <GraphView month={currentMonth} data={data} isCummulative={isCum}/>
            <InfoView  data={data}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
