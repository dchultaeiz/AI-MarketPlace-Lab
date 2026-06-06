const API_URL = 'http://localhost:8080/api';

export const authService = {
  login: async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      throw new Error('Usuario o contraseña incorrectos.');
    }

    const data = await response.json();

    return {
      token: data.token,
      user: {
        id: data.id,
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        role: data.role
      }
    };
  },

  getCurrentUser: async (token) => {
    const response = await fetch(`${API_URL}/usuarios/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  }
};