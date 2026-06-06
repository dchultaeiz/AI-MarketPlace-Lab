import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './features/auth/context/AuthContext';
import { CartProvider } from './hooks/useContext/CartContext';

import Home from './components/Home';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Login from './components/Login';
import LoginAdmin from './src/components/LoginAdmin.jsx';

import ProductCreate from './components/ProductCreate';
import ProtectedRoute from './components/ProtectedRoute';

import FormularioValidado from './formularios/FormularioValidado';
import FormularioPago from './formularios/FormularioPago';
import FormularioPagoReactForm from './formularios/FormularioPagoReactForm';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />

            <Route path="/login" element={<Login />} />
            <Route path="/login-admin" element={<LoginAdmin />} />

            <Route
              path="/checkout"
              element={
                <ProtectedRoute loginPath="/login">
                  <Checkout />
                </ProtectedRoute>
              }
            />

            <Route
              path="/productos/nuevo"
              element={
                <ProtectedRoute loginPath="/login-admin">
                  <ProductCreate />
                </ProtectedRoute>
              }

            />

            <Route path="/formValido" element={<FormularioValidado />} />
            <Route path="/formPago" element={<FormularioPago />} />
            <Route path="/formReact" element={<FormularioPagoReactForm />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;