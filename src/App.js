import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";
import Navigation from "./Components/Navigation";
import { CartProvider } from "./Context/CartContext";
import Home from "./Pages/Home";
import ProductPage from "./Pages/ProductPage";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="App">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
