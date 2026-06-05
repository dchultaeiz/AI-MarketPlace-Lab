import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (event) => {
   console.log("ENTRO AL LOGIN");
    event.preventDefault();

    setError('');

    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/login',
        {
          email,
          password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const token = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('isAuthenticated', 'true');

      setLoggedIn(true);

    } catch (err) {
      console.error(err);
      setError('Usuario o contraseña incorrectos.');
      setLoggedIn(false);
    }
  };

  if (loggedIn) {
    return (
      <div>
        <h2>Login exitoso</h2>
      </div>
    );
  }

  return (
    <div>
      <h2>Iniciar Sesión</h2>

      {error && (
        <div
          style={{
            color: 'red',
            marginBottom: '10px'
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Contraseña:</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default LoginForm;