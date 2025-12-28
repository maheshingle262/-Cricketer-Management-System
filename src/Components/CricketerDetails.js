import axios from 'axios';
import { useEffect, useState } from 'react';
import './CricketerDetails.css';

function CricketerDetails({ id, onBack }) {
  const [cricketer, setCricketer] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/api/cricketers/${id}`)
        .then(res => setCricketer(res.data))
        .catch(err => console.error('Error fetching details:', err));
    }
  }, [id]);

  if (!cricketer) return <div>Loading...</div>;

  return (
    <div className="cricketer-details">
      <h2>{cricketer.name}</h2>
      <p><strong>ID:</strong> {cricketer.id}</p>
      <p><strong>Country:</strong> {cricketer.country}</p>
      <p><strong>Role:</strong> {cricketer.role}</p>

      <button className="back-button" onClick={onBack}>⬅ Back to Add Form</button>
    </div>
  );
}

export default CricketerDetails;
