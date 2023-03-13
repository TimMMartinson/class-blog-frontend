import { useState } from 'react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

//   const handleFormSubmit = event => {
//     event.preventDefault();
//     fetch('http://127.0.0.1:8000/sign-in', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         credentials: {
//           email: email,
//           password: password,
//         },
//       }),
//     })
//       .then(response => response.json())
//       .then(data => {
//         localStorage.setItem('token', data.token);
//         // Redirect to home page after successful login
//       })
//       .catch(error => console.log(error));
//   };
const handleFormSubmit = event => {
    event.preventDefault();
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
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('token', data.token);
        // Fetch the user data
        return fetch('http://127.0.0.1:8000/me', {
          headers: { Authorization: `Bearer ${data.token}` },
        });
      })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('user', JSON.stringify(data));
        // Redirect to home page after successful login
      })
      .catch(error => console.log(error));
  };
  
  return (
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
