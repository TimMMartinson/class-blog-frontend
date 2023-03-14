import './App.css';
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import AuthPage from '../AuthPage/AuthPage'
import NavBar from '../../components/NavBar'
import HomePage from '../HomePage/HomePage';

// Shoutout to Pat G. for this function, which lets the app know
// whether to render the homepage or the AuthPage
const getUser = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null;
};

function App() {
  const [user, setUser] = useState(getUser())
  return (
    <div className="App">
      {user ? (
        <>
        <NavBar user={user} setUser={setUser}/>
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
        </>
      ): (
        <AuthPage setUser={setUser} user={user}/>
      )}
    </div>
  );
}

export default App;
