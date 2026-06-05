// No necesitamos una URL de API para esta simulación.

export const authService = {
  /**
   * Simula una función de login.
   * @param {object} credentials - Objeto con email y password.
   * @returns {Promise<object>} - Promesa que resuelve con el usuario y un token falso si es exitoso.
   * @throws {Error} - Lanza un error si las credenciales son incorrectas.
   */
  login: async (credentials) => {
  console.log('Simulando login con:', credentials);

  await new Promise(resolve => setTimeout(resolve, 500));

  if (
    credentials.email === 'user@example.com' &&
    credentials.password === 'password'
  ) {
    const fakeUser = {
      id: 1,
      nombre: 'Usuario de Prueba',
      email: 'user@example.com'
    };

    const fakeToken = 'fake-jwt-token-for-simulation-12345';

    localStorage.setItem('token', fakeToken);
    localStorage.setItem('isAuthenticated', 'true');

    return {
      user: fakeUser,
      token: fakeToken
    };
  }

  throw new Error('Usuario o contraseña incorrectos.');
},

  /**
   * Simula la obtención del usuario actual a partir de un token.
   */
  getCurrentUser: async (token) => {
    // Para esta simulación, si el token es el que generamos, devolvemos el usuario.
    if (token === 'fake-jwt-token-for-simulation-12345') {
      return {
        id: 1,
        nombre: 'Usuario de Prueba',
        email: 'user@example.com',
      };
    }
    // Si el token no es válido (o no hay), no devolveemos nada.
    return null;
  }
};