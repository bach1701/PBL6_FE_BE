import React, { useState } from 'react';
import axios from 'axios';

const CsrfTokenFetcher = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const fetchCsrfToken = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/');
      const cookies = response.headers['set-cookie'];
      const csrfTokenMatch = cookies ? cookies.match(/csrftoken=([^;]+)/) : null;

      return csrfTokenMatch ? csrfTokenMatch[1] : null;
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
      return null;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const csrfToken = await fetchCsrfToken();

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/user/api/userauths/login/',
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken || '', // Thêm CSRF token vào header
          },
        }
      );

      if (response.status === 200) {
        setMessage('Login successful');
        console.log('Login successful:', response.data);
      }
    } catch (error) {
      setMessage('Login failed');
      console.error('Login failed:', error.response.data);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CsrfTokenFetcher;