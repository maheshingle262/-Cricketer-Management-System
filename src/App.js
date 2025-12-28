import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import CricketerDetails from './Components/CricketerDetails';
import CricketerForm from './Components/CricketerForm';
import CricketerList from './Components/CricketerList';

function App() {
  const [view, setView] = useState('form');
  const [cricketers, setCricketers] = useState([]);
  const [selectedCricketer, setSelectedCricketer] = useState(null);
  const [searchName, setSearchName] = useState('');

  const fetchCricketers = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/cricketers');
      setCricketers(res.data);
    } catch (err) {
      alert('Error fetching cricketers');
    }
  };

  useEffect(() => {
    fetchCricketers();
  }, []);

  const handleSearch = async (e) => {
  if (e.key === 'Enter') {
    const trimmedInput = searchName.trim().toLowerCase();
    const found = cricketers.find(
      (c) => c.name.trim().toLowerCase() === trimmedInput
    );

    if (found) {
      setSelectedCricketer(found.id);
      setView('details');
    } else {
      alert('Cricketer not found');
    }
  }
};


  const handleSelect = (id) => {
    setSelectedCricketer(id);
    setView('details');
  };

  return (
    <div className="App">
      <nav className="navbar">
        <h2>🏏 Cricketer Manager</h2>
        <div className="nav-right">
          <button onClick={() => setView('list')}>Cricketer List</button>
          <input
            type="text"
            placeholder="Search by name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
      </nav>

      {view === 'form' && (
        <div className="content fade-in">
          <div className="card">
            <CricketerForm onAdd={fetchCricketers} />
          </div>
        </div>
      )}

      {view === 'list' && (
        <div className="content fade-in">
          <div className="card">
            <CricketerList
              cricketers={cricketers}
              onSelect={handleSelect}
              onBack={() => setView('form')}
            />
          </div>
        </div>
      )}

      {view === 'details' && (
        <div className="content fade-in">
          <div className="card">
            <CricketerDetails
              id={selectedCricketer}
              onBack={() => setView('form')}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
