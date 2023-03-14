import { useState } from 'react';

function SignupPage() {
  // State for holding the values of the input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  // functions to handle changes in the input fields
  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    fetch('https://classblog-server.onrender.com/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        credentials: {
          email: email,
          password: password,
          username: username,
        },
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch(error => console.log(error));
  };

  return (
    <div className='form-container'>
        <form onSubmit={handleFormSubmit}>
            <label>
                Username:
                <input type="text" value={username} onChange={handleUsernameChange} />
            </label>
            <br />
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
            <button className='button' type="submit">Sign up</button>
        </form>
    </div>
    
  );
}

export default SignupPage;
