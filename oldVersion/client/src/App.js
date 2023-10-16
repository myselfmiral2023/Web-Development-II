import './App.css';
import {Routes, Link, Route} from 'react-router-dom';
import NavBar from './components/NavBar/Navbar';
import Login from './pages/Login'
import Register from './pages/Register'
import SearchDate from './components/Calendar/SearchDate';
import './components/Calendar/Calendar.css'
import Home from './pages/Home'
import Types from './pages/Types'
import Profile from './pages/Profile';




function App() {
  return (
    <div className="App">
      
        <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/types" element={<Types/>}/>
        <Route path="/search" element={<SearchDate/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
