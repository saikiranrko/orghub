import { useState, useEffect } from 'react';
import API from '../api/client';

export default function Employees() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/api/users/').then(res => {
      setUsers(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h2 style={styles.heading}>👥 Employees</h2>
      {loading ? <p>Loading...</p> : (
        <table style={styles.table}>
          <thead>
            <tr style={styles.thead}>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} style={styles.tr}>
                <td style={styles.td}>{u.full_name}</td>
                <td style={styles.td}>{u.email}</td>
                <td style={styles.td}><span style={styles.badge}>{u.role}</span></td>
                <td style={styles.td}><span style={{...styles.badge, background: u.is_active ? '#e6f4ea' : '#fce8e6', color: u.is_active ? '#137333' : '#c5221f'}}>{u.is_active ? 'Active' : 'Inactive'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  heading: { marginBottom:'24px' },
  table: { width:'100%', borderCollapse:'collapse', background:'white', borderRadius:'12px', overflow:'hidden', boxShadow:'0 2px 8px rgba(0,0,0,0.1)' },
  thead: { background:'#0078d4', color:'white' },
  th: { padding:'14px 16px', textAlign:'left' },
  tr: { borderBottom:'1px solid #f0f0f0' },
  td: { padding:'14px 16px' },
  badge: { padding:'4px 10px', borderRadius:'20px', background:'#e8f0fe', color:'#1a73e8', fontSize:'12px', fontWeight:'bold' }
};
