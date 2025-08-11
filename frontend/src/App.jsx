import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import Sidebar from "./pages/sidebar";
import Stock from "./pages/stock";
import Bill from "./pages/Bill";
import Report from "./pages/Report";

function Layout() {
  return (
    <div className="flex position-relative h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  {
    element: <Layout />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/stock", element: <Stock /> },
      { path: "/bill", element: <Bill /> },
      { path: "/reports", element: <Report /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
