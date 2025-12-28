import axios from 'axios';
import { useState } from 'react';
import './CricketerForm.css';

function CricketerForm({ onAdd }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    country: '',
    role: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8080/api/cricketers', [formData]);
     alert('✅ Cricketer added successfully!');
    onAdd();
    setFormData({ id: '', name: '', country: '', role: '' });
  };

  return (
    <form className="cricketer-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="id"
        placeholder="ID"
        value={formData.id}
        onChange={handleChange}
      />
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="country"
        placeholder="Country"
        value={formData.country}
        onChange={handleChange}
      />
      <input
        type="text"
        name="role"
        placeholder="Role"
        value={formData.role}
        onChange={handleChange}
      />
      <button type="submit">Add Cricketer</button>
    </form>
  );
}

export default CricketerForm;
