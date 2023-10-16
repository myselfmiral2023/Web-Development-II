import './App.css';
import {Routes, Link, Route} from 'react-router-dom';
import Header from './components/Header/Header';
import Login from './pages/Login'
import Register from './pages/Register'
import SearchDate from './components/Calendar/SearchDate';
import './components/Calendar/Calendar.css'
import Home from './pages/Home'
import Types from './pages/Types'



function App() {
  return (
    <div className="App">
        
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/types" element={<Types/>}/>
        <Route path="/search" element={<SearchDate/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
