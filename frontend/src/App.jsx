import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import Sidebar from "./pages/sidebar";
import Stock from "./pages/Stock";
import Bill from "./pages/Bill";
import Report from "./pages/Report";

function Layout() {
  const location = useLocation();
  const hideSidebar = location.pathname === "/";

  return (
    <div className="flex overflow-hidden">
      {!hideSidebar && <Sidebar />}
      <div className="flex-1 ">
        <Routes>
          
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/bill" element={<Bill />} />
          <Route path="/reports" element={<Report />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
