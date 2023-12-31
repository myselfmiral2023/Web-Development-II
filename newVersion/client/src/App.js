import './App.css';
import {Routes, Link, Route} from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login'
import Register from './pages/Register'


function App() {
  return (
    <main className="App">
        <Header/>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </main>
  );
}

export default App;
