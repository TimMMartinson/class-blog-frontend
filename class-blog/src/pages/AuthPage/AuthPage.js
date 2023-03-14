import { useState } from 'react';
import LoginPage from '../LoginPage/LoginPage';
import SignupPage from '../SignupPage/SignupPage';

function AuthPage({ user, setUser }) {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleSwitchForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <div>
        {/* Render either the login or signup page based on the isLoginForm state */}
      <h1 className='header'>{isLoginForm ? 'Log in to ClassBlog' : 'Sign up for ClassBlog'}</h1>
      {isLoginForm ? <LoginPage setUser={setUser} user={user} /> : <SignupPage />}
      {/* Button to switch between login and signup forms */}
      <button className='button' onClick={handleSwitchForm}>
        {isLoginForm ? 'Switch to Sign up' : 'Switch to Log in'}
      </button>
    </div>
  );
}

export default AuthPage;
