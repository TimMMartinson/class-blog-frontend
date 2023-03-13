import { useState } from 'react';

function NavBar({ user, setUser }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <nav>
      <div className="nav-left">
        <span className="logo">ClassBlog</span>
      </div>
      {user ? (
        <div className="nav-right">
          <span className="nav-message">Hello, {user.username}!</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : null}
    </nav>
  );
}

export default NavBar;
