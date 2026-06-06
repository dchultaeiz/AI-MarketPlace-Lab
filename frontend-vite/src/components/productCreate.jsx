import React, { useState } from 'react';
import { useAuth } from '../features/auth/context/AuthContext';

const ProductCreate = () => {
  const { token, user } = useAuth();

  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    imagenUrl: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  if (user?.role !== 'ADMIN') {
    return <h2>No tenés permisos para acceder a esta pantalla.</h2>;
  }

  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: Number(producto.precio),
          stock: Number(producto.stock)
        })
      });

      if (!response.ok) {
        throw new Error('No se pudo crear el producto.');
      }

      setMensaje('Producto creado correctamente.');
      setProducto({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        imagenUrl: ''
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      style={{
        maxWidth: '700px',
        margin: '40px auto',
        padding: '20px'
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}
      >
        Alta de producto
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label style={{ width: '150px', textAlign: 'right', marginRight: '16px' }}>
            Nombre
          </label>
          <input
            name="nombre"
            value={producto.nombre}
            onChange={handleChange}
            required
            style={{ flex: 1, padding: '8px' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label style={{ width: '150px', textAlign: 'right', marginRight: '16px' }}>
            Descripción
          </label>
          <input
            name="descripcion"
            value={producto.descripcion}
            onChange={handleChange}
            style={{ flex: 1, padding: '8px' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label style={{ width: '150px', textAlign: 'right', marginRight: '16px' }}>
            Precio
          </label>
          <input
            name="precio"
            type="number"
            value={producto.precio}
            onChange={handleChange}
            required
            style={{ flex: 1, padding: '8px' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label style={{ width: '150px', textAlign: 'right', marginRight: '16px' }}>
            Stock
          </label>
          <input
            name="stock"
            type="number"
            value={producto.stock}
            onChange={handleChange}
            required
            style={{ flex: 1, padding: '8px' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label style={{ width: '150px', textAlign: 'right', marginRight: '16px' }}>
            Imagen URL
          </label>
          <input
            name="imagenUrl"
            value={producto.imagenUrl}
            onChange={handleChange}
            style={{ flex: 1, padding: '8px' }}
          />
        </div>

        <button
          type="submit"
          style={{
            marginTop: '20px',
            width: '220px',
            alignSelf: 'center',
            padding: '10px'
          }}
        >
          Crear producto
        </button>
      </form>

      {mensaje && (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          {mensaje}
        </p>
      )}

      {error && (
        <p style={{ textAlign: 'center', color: 'red', marginTop: '20px' }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default ProductCreate;