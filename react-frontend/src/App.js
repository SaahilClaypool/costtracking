import React, { useEffect } from 'react';
import './App.css';
import GraphView from './GraphView';

function App() {

  const [currentMonth, setCurrentMonth] = React.useState(0);
  const [data, setData] = React.useState([]);

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
      console.log(`setting data to ${body}`)
      setData(JSON.parse(body));
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Cost Savings</h1>
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
          <GraphView month={currentMonth} data={data} />
        </div>
      </div>
    </div>
  );
}

export default App;
