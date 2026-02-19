import { useState, useEffect } from 'react';
import API from '../api/client';

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const fetchDepts = () => {
    API.get('/api/departments/').then(res => setDepartments(res.data));
  };

  useEffect(() => { fetchDepts(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await API.post(`/api/departments/?name=${name}&description=${description}`);
    setName(''); setDescription('');
    fetchDepts();
  };

  return (
    <div>
      <h2 style={styles.heading}>🏬 Departments</h2>
      <form onSubmit={handleCreate} style={styles.form}>
        <input style={styles.input} placeholder="Department name" value={name} onChange={e => setName(e.target.value)} required />
        <input style={styles.input} placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <button style={styles.button} type="submit">+ Add Department</button>
      </form>
      <div style={styles.grid}>
        {departments.map(d => (
          <div key={d.id} style={styles.card}>
            <h3 style={styles.cardTitle}>🏬 {d.name}</h3>
            <p style={styles.cardDesc}>{d.description || 'No description'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  heading: { marginBottom:'24px' },
  form: { display:'flex', gap:'12px', marginBottom:'24px' },
  input: { padding:'10px', borderRadius:'8px', border:'1px solid #ddd', fontSize:'14px', flex:1 },
  button: { padding:'10px 20px', background:'#0078d4', color:'white', border:'none', borderRadius:'8px', cursor:'pointer' },
  grid: { display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:'16px' },
  card: { background:'white', padding:'20px', borderRadius:'12px', boxShadow:'0 2px 8px rgba(0,0,0,0.1)' },
  cardTitle: { margin:'0 0 8px', fontSize:'16px' },
  cardDesc: { margin:0, color:'#888', fontSize:'14px' }
};
