import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Dashboard from './components/dashboard';
import Sidebar from './pages/sidebar';
import Stock from './pages/Stock'
import Bill from './pages/Bill';
import Report from './pages/Report';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />
        <Route path="/sidebar" element={<Sidebar/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/bill" element={<Bill />} />
        <Route path="/reports" element={<Report />} />
        
       
       
      </Routes>
    </Router>
  );
}

export default App;
