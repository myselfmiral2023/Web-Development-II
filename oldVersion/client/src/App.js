import "./App.css";
import NavBar from "./components/NavBar/Navbar";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchDate from "./components/Calendar/SearchDate";
import "./components/Calendar/Calendar.css";
import Home from "./pages/Home";
import Types from "./pages/Types";
import Profile from "./pages/Profile";
import Layout from "./components/Layout";
import Confirm from './pages/Confirm'
import Missing from './pages/Missing'
import Search from "./pages/Search";
import UserSearchVehicle from "./pages/UserSearchVehicle";
import Unauthorized from './pages/Unauthorized'
import AdminBookings from './pages/Admin/AdminBookings'
import AdminData from './pages/Admin/AdminData'
import AdminReviews from './pages/Admin/AdminReviews'
import AdminUsers from './pages/Admin/AdminUsers'
import AdminVehicles from './pages/Admin/AdminVehicles'
import RequireAuth from "./components/RequireAuth";
import AdminSingleUser from "./pages/Admin/AdminSingleUser";
import AdminSingleVehicle from "./pages/Admin/AdminSingleVehicle"
import UserSingleVehicle from "./pages/UserSingleVehicle";
import { Routes, Link, Route } from "react-router-dom";



function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/types" element={<Types />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/vehicle/:id" element={<UserSingleVehicle />} />
          
          <Route path="/" element={<Home />} />
          {/* Private routes */}
          <Route element={<RequireAuth allowedRole={"user" || "admin"}/>}>
          <Route path="/profile" element={<Profile />} />
          </Route>
          <Route element={<RequireAuth allowedRole={"user"}/>}>
          <Route path="/search" element={<Search />} />
          <Route path="/search/:id" element={<UserSearchVehicle />} />
          </Route>
          <Route element={<RequireAuth allowedRole={"user"}/>}>
          <Route path="/confirm" element={<Confirm />} />
          </Route>
          
          <Route element={<RequireAuth allowedRole={"admin"}/>}>
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/data" element={<AdminData />} />
          <Route path="/admin/reviews" element={<AdminReviews />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/users/:id" element={<AdminSingleUser />} />
          <Route path="/admin/vehicles" element={<AdminVehicles />} />
          <Route path="/admin/vehicles/:id" element={<AdminSingleVehicle />} />
          </Route>
            {/* Catch all */}
            <Route path="*" element={<Missing/>} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
