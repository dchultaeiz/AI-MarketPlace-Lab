import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import defaultImage from '../assets/imgXdefault.jpg';

const CardProd = ({ product }) => {
  const dispatch = useDispatch();

  const isFavorite = useSelector(state =>
    state.favorites.items.some(item => item.id === product.id)
  );

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(product));
  };

  return (
    <Link
      to={`/products/${product.id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div style={{
        border: '1px solid #ddd',
        backgroundColor: 'lightblue',
        borderRadius: '8px',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        cursor: 'pointer',
        position: 'relative'
      }}>
        <button
          title={isFavorite ? 'Quitar de favoritos' : 'Marcar como favorito'}
          type="button"
          onClick={handleFavoriteClick}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            zIndex: 10,
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '50%',
            width: '42px',
            height: '42px',
            fontSize: '1.4rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            lineHeight: 1
          }}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>

        <img
          src={product.imagen || defaultImage}
          alt={product.nombre}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '4px'
          }}
        />

        <h3 style={{ margin: '0.5rem 0' }}>{product.nombre}</h3>

        <p style={{ color: '#2D3277', fontSize: '1.25rem', fontWeight: 'bold', margin: '0' }}>
          ${product.precio.toLocaleString('es-AR')}
        </p>

        <p style={{ color: '#666', margin: '0' }}>{product.descripcion}</p>
      </div>
    </Link>
  );
};

export default CardProd;