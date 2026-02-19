import { useNavigate, Link } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>🏢 OrgHub</h2>
        <nav>
          <Link style={styles.navItem} to="/dashboard">🏠 Dashboard</Link>
          <Link style={styles.navItem} to="/employees">👥 Employees</Link>
          <Link style={styles.navItem} to="/departments">🏬 Departments</Link>
          <Link style={styles.navItem} to="/announcements">📢 Announcements</Link>
        </nav>
        <button style={styles.logout} onClick={handleLogout}>Logout</button>
      </div>
      <div style={styles.main}>
        <h1 style={styles.heading}>Welcome to OrgHub 👋</h1>
        <div style={styles.cards}>
          <div style={styles.card}>
            <h3>👥 Employees</h3>
            <p style={styles.num}>2</p>
          </div>
          <div style={styles.card}>
            <h3>🏬 Departments</h3>
            <p style={styles.num}>0</p>
          </div>
          <div style={styles.card}>
            <h3>📢 Announcements</h3>
            <p style={styles.num}>0</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { display:'flex', height:'100vh', fontFamily:'sans-serif' },
  sidebar: { width:'220px', background:'#0078d4', color:'white', padding:'24px', display:'flex', flexDirection:'column' },
  logo: { marginBottom:'32px' },
  navItem: { display:'block', color:'white', textDecoration:'none', padding:'10px', borderRadius:'8px', marginBottom:'8px', background:'rgba(255,255,255,0.1)' },
  logout: { marginTop:'auto', padding:'10px', background:'rgba(255,255,255,0.2)', color:'white', border:'none', borderRadius:'8px', cursor:'pointer' },
  main: { flex:1, padding:'32px', background:'#f0f2f5', overflowY:'auto' },
  heading: { marginBottom:'24px' },
  cards: { display:'flex', gap:'20px' },
  card: { background:'white', padding:'24px', borderRadius:'12px', boxShadow:'0 2px 8px rgba(0,0,0,0.1)', flex:1, textAlign:'center' },
  num: { fontSize:'48px', fontWeight:'bold', color:'#0078d4', margin:'8px 0 0' }
};
