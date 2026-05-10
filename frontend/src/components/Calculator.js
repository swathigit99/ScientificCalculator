import React, { useState, useEffect } from 'react';
import axios from 'axios';

const buttons = [
  '7','8','9','/','sin(',
  '4','5','6','*','cos(',
  '1','2','3','-','tan(',
  '0','.','=','+','sqrt(',
  '(',')','^','log(','C'
];

function Calculator() {
  const [expression, setExpression] = useState('');
  const [history, setHistory] = useState([]);

  const handleClick = async (val) => {
    if (val === 'C') return setExpression('');
    if (val === '=') {
      try {
        const API = process.env.REACT_APP_API;

const res = await axios.post(`${API}/api/calc`, { expression });
       // const res = await axios.post('http://localhost:5000/api/calc', { expression });
        setExpression(res.data.result.toString());
        fetchHistory();
      } catch {
        setExpression('Error');
      }
    } else {
      setExpression(expression + val);
    }
  };

  const fetchHistory = async () => {
    const API = process.env.REACT_APP_API;

const res = await axios.get(`${API}/api/calc/history`);
   // const res = await axios.get('http://localhost:5000/api/calc/history');
    setHistory(res.data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="calculator">
      <input value={expression} readOnly />
      <div className="grid">
        {buttons.map(btn => (
          <button key={btn} onClick={() => handleClick(btn)}>
            {btn}
          </button>
        ))}
      </div>

      <div className="history">
        <h3>History</h3>
        {history.map((h, i) => (
          <div key={i}>{h.expression} = {h.result}</div>
        ))}
      </div>
    </div>
  );
}

export default Calculator;