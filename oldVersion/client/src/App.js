import './App.css';
import {Routes, Link, Route} from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login'
import Register from './pages/Register'
import SearchDate from './pages/SearchDate';


function App() {
  return (
    <div className="App">
        <Header/>
      <Routes>
        <Route path="/search" element={<SearchDate/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
