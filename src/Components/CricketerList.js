
import axios from 'axios';
import { useEffect, useState } from 'react';
import './CricketerList.css';

function CricketerList({ onSelect, onBack }) {
  const [cricketers, setCricketers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/cricketers')
      .then(res => setCricketers(res.data))
      .catch(err => console.error('Error loading cricketers:', err));
  }, []);

  return (
    <div className="cricketer-list-container">
      <h2>🏏 Cricketer List</h2>

      <ul className="cricketer-list">
        {cricketers.map(c => (
          <li
            key={c.id}
            className="cricketer-item"
            onClick={() => onSelect(c.id)}
          >
            <div className="cricketer-name">{c.name}</div>
            <div className="cricketer-country">{c.country}</div>
          </li>
        ))}
      </ul>

      {/* Back button */}
      <button className="back-button" onClick={onBack}>
        ⬅ Back to Add Form
      </button>
    </div>
  );
}

export default CricketerList;





/*import axios from 'axios';
import { useEffect, useState } from 'react';
import './CricketerList.css'; // Ensure this file exists

function CricketerList({ onSelect }) {
  const [cricketers, setCricketers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/cricketers')
      .then(res => setCricketers(res.data))
      .catch(err => console.error('Error loading cricketers:', err));
  }, []);

  return (
    <div className="cricketer-list-container">
      <h2>Cricketer List</h2>
      <ul className="cricketer-list">
        {cricketers.map(c => (
          <li
            key={c.id}
            className="cricketer-item"
            onClick={() => onSelect(c.id)}
          >
            <div className="cricketer-name">{c.name}</div>
            <div className="cricketer-country">{c.country}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CricketerList;*/
