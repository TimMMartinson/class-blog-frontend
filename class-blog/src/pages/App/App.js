import './App.css';
import { useState } from 'react'
// import { Routes, Route } from 'react-router-dom'
import AuthPage from '../AuthPage/AuthPage'

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
        </>
      ): (
        <AuthPage setUser={setUser} user={user}/>
      )}
    </div>
  );
}

export default App;
