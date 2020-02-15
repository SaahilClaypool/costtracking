import React, { useEffect } from 'react';
import './App.css';
import GraphView from './GraphView';

function App() {

  const [state, setState] = React.useState({currentMonth: 0});

  let setMonthRelative = offset => {
    setState({currentMonth: (state.currentMonth + offset + 12) % 12})
  }

  let incState = () => setMonthRelative(+1);
  let decState = () => setMonthRelative(-1);

  useEffect(() => {
    async function fetchData() {
      let resp = await fetch("127.0.0.1:5000/data");
      console.log(resp);
    }

    fetchData();
  })

  return (
    <div className="App">
      <h1>Cost Savings</h1>
      <div className="Content">
        <div className="Picker">
          <ul className="MonthPicker">
            <li>
              <button onClick={decState}>
                &larr;
              </button>
            </li>
            <li>
              <button>
                &darr;
              </button>
            </li>
            <li>
              <button onClick={incState}>
                &rarr;
              </button>
            </li>
          </ul>
          <GraphView currentMonth={state.currentMonth}/>
        </div>
      </div>
    </div>
  );
}

export default App;
