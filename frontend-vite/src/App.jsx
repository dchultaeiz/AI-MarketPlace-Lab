import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import { AuthProvider } from './features/auth/context/AuthContext';
import { CartProvider } from './hooks/useContext/CartProvider';

import Home from './components/Home';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import LoginJWTContext from './components/LoginJWTContext';
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
            <Route path="/login" element={<LoginJWTContext />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
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
