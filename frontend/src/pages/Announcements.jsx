import { useState, useEffect } from 'react';
import API from '../api/client';

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const fetchAnn = () => {
    API.get('/api/announcements/').then(res => setAnnouncements(res.data));
  };

  useEffect(() => { fetchAnn(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await API.post(`/api/announcements/?title=${encodeURIComponent(title)}&content=${encodeURIComponent(content)}`);
    setTitle(''); setContent('');
    fetchAnn();
  };

  return (
    <div>
      <h2 style={styles.heading}>📢 Announcements</h2>
      <form onSubmit={handleCreate} style={styles.form}>
        <input style={styles.input} placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <input style={styles.input} placeholder="Content" value={content} onChange={e => setContent(e.target.value)} required />
        <button style={styles.button} type="submit">+ Post</button>
      </form>
      <div>
        {announcements.map(a => (
          <div key={a.id} style={styles.card}>
            {a.is_pinned && <span style={styles.pin}>📌 Pinned</span>}
            <h3 style={styles.cardTitle}>{a.title}</h3>
            <p style={styles.cardContent}>{a.content}</p>
            <p style={styles.cardDate}>{new Date(a.created_at).toLocaleDateString()}</p>
          </div>
        ))}
        {announcements.length === 0 && <p style={{color:'#888'}}>No announcements yet.</p>}
      </div>
    </div>
  );
}

const styles = {
  heading: { marginBottom:'24px' },
  form: { display:'flex', gap:'12px', marginBottom:'24px' },
  input: { padding:'10px', borderRadius:'8px', border:'1px solid #ddd', fontSize:'14px', flex:1 },
  button: { padding:'10px 20px', background:'#0078d4', color:'white', border:'none', borderRadius:'8px', cursor:'pointer' },
  card: { background:'white', padding:'20px', borderRadius:'12px', boxShadow:'0 2px 8px rgba(0,0,0,0.1)', marginBottom:'16px' },
  pin: { fontSize:'12px', color:'#e67700', fontWeight:'bold' },
  cardTitle: { margin:'8px 0', fontSize:'18px' },
  cardContent: { color:'#444', margin:'0 0 8px' },
  cardDate: { color:'#aaa', fontSize:'12px', margin:0 }
};
