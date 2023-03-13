import { useState } from 'react';

function LoginPage() {
  // State for holding email and password inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Functions for updating email and password state
  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

// Function to handle form submission for logging in
  const handleFormSubmit = event => {
    event.preventDefault();
    // Make a POST request to the server to log in
    fetch('http://127.0.0.1:8000/sign-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        credentials: {
          email: email,
          password: password,
        },
      }),
    })
      .then(response => response.json()) // Get the response data as JSON
      .then(data => {
        // Store the JWT token and user object in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        // Redirect to the homepage
        window.location.href = '/';
      })
      .catch(error => console.log(error));
  };
  
  return (
    // Render a form for logging in with email and password inputs
    <form onSubmit={handleFormSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <button type="submit">Log in</button>
    </form>
  );
}

export default LoginPage;
