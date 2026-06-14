import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Bienvenidos a la página de inicio</h1>
      <p>Esta es una página de ejemplo para mostrar el routing</p>

      <Link to="/products">Ir a la lista de productos</Link>
      <br />
      <Link to="/productos/nuevo">Alta de producto</Link>
      <br />
      <Link to="/demo-cloud">Consultar Azure Function</Link>
      <br />      
    </div>
  );
};

export default Home;