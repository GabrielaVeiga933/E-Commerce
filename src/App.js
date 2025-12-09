import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./styles.css";
import Header from "./header/Navigation";
import { CartProvider } from "./Context/CartContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="App">
          <Header />
          <AppRoutes />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;